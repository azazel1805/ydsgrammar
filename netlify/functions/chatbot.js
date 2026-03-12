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
    const userMessage = body.message;
    const history = body.history || [];

    if (!userMessage) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Message missing" }) };
    }

    const systemPrompt = `
You are a YDS/YDT/YÖKDİL expert coach and mentor. 
Your goal is to help Turkish students prepare for these exams by explaining grammar concepts, analyzing vocabulary, and providing exam strategies.

RULES:
1. Always be encouraging and professional.
2. Use Turkish as the primary language for explanations.
3. Use English for examples and specific grammar terms.
4. If asked about a grammar topic, give clear, concise rules and a few examples.
5. If the user sent a question, help them solve it Step-by-Step.
6. Keep responses concise but comprehensive.
7. Avoid generic AI fluff; talk like a specialized tutor.
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: userMessage }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7, // Higher for natural conversation
        max_tokens: 1000,
        messages: messages
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "AI returned empty content" }) };
    }

    return { 
      statusCode: 200, 
      headers, 
      body: JSON.stringify({ reply: reply }) 
    };

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
