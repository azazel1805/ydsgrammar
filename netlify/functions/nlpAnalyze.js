
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

        // Google Cloud NLP Syntax & Entity Analysis
        const url = `https://language.googleapis.com/v1/documents:annotateText?key=${apiKey}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                document: {
                    type: "PLAIN_TEXT",
                    content: text
                },
                features: {
                    extractSyntax: true,
                    extractEntities: true,
                    extractDocumentSentiment: false,
                    extractEntitySentiment: false,
                    classifyText: false
                },
                encodingType: "UTF8"
            })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
