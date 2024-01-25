import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
  answer: {
    type: Boolean,
    required: true,
  },
});

export const Member = mongoose.model("Member", memberSchema);
