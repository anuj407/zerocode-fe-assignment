// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  console.log("Received message:", message);

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "command-r", // Or "command-r-plus" if your plan allows
        message: message,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("Cohere chat response:", JSON.stringify(data, null, 2));

    const botReply = data.text?.trim();

    return NextResponse.json({ reply: botReply || "No reply received from Cohere." });
  } catch (error) {
    console.error("Cohere Error:", error);
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 });
  }
}
