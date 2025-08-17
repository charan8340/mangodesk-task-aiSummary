import express from "express";
import { summarizeText } from "../controllers/aiController.js";

const router = express.Router();

// POST route for generating AI summaries
router.post("/summarize", summarizeText);

export default router;
