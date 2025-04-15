import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";

export async function GET() {
    const session = await getSession();
  
    if (!session) {
      return NextResponse.json({ email: null }, { status: 401 });
    }
  
    try {
      const { email, expiresAt } = session;
      if (new Date(expiresAt) < new Date()) {
        return NextResponse.json({ email: null }, { status: 401 });
      }
      console.log(email);
      return NextResponse.json({ email });
    } catch (err) {
      console.error("Session parsing failed:", err);
      return NextResponse.json({ email: null }, { status: 401 });
    }
  }
  