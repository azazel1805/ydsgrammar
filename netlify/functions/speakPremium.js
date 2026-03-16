
export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { text, voice = "en-US-Standard-C", lang = "en-US" } = JSON.parse(event.body);
        const apiKey = process.env.GOOGLE_NLP_API_KEY;

        if (!text) return { statusCode: 400, body: JSON.stringify({ error: "No text" }) };
        if (!apiKey) return { statusCode: 500, body: JSON.stringify({ error: "No API Key" }) };

        const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                input: { text },
                voice: { languageCode: lang, name: voice },
                audioConfig: { audioEncoding: "MP3" }
            })
        });

        const data = await response.json();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data) // returns audioContent in base64
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
