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
    const { topic, difficulty } = body;

    if (!topic || !difficulty) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Topic and Difficulty missing" }) };
    }

    const systemPrompt = `
You are an expert ${difficulty} (Academic English Exam) content creator.
Your task is to generate a high-quality reading passage and 3 multiple-choice questions based on the selected topic.

DIFFICULTY CONTEXT:
- YDS: High academic level, complex sentence structures, advanced vocabulary.
- YDT: Upper-intermediate to Advanced academic level, slightly more accessible than YDS but still formal.

INSTRUCTIONS:
1. Generate a "title" for the passage.
2. Generate a "passage" text (approx 200-250 words).
3. Generate 3 "questions". Each must have:
   - "qText": The question text.
   - "options": An object with letters A, B, C, D, E.
   - "correct": The letter of the correct answer.
   - "explanation": A 1-2 sentence explanation of why this answer is correct in Turkish.
4. Language of the passage and questions: ENGLISH.
5. Language of the title and explanation: Passage in English, Explanation in TURKISH.
6. Topic: ${topic}

RULES:
- Format: STRICT JSON.
- Style: Formal, academic, objective.
- Ensure the questions test different skills: (e.g., Main Idea, Specific Detail, Inference/Author's Attitude).

OUTPUT STRUCTURE:
{
  "title": "",
  "passage": "",
  "questions": [
    {
      "qText": "",
      "options": {"A": "", "B": "", "C": "", "D": "", "E": ""},
      "correct": "A-E",
      "explanation": ""
    }
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
          { role: "user", content: `Generate a ${difficulty} level passage about ${topic}.` }
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
