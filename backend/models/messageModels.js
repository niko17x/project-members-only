import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    // "text" fieldname must match your input name. 'text" !== "content"
    text: {
      type: String,
      required: [true, "Enter message"],
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
