const OpenAI = require("openai");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { paragraph } = JSON.parse(event.body);
        if (!paragraph) {
            return { statusCode: 400, body: JSON.stringify({ error: "Paragraph is required" }) };
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const prompt = `
        Analyze the logical flow and sentence-to-sentence connections of the following English paragraph. 
        Break the paragraph into individual sentences and for each sentence provide:
        1. The sentence text itself.
        2. Connection level: "Strong", "Moderate", or "Weak" (based on how well it connects to the previous sentence).
        3. Role: What is the role of this sentence in the paragraph? (e.g., Topic sentence, supporting evidence, contrast, conclusion).
        4. Connection Detail: Explain the link to the previous sentence (or note if it's the opening sentence).
        5. Improvement Suggestion: How could the connection be improved (if relevant)?
        
        Also provide a "General Evaluation" (High, Medium, Low) and a brief summary of the overall flow.

        Paragraph: "${paragraph}"

        Return ONLY a JSON response in this format:
        {
          "sentences": [
            {
              "text": "...",
              "connectionLevel": "Strong/Moderate/Weak",
              "role": "...",
              "connectionDetail": "...",
              "improvementSuggestion": "..."
            }
          ],
          "generalEvaluation": "High/Medium/Low",
          "overallSummary": "..."
        }
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an expert English linguist and writing coach specializing in paragraph coherence and cohesion (YDS/YDT/TOEFL level)." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const analysis = JSON.parse(response.choices[0].message.content);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(analysis)
        };
    } catch (error) {
        console.error("Paragraph Analysis Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
