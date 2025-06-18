import  { Schema, model, models } from "mongoose";

const ChatSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Chat = models.Chat || model("Chat", ChatSchema);
