// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your-secret-key";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /chat route
  if (pathname.startsWith("/chat")) {
    const token = req.cookies.get("token")?.value || req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      jwt.verify(token, SECRET);
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat"],
};
