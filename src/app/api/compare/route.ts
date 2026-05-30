import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const slugs = req.nextUrl.searchParams.getAll("slug")

  if (slugs.length < 2 || slugs.length > 3) {
    return NextResponse.json({ error: "Provide 2 or 3 colleges" }, { status: 400 })
  }

  const colleges = await prisma.college.findMany({
    where: { slug: { in: slugs } },
    include: {
      courses: true,
      placements: { take: 1, orderBy: { year: "desc" } },
    }
  })

  return NextResponse.json(colleges)
}