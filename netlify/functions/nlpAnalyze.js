
export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { text } = JSON.parse(event.body);
        const apiKey = process.env.GOOGLE_NLP_API_KEY;

        if (!text) {
            return { statusCode: 400, body: JSON.stringify({ error: "No text provided" }) };
        }

        if (!apiKey) {
            return { statusCode: 500, body: JSON.stringify({ error: "Google API Key not configured" }) };
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

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...nlpData,
                translation: translation
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
