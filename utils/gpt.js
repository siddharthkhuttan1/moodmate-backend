const OpenAI = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeEntry(entry) {
    const prompt = `
  Analyze this journal entry: "${entry}"
  Return JSON with:
  - mood (map the mood to one out of happy/angry/anxious/sad/relaxed)
  - tone (Low/Neutral/High)
  - 2-3 tags (single words)
  `;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });


    const reply = response.choices[0].message.content;

    try {
        const result = JSON.parse(reply);
        return result;
    } catch (e) {
        const [mood, tone, ...tags] = reply.match(/\w+/g);
        return {
            mood,
            tone,
            tags,
        };
    }
}

module.exports = { analyzeEntry };
