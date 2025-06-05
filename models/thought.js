import mongoose from "mongoose";

const ThoughtSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 140
  },
  hearts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Thought = mongoose.model("Thought", ThoughtSchema);