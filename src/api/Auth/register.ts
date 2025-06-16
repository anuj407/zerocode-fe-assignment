// app/api/auth/register/route.ts
import { NextResponse } from "next/server";

const users: { email: string; password: string }[] = globalThis.users || [];

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  users.push({ email, password });
  globalThis.users = users;

  return NextResponse.json({ message: "User registered successfully" });
}
