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
    const verb = body.verb;

    if (!verb) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Verb missing" }) };
    }

    const systemPrompt = `
You are an expert English-Turkish Phrasal Verb Dictionary specializing in YDS/YDT/TOEFL exams.
The user will provide a ROOT VERB (e.g., "get", "put", "take").
Your task is to list ALL common and academic phrasal verbs associated with this root verb.

For each phrasal verb, provide:
1. "phrasal": The phrasal verb (e.g., "Get over").
2. "meaning_tr": Turkish translation and definition.
3. "meaning_en": Clear English definition.
4. "example": A high-quality academic or daily life example sentence.
5. "usage_note": A brief strategic note for exam students (e.g., whether it's formal or informal).

RULES:
- Language: TURKISH for definitions, English for examples.
- Format: STRICT JSON ARRAY.
- NO Markdown, NO commentary.
- Maximum 15 most important phrasal verbs.

JSON structure:
[
  {
    "phrasal": "",
    "meaning_tr": "",
    "meaning_en": "",
    "example": "",
    "usage_note": ""
  },
  ...
]
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
          { role: "user", content: `Root verb: ${verb}` }
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
