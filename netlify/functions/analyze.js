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
You are an elite YDS/YDT (Academic English Exam) Strategy Coach. Your goal is not just to provide the answer, but to teach the student the "Path of Thinking" (Düşünme Yolu).

INSTRUCTIONS FOR TURKISH OUTPUT:
1. "grammar_focus": Identify the specific grammar topic (e.g., Subjunctive Mood, Sentence Completion - Cause/Effect).
2. "logical_structure": Explain the FIRST thing the student should look at (e.g., "İlk olarak 'require' fiiline ve 'that' bağlacına bakmalıyız").
3. "correct_answer": The letter and the reason in one sentence.
4. "why_correct": Provide a detailed step-by-step roadmap. Use a "Roadmap" style: "Adım 1: ..., Adım 2: ..., Sonuç: ...".
5. "why_others_wrong": List specific anatomical reasons for each wrong option (e.g., "A şıkkı zaman uyumuna aykırı", "C şıkkı anlamca eksik").
6. "yds_trap_engine.elimination_strategy": Detailed instructions on which options to eliminate first and why.
7. "yds_trap_engine.exam_tip": A professional tip for similar future questions.

RULES:
- Language: TURKISH.
- Format: STRICT JSON.
- Style: Instructional, pedagogical, and highly analytical.
- NO Markdown, NO commentary.

{
  "question_analysis": {
    "grammar_focus": "",
    "logical_structure": "İlk bakılması gereken nokta/uçucu",
    "correct_answer": "",
    "why_correct": "Adım adım yol haritası",
    "why_others_wrong": ["A: neden yanlış", "B: neden yanlış", "..."],
    "difficulty_level": "",
    "confidence_level": ""
  },
  "yds_trap_engine": {
    "trap_type": "",
    "logic_type": "",
    "elimination_strategy": "Eleme rehberi",
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