import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { author, body: answerBody } = body
  const questionId = req.nextUrl.pathname.split("/")[4]

  if (!author || !answerBody) {
    return NextResponse.json({ error: "Author and body required" }, { status: 400 })
  }

  const answer = await prisma.answer.create({
    data: { author, body: answerBody, questionId }
  })

  return NextResponse.json(answer)
}