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
    const { mode, question, context: passage, options, userChoice, correctChoice } = body;

    if (!mode || !question) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing parameters" }) };
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (mode === "help") {
      systemPrompt = `
You are an elite YDS/YDT Strategy Coach. 
A student is stuck on a question and needs a HINT, not the answer.
The student must solve it themselves.

INSTRUCTIONS:
1. "grammar_focus": Identify the grammar topic (e.g., Active-Passive, Modals, Relative Clauses).
2. "structural_clue": Point out a key word or structure in the sentence that acts as a signal (e.g., "Cümledeki 'by the time' yapısına dikkat et").
3. "thinking_path": Provide 1-2 steps to follow to arrive at the answer without revealing the correct option.
4. "elimination_hint": Suggest what kind of options should be eliminated first (e.g., "Zaman uyumuna uymayan şıkları eleyebilirsin").

Language: TURKISH.
Format: JSON.
`;
      userPrompt = `
Passage: ${passage || "None"}
Question: ${question}
Options: ${JSON.stringify(options)}
Provide a hint for this question.
`;
    } else if (mode === "explain") {
      systemPrompt = `
You are an elite YDS/YDT Strategy Coach.
The student has answered a question. You need to explain the logic.

INSTRUCTIONS:
1. Confirm if the student was correct or incorrect (based on correctChoice).
2. "logic": Explain the core grammatical or contextual logic.
3. "why_correct": Roadmap to the correct answer.
4. "why_wrong": If userChoice was provided and it's wrong, explain specifically why that choice is incorrect.
5. "exam_tip": A short tip for future questions.

Language: TURKISH.
Format: JSON.
`;
      userPrompt = `
Passage: ${passage || "None"}
Question: ${question}
Options: ${JSON.stringify(options)}
Correct Option: ${correctChoice}
User's Choice: ${userChoice || "None"}
Provide a detailed explanation.
`;
    }

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
          { role: "user", content: userPrompt }
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
