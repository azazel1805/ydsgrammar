const OpenAI = require("openai");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { text } = JSON.parse(event.body);
        if (!text) {
            return { statusCode: 400, body: JSON.stringify({ error: "Text is required" }) };
        }

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const prompt = `
        Analyze the following English text sentence by sentence for a Turkish YDS/YDT student.
        For each sentence, provide a JSON object with:
        1. "original": the original sentence text
        2. "simplified": a simpler English version of the sentence (B1 level vocabulary)
        3. "grammarNote": a clear Turkish explanation of the key grammatical structure(s) used (e.g., passive voice, relative clause, conditional)
        4. "keywords": an array of objects, each with "word" (the English word/phrase) and "meaning" (its Turkish meaning)

        Text: "${text}"

        Return ONLY a JSON object with a "sentences" array in this exact format:
        {
          "sentences": [
            {
              "original": "...",
              "simplified": "...",
              "grammarNote": "...",
              "keywords": [{"word": "...", "meaning": "..."}]
            }
          ]
        }
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are an expert English teacher for Turkish university students preparing for the YDS/YDT exam. You break down complex academic English texts into understandable components." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const result = JSON.parse(response.choices[0].message.content);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result)
        };
    } catch (error) {
        console.error("Text Deconstruction Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
