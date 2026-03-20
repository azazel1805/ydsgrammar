
export const handler = async (event) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
    if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: "Method Not Allowed" };

    try {
        const { text } = JSON.parse(event.body);
        const apiKey = process.env.GOOGLE_NLP_API_KEY || process.env.GEMINI_API_KEY;

        if (!text) return { statusCode: 400, headers, body: JSON.stringify({ error: "No text provided" }) };
        if (!apiKey) return { statusCode: 500, headers, body: JSON.stringify({ error: "API Key not configured" }) };

        // Vertex AI / AI Studio API Key endpoint for Gemini 2.5 Flash-Lite
        const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

        const prompt = `Analiz etmek için şu İngilizce cümleyi kullan: "${text}"

Her kelime için Google Cloud NLP formatında 'tokens' dizisi oluştur (tag: NOUN/VERB/ADJ/ADV/PRON/DET/ADP/CONJ/PRT/PUNCT; tense: PAST/PRESENT/FUTURE/vb.; lemma: kelime kökü).

SADECE aşağıdaki JSON yapısında dön:
{
  "translation": "Türkçe çeviri",
  "tokens": [
    {
      "text": { "content": "word" },
      "partOfSpeech": { "tag": "TAG", "tense": "TENSE", "aspect": "ASPECT", "case": "CASE", "mood": "MOOD" },
      "lemma": "root"
    }
  ],
  "tense": "Zaman adı (ör: Present Perfect)",
  "cefr": "Seviye (A1-C2)",
  "backTranslation": "Cümlenin daha doğal İngilizce versiyonu",
  "explanation": "Detaylı dilbilgisi açıklaması ve YDS/IELTS ipuçları (Türkçe)",
  "categories": [{ "name": "Dilbilgisi Konusu" }]
}`;

        const response = await fetch(geminiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                    temperature: 0.2
                }
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error?.message || "Gemini API failure");
        }

        const rawResult = data.candidates[0].content.parts[0].text;
        const result = JSON.parse(rawResult);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...result,
                originalText: text
            })
        };
    } catch (error) {
        console.error("NLP Error:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
