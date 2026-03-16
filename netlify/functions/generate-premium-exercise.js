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

    // Use default values if missing
    const selectedTopic = topic || "General Academic English";
    const selectedDiff = difficulty || "YDS";

    const systemPrompt = `
You are an expert ${selectedDiff} (Academic English Exam) content creator.
Your task is to generate an interactive vocabulary matching exercise based on a reading passage.

INSTRUCTIONS:
1. Generate a "title" for the exercise.
2. Generate a "passage" text (approx 200 words). 
3. Select 8-10 "vocabulary_targets" (words or short phrases) that are present in the passage.
4. For each target, provide a formal "definition" in English.
5. In the "passage", the selected vocabulary targets must be wrapped in <b> tags or marked clearly so the user can see them (or you can just provide the list and I will highlight them). Actually, please wrap them in <b class="text-red-700">text</b> tags within the passage string.

LANGUAGE:
- All content (title, passage, targets, definitions) must be in ENGLISH.

OUTPUT STRUCTURE (STRICT JSON):
{
  "title": "",
  "passage": "",
  "definitions": [
    { "id": 1, "text": "definition text...", "answer": "word_from_passage" },
    ...
  ]
}

Topic: ${selectedTopic}
Difficulty Level: ${selectedDiff}
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
          { role: "user", content: `Generate a ${selectedDiff} level vocabulary exercise about ${selectedTopic}.` }
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
