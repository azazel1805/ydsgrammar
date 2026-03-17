const fetch = require('node-fetch');

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const { text } = JSON.parse(event.body);
    const apiKey = process.env.OPENAI_API_KEY;

    if (!text) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "No text provided" }) };
    }

    if (!apiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "OpenAI API Key not configured" }) };
    }

    const systemPrompt = `You are a YDS/YDT/YÖKDİL expert English teacher. 
    Analyze the sentence for grammar, tense agreement, and academic style. 
    Provide a corrected version and a detailed explanation in Turkish.
    If the sentence is already perfect, say so.
    
    RETURN ONLY A JSON OBJECT:
    {
      "corrected": "The corrected sentence",
      "explanation": "Explanation of changes in Turkish",
      "score": 0-100 (Academic quality score)
    }`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this sentence: "${text}"` }
        ]
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return { 
        statusCode: 500, 
        headers, 
        body: JSON.stringify({ error: "AI returned empty content" }) 
      };
    }

    // Clean JSON if OpenAI adds markdown blocks
    const cleanJson = content.replace(/```json/g, "").replace(/```/g, "").trim();

    return {
      statusCode: 200,
      headers,
      body: cleanJson
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
