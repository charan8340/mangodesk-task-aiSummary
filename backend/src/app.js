import express from "express";
import aiRoutes from "./routes/aiRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';


const app = express();

const cors = require("cors");

app.use(cors());

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/user", userRoutes);

export default app;

