/* =========================================
 Dictionary Lookup Proxy (api.dictionaryapi.dev)

 Why: api.dictionaryapi.dev intermittently drops its
 Access-Control-Allow-Origin header, which makes browser
 fetches from https://yds.monster fail with CORS errors.

 This server-side proxy:
 - calls the upstream API from the backend (no CORS involved)
 - passes through status codes (404 = word not found)
 - caches successful lookups in memory (best-effort) to be
   polite to the free upstream API and speed up repeat searches
 ========================================= */

const UPSTREAM = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
const CACHE_MAX_ENTRIES = 1000;
const FETCH_TIMEOUT_MS = 8000;

// Module-level cache survives between invocations while the
// function instance stays warm (best-effort, not guaranteed).
const cache = new Map();

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json"
};

function json(statusCode, body) {
    return { statusCode, headers, body: JSON.stringify(body) };
}

export const handler = async (event) => {

    if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
    if (event.httpMethod !== "GET") return json(405, { error: "Method Not Allowed" });

    const word = (event.queryStringParameters?.word || "").trim().toLowerCase();

    if (!word) return json(400, { error: "Missing 'word' parameter" });
    if (!/^[a-z][a-z' -]{0,48}$/.test(word)) return json(400, { error: "Invalid word" });

    // Serve from cache when possible
    const cached = cache.get(word);
    if (cached && cached.expires > Date.now()) {
        return json(200, cached.body);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        const upstream = await fetch(UPSTREAM + encodeURIComponent(word), {
            signal: controller.signal,
            headers: { "User-Agent": "ydsgrammar-dictionary-proxy/1.0" }
        });
        clearTimeout(timer);

        const body = await upstream.json().catch(() => null);

        if (upstream.ok && Array.isArray(body) && body.length > 0) {
            cache.set(word, { expires: Date.now() + CACHE_TTL_MS, body });
            if (cache.size > CACHE_MAX_ENTRIES) {
                cache.delete(cache.keys().next().value); // evict oldest
            }
            return json(200, body);
        }

        if (upstream.ok) {
            // 200 but not usable JSON — upstream glitch
            return json(502, { error: "Dictionary service returned an invalid response" });
        }

        // Pass through upstream status (404 = word not found, 429, 5xx, ...)
        return json(upstream.status, body || { error: "Dictionary service unavailable" });

    } catch (error) {
        clearTimeout(timer);
        console.error("dictionaryLookup proxy error:", error?.message || error);
        return json(502, { error: "Dictionary service unreachable", detail: String(error?.message || error) });
    }
};
