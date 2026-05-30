import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "edusearch-secret-2024")

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  }

  const token = await new SignJWT({ id: user.id, name: user.name, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret)

  const res = NextResponse.json({ id: user.id, name: user.name, email: user.email })
  res.cookies.set("auth-token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7, path: "/" })
  return res
}