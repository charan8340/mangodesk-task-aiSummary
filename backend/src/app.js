import express from "express";
import aiRoutes from "./routes/aiRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';


const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "https://mangodesk-task-ai-summary-mqjt-1260kyi0w-charan8340s-projects.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);

export default app;

