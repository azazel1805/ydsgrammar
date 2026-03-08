export const handler = async (event, context) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "" };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, headers, body: "Method Not Allowed" };
    }

    try {
        const body = event.body ? JSON.parse(event.body) : {};
        const mode = body.mode;
        const input = body.input || body.text;

        if (!mode || !input) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing mode or text" }) };
        }

        const systemPrompt = getStructuredPrompt(mode);

        if (!systemPrompt) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid mode" }) };
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
                    { role: "user", content: input }
                ]
            })
        });

        const data = await response.json();

        if (!data.choices) {
            return { statusCode: 500, headers, body: JSON.stringify({ error: "OpenAI response invalid" }) };
        }

        const content = data.choices[0].message.content;

        const clean = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return { statusCode: 200, headers, body: clean };

    } catch (err) {
        console.error("Linguistic Lab Error:", err);
        return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
    }
};

function getStructuredPrompt(mode) {

    if (mode === "word") {
        return `
You are an academic linguist.

Return ONLY valid JSON.

{
  "morphology": "",
  "semantic_evolution": "",
  "register": "",
  "collocations": [],
  "derivations": [],
  "passive_tendency": "",
  "yds_trap": "",
  "cefr": "",
  "turkish_explanation": ""
}
`;
    }

    if (mode === "sentence") {
        return `
You are a syntax analyst.

Return ONLY valid JSON.

{
  "clause_structure": "",
  "verb_analysis": "",
  "tense_voice": "",
  "complexity_level": "",
  "academic_density": "",
  "exam_traps": "",
  "paraphrase_difficulty": "",
  "turkish_explanation": ""
}
`;
    }

    if (mode === "discourse" || mode === "paragraph") {
        return `
You are a discourse analyst.

Return ONLY valid JSON.

{
  "topic_sentence": "",
  "logical_progression": "",
  "connectors": "",
  "argument_style": "",
  "cohesion_devices": "",
  "academic_tone": "",
  "exam_prediction": "",
  "paraphrase_level": "",
  "turkish_meta": ""
}
`;
    }

    return null;
}