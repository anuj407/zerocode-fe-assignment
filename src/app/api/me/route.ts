// app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  const token = auth.split(" ")[1];

  try {
    const data = jwt.verify(token, SECRET) as { email: string };
    return NextResponse.json({ user: { email: data.email } });
  } catch (err) {
    return NextResponse.json({ err}, { status: 401 });
  }
}
