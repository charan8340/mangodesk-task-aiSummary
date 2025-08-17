import express from "express";
import aiRoutes from "./routes/aiRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';


const app = express();

const cors = require("cors");

app.use(cors()); // allows all origins

app.use(
  cors({
    origin: "https://mangodesk-task-ai-summary-4tog.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const aiRoutes = require("./routes/aiRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/", aiRoutes);
app.use("/", userRoutes);

export default app;

