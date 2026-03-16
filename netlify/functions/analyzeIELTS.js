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
    const { examData, userAnswers } = body;

    if (!examData || !userAnswers) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing exam data or user answers" }) };
    }

    const systemPrompt = `
You are an expert IELTS Examiner and AI Strategy Coach. Your goal is to analyze a student's IELTS mock exam performance and provide a highly realistic Band Score (0-9) and a detailed strategic analysis.

IELTS READING QUESTION TYPES BACKGROUND (IELTS LIZ):
1. Matching Headings, 2. T/F/NG & Y/N/NG, 3. Matching Paragraph Info, 4. Summary Completion, 5. Sentence Completion, 6. Multiple Choice, 7. List Selection, 8. Choosing a Title, 9. Classification (Matching Features), 10. Matching Sentence Endings, 11. Table Completion, 12. Flow Chart Completion, 13. Diagram Completion, 14. Short Answer.

ANALYSIS GUIDELINES:
1. READING: Total 40 questions across 3 passages. Score based on correct answers (e.g., 30/40 = 7.0). Identify which of the 14 question types the student struggled with most.
2. LISTENING: Analyze accuracy, distractor handling, and spelling.
3. WRITING: Evaluate Task 1 (Report) and Task 2 (Essay) based on official criteria: Task Response, Coherence/Cohesion, Lexical Resource, Grammatical Range/Accuracy.
4. TOTAL SCORE: Average of modules rounded to nearest 0.5.

OUTPUT STRUCTURE (STRICT JSON IN TURKISH):
{
  "scores": {
    "reading": { "score": "X.X", "comment": "Soru tipleri bazlı detaylı analiz (örn: 'Matching Headings' kısmında başarılısınız...)" },
    "listening": { "score": "X.X", "comment": "Dikte ve dikkat dağıtıcı analizi." },
    "writing": { "score": "X.X", "comment": "Kelime çeşitliliği ve yapı analizi." },
    "overall": "X.X"
  },
  "ai_analysis": {
    "strengths": ["...", "..."],
    "weaknesses": ["...", "..."],
    "roadmap": "Hangi soru tiplerine (örn: T/F/NG) ağırlık verilmeli, günlük çalışma rutini önerisi."
  }
}

RULES:
- Language: TURKISH.
- Format: STRICT JSON.
- Be highly analytical, referencing specific IELTS reading question types if they appear in the user's mistakes.
`;

    const userPrompt = `
EXAM DATA: ${JSON.stringify(examData)}
USER ANSWERS: ${JSON.stringify(userAnswers)}
Analyze the performance based on the specific question types and return the band score results.
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
          { role: "user", content: userPrompt }
        ]
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "AI returned empty content" }) };
    }

    const clean = content.replace(/```json/g, "").replace(/```/g, "").trim();

    return { statusCode: 200, headers, body: clean };

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
