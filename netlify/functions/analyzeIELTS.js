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

ANALYSIS GUIDELINES:
1. READING & LISTENING: Score based on standard IELTS conversion tables (e.g., 30/40 correct ≈ Band 7.0).
2. WRITING: Evaluate the student's text based on: Task Response, Coherence/Cohesion, Lexical Resource, and Grammatical Range.
3. SPEAKING: Not applicable here as it's self-study, but you can give general tips if there are prompts.
4. TOTAL SCORE: Calculate the average of all modules and round to the nearest 0.5 as per IELTS rules.

OUTPUT STRUCTURE (STRICT JSON IN TURKISH):
{
  "scores": {
    "reading": { "score": "7.5", "comment": "Metin içindeki detayları yakalamada başarılısınız ancak 'Not Given' sorularında dikkatli olmalısınız." },
    "listening": { "score": "8.0", "comment": "Dikkatiniz çok iyi, distraktörleri kolayca elediniz." },
    "writing": { "score": "6.0", "comment": "Task 2'de bağlaç kullanımınız iyi ama kelime çeşitliliği (Vocabulary) artırılmalı." },
    "overall": "7.0"
  },
  "ai_analysis": {
    "strengths": ["Güçlü yan 1", "Güçlü yan 2"],
    "weaknesses": ["Gelişmesi gereken yan 1", "Gelişmesi gereken yan 2"],
    "roadmap": "Önümüzdeki 2 hafta için çalışma önerisi"
  }
}

RULES:
- Language: TURKISH.
- Format: STRICT JSON.
- Be realistic and discouragingly honest if needed, like a real examiner.
`;

    const userPrompt = `
EXAM DATA: ${JSON.stringify(examData)}
USER ANSWERS: ${JSON.stringify(userAnswers)}
Please analyze and return the band score results.
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
