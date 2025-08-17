import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // set in .env
});

export const generateSummary = async (transcript, prompt) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or "gpt-4"
      messages: [
        { role: "system", content: "You are an AI that summarizes meeting transcripts." },
        { role: "user", content: `Transcript: ${transcript}\n\nInstruction: ${prompt}` },
      ],
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI API Error:", error.message);
    throw new Error("Failed to generate summary");
  }
};
