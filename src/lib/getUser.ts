/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { User } from "@/api/models/User"; // adjust path if needed

export const getUserFromToken = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findOne({ email: decoded.email });
    return user;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};
