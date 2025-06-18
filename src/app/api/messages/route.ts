import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/lib/mongoose";
import { Message } from "@/api/models/Message";

export async function GET(req: NextRequest) {
  await connectDB();

  const chatId = req.nextUrl.searchParams.get("chatId");
  if (!chatId) {
    return NextResponse.json({ error: "Missing chatId" }, { status: 400 });
  }

  try {
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    return NextResponse.json(messages);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch messages" , err}, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { chatId, role, content } = body;

    if (!chatId || !role || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const message = await Message.create({ chatId, role, content });
    return NextResponse.json(message);
  } catch (err) {
    return NextResponse.json({ error: "Failed to save message" , err}, { status: 500 });
  }
}
