
export const handler = async (event) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, headers, body: "Method Not Allowed" };
    }

    try {
        const { text } = JSON.parse(event.body);
        const apiKey = process.env.GOOGLE_NLP_API_KEY;

        if (!text) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: "No text provided" }) };
        }

        if (!apiKey) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: "Google API Key not configured" }) };
        }

        // 1. Google Cloud NLP Syntax Analysis
        const nlpUrl = `https://language.googleapis.com/v1/documents:annotateText?key=${apiKey}`;
        const nlpRes = await fetch(nlpUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                document: { type: "PLAIN_TEXT", content: text },
                features: {
                    extractSyntax: true,
                    extractEntities: false,
                    extractDocumentSentiment: false,
                    extractEntitySentiment: false,
                    classifyText: text.split(/\s+/).length >= 20
                },
                encodingType: "UTF8"
            })
        });

        const nlpData = await nlpRes.json();

        // 2. Google Cloud Translation API (Fallback for MyMemory limit)
        const transUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        const transRes = await fetch(transUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                q: text,
                target: "tr",
                format: "text"
            })
        });

        const transData = await transRes.json();
        const translation = transData.data?.translations[0]?.translatedText || null;

        // 3. Back-Translation (TR -> EN) to get the "Cleaned" version
        let backTranslation = null;
        if (translation) {
            const backTransRes = await fetch(transUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    q: translation,
                    target: "en",
                    format: "text"
                })
            });
            const backTransData = await backTransRes.json();
            backTranslation = backTransData.data?.translations[0]?.translatedText || null;
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...nlpData,
                originalText: text,
                translation: translation,
                backTranslation: backTranslation
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
