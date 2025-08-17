import express from "express";
import bodyParser from "body-parser";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/ai", aiRoutes);

export default app;
