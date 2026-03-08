export const handler = async (event, context) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    try {
        const body = event.body ? JSON.parse(event.body) : {};
        const input = body.input;

        if (!input) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: "Input missing" }) };
        }

        const systemPrompt = `
You are a YDS/YDT (Turkish English Exams) Academic Expert.
Your task is to provide Restatement (Anlamca En Yakın Cümle) variations for a given input sentence.

RULES:
- Create 3 distinct variations of the input sentence that maintain the exact same meaning.
- Variations MUST use different grammatical structures (e.g., if input uses "Although", variations should use "Despite", "In spite of", "Much as", or "However").
- Use advanced academic vocabulary.
- Explanation for EACH variation must be in Turkish, explaining which structural change was made.
- Return STRICTLY valid JSON.
- No markdown, no backticks, no extra text.

Return exactly this JSON format:
{
  "original": "",
  "variations": [
    {
      "sentence": "Variation 1 English text",
      "strategy": "Used grammatical inversion / used passive voice / etc.",
      "explanation_tr": "Türkçe açıklama: Hangi yapı hangi yapıya dönüştürüldü?"
    },
    ... (2 more)
  ],
  "key_vocabulary": [
    {"word": "word1", "meaning_tr": "anlam1"},
    {"word": "word2", "meaning_tr": "anlam2"}
  ]
}
`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                temperature: 0.7,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: input }
                ]
            })
        });

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: "AI returned empty content" }) };
        }

        const clean = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return { statusCode: 200, headers, body: clean };

    } catch (err) {
        return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
    }
};
