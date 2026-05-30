import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const collegeId = req.nextUrl.searchParams.get("collegeId")

  const questions = await prisma.question.findMany({
    where: collegeId ? { collegeId } : {},
    include: {
      answers: { orderBy: { createdAt: "asc" } },
      college: { select: { name: true, slug: true } }
    },
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(questions)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, body: qBody, author, collegeId } = body

  if (!title || !qBody || !author) {
    return NextResponse.json({ error: "Title, body and author are required" }, { status: 400 })
  }

  const question = await prisma.question.create({
    data: { title, body: qBody, author, collegeId: collegeId || null },
    include: { answers: true, college: { select: { name: true, slug: true } } }
  })

  return NextResponse.json(question)
}