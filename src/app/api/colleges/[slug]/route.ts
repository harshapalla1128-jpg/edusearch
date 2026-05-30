import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/").pop()

  if (!slug) {
    return NextResponse.json({ error: "No slug" }, { status: 400 })
  }

  const college = await prisma.college.findUnique({
    where: { slug: slug },
    include: {
      courses: true,
      placements: { orderBy: { year: "desc" } },
      reviews: { orderBy: { createdAt: "desc" } },
    }
  })

  if (!college) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(college)
}