import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongoose";
import { User } from "@/api/models/User";
import bcrypt from "bcryptjs";

const SECRET = process.env.JWT_SECRET || "mysecretkey123";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
