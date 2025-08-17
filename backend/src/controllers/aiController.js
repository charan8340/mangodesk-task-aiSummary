import { generateSummary } from "../services/aiService.js";

// POST /api/ai/summarize
export const summarizeText = async (req, res) => {
  try {
    const { transcript, prompt } = req.body;

    if (!transcript || !prompt) {
      return res.status(400).json({ message: "Transcript and prompt are required" });
    }

    const summary = await generateSummary(transcript, prompt);

    res.json({
      message: "Summary generated successfully",
      summary,
    });
  } catch (error) {
    console.error("Error in summarizeText:", error.message);
    res.status(500).json({ message: "Failed to generate summary", error: error.message });
  }
};
