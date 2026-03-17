import fetch from 'node-fetch';

export const handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { images, meta } = JSON.parse(event.body);

        if (!images || images.length === 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No images provided" })
            };
        }

        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

        // Prepare messages for Vision API
        const messages = [
            {
                role: "system",
                content: `You are an expert YDS/YDT exam specialist and OCR expert. 
Your task is to analyze the provided images of exam pages and extract the questions into a structured JSON format.

INSTRUCTIONS:
1. Extract ALL questions from the images. 
2. Identify the question text, all 5 options (A, B, C, D, E), and determine the CORRECT answer using your advanced English knowledge.
3. If there is a reading passage associated with the questions, extract the passage text once and assign it to the corresponding questions using 'passage_id'.
4. Format the output STRICTLY as follows:
{
  "meta": {
    "title": "${meta?.title || 'PDF Generated Exam'}",
    "subtitle": "${meta?.count || images.length} Pages Extracted",
    "total_questions": 0,
    "duration_minutes": 60
  },
  "sections": [
    { "id": "MIXED", "label": "Mixed Content", "from": 1, "to": 0 }
  ],
  "passages": [
    { "id": "p1", "text": "passage text here" }
  ],
  "questions": [
    {
      "id": 1,
      "section_id": "MIXED",
      "question": "question text",
      "options": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
      "correct": "A",
      "passage_id": null
    }
  ]
}

5. Ensure 'total_questions' and 'to' in sections are updated correctly.
6. Return ONLY the JSON object, no other text.`
            },
            {
                role: "user",
                content: [
                    { type: "text", text: "Please extract the questions from these exam pages." },
                    ...images.map(img => ({
                        type: "image_url",
                        image_url: { url: img }
                    }))
                ]
            }
        ];

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: messages,
                max_tokens: 4096,
                response_format: { type: "json_object" }
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const examJson = JSON.parse(data.choices[0].message.content);
            
            // Post-process to ensure IDs are strictly sequential starting from 1
            if (examJson.questions) {
                examJson.questions.forEach((q, idx) => {
                    q.id = idx + 1;
                });
                examJson.meta.total_questions = examJson.questions.length;
                if(examJson.sections && examJson.sections[0]) {
                    examJson.sections[0].to = examJson.questions.length;
                }
            }

            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(examJson)
            };
        } else {
            throw new Error("Invalid AI response");
        }

    } catch (error) {
        console.error("PDF to Exam error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
