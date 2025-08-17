import express from "express";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Accept plain transcript
router.post("/text", (req, res) => {
  const { transcript } = req.body;

  if (!transcript) {
    return res.status(400).json({ message: "Transcript is required" });
  }

  res.json({
    message: "Transcript received",
    data: transcript,
  });
});

// Accept file upload
router.post("/file", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const transcript = req.file.buffer.toString("utf-8");

  res.json({
    message: "File uploaded successfully",
    data: transcript,
  });
});

export default router;
