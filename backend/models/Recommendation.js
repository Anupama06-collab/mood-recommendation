import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mood: { type: String, required: true },
  type: { type: String, enum: ["movie", "book"], required: true }
});

export default mongoose.model("Recommendation", recommendationSchema);
