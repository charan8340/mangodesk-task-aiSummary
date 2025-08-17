import express from "express";
import aiController from "../controllers/aiController.js";

const router = express.Router();

// POST /api/ai/summary
router.post("/summary", aiController.getSummary);

export default router;
