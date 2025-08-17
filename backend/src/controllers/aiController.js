import aiService from "../services/aiService.js";

const getSummary = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text input is required" });
    }

    const summary = await aiService.summarizeText(text);
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default { getSummary };
