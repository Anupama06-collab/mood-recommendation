import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Recommendation from "./models/Recommendation.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ Route: Get recommendations by mood
app.get("/recommendations", async (req, res) => {
  try {
    const mood = req.query.mood;
    if (!mood) return res.status(400).json({ error: "Mood is required" });

    const recs = await Recommendation.find({ mood });
    res.json(recs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
