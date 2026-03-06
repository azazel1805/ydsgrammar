export default async function handler(req, res) {

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    return res.status(200).end();
  }

  try {

    const mode = req.body?.mode;

    if (mode !== "syntax_analyze") {
      return res.status(400).json({ error: "Invalid mode" });
    }

    const sentence = req.body?.sentence;

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
      return res.status(500).json({ error: "AI returned empty content" });
    }

    const clean = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).send(clean);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}