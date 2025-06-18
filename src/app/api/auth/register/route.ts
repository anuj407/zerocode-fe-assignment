// app/api/auth/register/route.ts
import { connectDB } from "@/lib/mongoose";
import { User } from "@/api/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mysecretkey123";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    // ✅ Generate JWT token
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({
      message: "User created",
      token,
      user: newUser,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error creating user", error: err },
      { status: 500 }
    );
  }
}
