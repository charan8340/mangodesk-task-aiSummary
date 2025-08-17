import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import nodemailer from "nodemailer";
import { Groq } from "groq-sdk";
import 'dotenv/config';

const app = express();
app.use(cors({
  origin: ["https://mangodesk-task-ai-summary-76ma.vercel.app"], 
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(bodyParser.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// === Route 1: Generate Summary ===
app.post("/generate-summary", async (req, res) => {
  try {
    const { transcript, instruction } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // change model if needed
      messages: [
        { role: "system", content: "You are a meeting summarizer." },
        { role: "user", content: `Transcript:\n${transcript}\n\nInstruction: ${instruction}` },
      ],
      max_completion_tokens: 1024,
      temperature: 0.7,
    });

    const summary = completion.choices[0]?.message?.content || "No summary generated.";

    res.json({ summary });
  } catch (err) {
    console.error("Groq API error:", err);
    res.status(500).json({ error: err.message });
  }
});

// === Route 2: Send email ===
app.post("/send-email", async (req, res) => {
  try {
    const { summary, recipients } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"AI Meeting Notes" <${process.env.EMAIL_USER}>`,
      to: recipients.join(","),
      subject: "Meeting Summary",
      text: summary,
    });

    res.json({ message: "Email sent successfully!", info });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: err.message });
  }
});

// === Start server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
