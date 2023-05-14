import mongoose, { model } from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Todos", todoSchema);
