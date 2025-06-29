// models/User.ts
import  { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Avoid re-registering model on hot-reload
export const User = models.User || model("User", UserSchema);
