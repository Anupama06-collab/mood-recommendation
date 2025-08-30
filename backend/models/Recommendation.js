import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["movie", "book"], required: true },
  description: { type: String }
});

export default mongoose.model("Recommendation", recommendationSchema);
