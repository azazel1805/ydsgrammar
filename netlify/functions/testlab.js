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
    const mode = body.mode;

    if (mode !== "syntax_analyze") {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid mode" }) };
    }

    const sentence = body.sentence;

    const systemPrompt = `
You are an advanced English syntax analyzer.

Return ONLY valid JSON.

Analyze the sentence and divide it into meaningful grammatical units.

Rules:
- Do NOT paraphrase.
- Keep original word order.
- Do NOT invent missing text.
- Combine words into logical grammatical chunks.
- Grammar Notes must NEVER be empty.
- Always explain tense, sentence type and structural features.

Format:

{
  "parts": [
    {
      "text": "",
      "role": "subject | main_verb | auxiliary | object | complement | adverbial_phrase | prepositional_phrase | relative_clause | noun_clause | participle_phrase | conjunction"
    }
  ],
  "explanations": [
    {
      "role": "",
      "text": "",
      "explanation": ""
    }
  ],
  "grammar_notes": ""
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
        temperature: 0.3,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: sentence }
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