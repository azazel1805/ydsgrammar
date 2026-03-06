export default async function handler(req, res) {
  // CORS for OPTIONS
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    return res.status(200).end();
  }

  try {
    // Vercel auto-parses JSON body
    const input = req.body?.input;

    if (!input) {
      return res.status(400).json({ error: "Input missing" });
    }

    const systemPrompt = `
You are a YDS exam expert.

IMPORTANT RULES:
- Input will always be a multiple choice question.
- Explanations MUST be written in Turkish.
- Use academic grammar terminology.
- Focus on logical structure and trap analysis.
- Return STRICTLY valid JSON.
- No markdown.
- No extra commentary.
- No triple backticks.

Return EXACTLY this JSON format:

{
  "question_analysis": {
    "grammar_focus": "",
    "logical_structure": "",
    "correct_answer": "",
    "why_correct": "",
    "why_others_wrong": [],
    "difficulty_level": "",
    "confidence_level": ""
  },
  "yds_trap_engine": {
    "trap_type": "",
    "logic_type": "",
    "elimination_strategy": "",
    "exam_tip": ""
  }
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
          { role: "user", content: input }
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