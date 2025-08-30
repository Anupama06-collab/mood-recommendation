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
app.get("/seed", async (req, res) => {
  // Remove all previous recommendations
  await Recommendation.deleteMany({});

  // Insert sample movies and books
  await Recommendation.insertMany([
    { title: "Inside Out", mood: "happy", type: "movie" },
    { title: "The Pursuit of Happyness", mood: "happy", type: "movie" },
    { title: "Joker", mood: "sad", type: "movie" },
    { title: "The Fault in Our Stars", mood: "sad", type: "movie" },
    { title: "Inception", mood: "excited", type: "movie" },
    { title: "Avengers: Endgame", mood: "excited", type: "movie" },
    { title: "Harry Potter", mood: "happy", type: "book" },
    { title: "The Alchemist", mood: "happy", type: "book" },
    { title: "Norwegian Wood", mood: "sad", type: "book" },
    { title: "Me Before You", mood: "sad", type: "book" },
    { title: "The Hunger Games", mood: "excited", type: "book" },
    { title: "Divergent", mood: "excited", type: "book" }
  ]);

  res.send("✅ Sample recommendations inserted!");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
