import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "edusearch-secret-2024")

async function getUser(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as { id: string; email: string; name: string }
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const user = await getUser(req)
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 })

  const saved = await prisma.savedCollege.findMany({
    where: { userId: user.id },
    include: {
      college: {
        include: { placements: { take: 1, orderBy: { year: "desc" } } }
      }
    }
  })

  return NextResponse.json(saved.map(s => s.college))
}

export async function POST(req: NextRequest) {
  const user = await getUser(req)
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 })

  const { collegeId } = await req.json()

  const saved = await prisma.savedCollege.upsert({
    where: { userId_collegeId: { userId: user.id, collegeId } },
    create: { userId: user.id, collegeId },
    update: {}
  })

  return NextResponse.json(saved)
}

export async function DELETE(req: NextRequest) {
  const user = await getUser(req)
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 })

  const { collegeId } = await req.json()

  await prisma.savedCollege.delete({
    where: { userId_collegeId: { userId: user.id, collegeId } }
  })

  return NextResponse.json({ success: true })
}