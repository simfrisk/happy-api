import mongoose from "mongoose";

const ThoughtSchema = new mongoose.Schema({
  message: String,
  hearts: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Thought = mongoose.model("Thought", ThoughtSchema);