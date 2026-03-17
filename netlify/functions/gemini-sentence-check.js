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
    const apiKey = process.env.GOOGLE_AI_API_KEY;

    if (!text) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "No text provided" }) };
    }

    if (!apiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Gemini API Key not configured" }) };
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

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nSentence to analyze: "${text}"`
          }]
        }],
        generationConfig: {
          temperature: 0.4,
          topP: 1,
          topK: 32,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      return { 
        statusCode: 500, 
        headers, 
        body: JSON.stringify({ error: "AI returned empty content", raw: data }) 
      };
    }

    // Clean JSON if Gemini adds markdown blocks
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
