exports.handler = async function (event) {

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST"
      }
    };
  }

  try {

    const body = JSON.parse(event.body || "{}");
    const input = body.input;

    if (!input) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Input missing" })
      };
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
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "AI returned empty content" })
      };
    }

    const clean = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: clean
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};