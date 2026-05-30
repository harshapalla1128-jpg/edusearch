import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "edusearch-secret-2024")

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value
  if (!token) return NextResponse.json(null)

  try {
    const { payload } = await jwtVerify(token, secret)
    return NextResponse.json(payload)
  } catch {
    return NextResponse.json(null)
  }
}
