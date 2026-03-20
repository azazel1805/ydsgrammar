
export const handler = async (event) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
    if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: "Method Not Allowed" };

    try {
        const { text } = JSON.parse(event.body);
        const apiKey = process.env.OPENAI_API_KEY;

        if (!text) return { statusCode: 400, headers, body: JSON.stringify({ error: "No text provided" }) };
        if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({ error: "OpenAI API Key not configured" }) };

        const systemPrompt = `Analyze the following English sentence for a Turkish YDS/YDT/IELTS student.
Return ONLY valid JSON in the specified structure. Do not include markdown blocks.

Required JSON Structure:
{
  "translation": "Türkçe çeviri",
  "tokens": [
    {
      "text": { "content": "word" },
      "partOfSpeech": { "tag": "NOUN/VERB/ADJ/ADV/PRON/DET/ADP/CONJ/PRT/PUNCT", "tense": "PAST/PRESENT/FUTURE/etc.", "aspect": "ASPECT", "case": "CASE", "mood": "MOOD" },
      "lemma": "root"
    }
  ],
  "tense": "Detailed tense name in Turkish (e.g., Present Perfect Continuous)",
  "cefr": "Estimated level (A1-C2)",
  "backTranslation": "A more natural or alternative English version of the sentence",
  "explanation": "Detailed grammar explanation and YDS/IELTS strategy tips in Turkish",
  "categories": [{ "name": "Grammar Topic name in Turkish" }]
}`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                temperature: 0.3,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: `Analyze this sentence: "${text}"` }
                ]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || "OpenAI API failure");
        }

        const rawResult = data.choices[0].message.content;
        const cleanJson = rawResult.replace(/```json/g, "").replace(/```/g, "").trim();
        const result = JSON.parse(cleanJson);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...result,
                originalText: text
            })
        };
    } catch (error) {
        console.error("NLP Error:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
