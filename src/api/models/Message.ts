import  { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["user", "bot"], required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = models.Message || model("Message", MessageSchema);
