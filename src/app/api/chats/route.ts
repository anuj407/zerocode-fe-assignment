import { connectDB } from "@/lib/mongoose";
import { Chat } from "@/api/models/Chat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const newChat = await Chat.create({ userId });
    return NextResponse.json(newChat);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
  }
}
