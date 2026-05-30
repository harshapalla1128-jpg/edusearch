import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { exam, rank, category = "General" } = body

  if (!exam || !rank) {
    return NextResponse.json({ error: "Provide exam and rank" }, { status: 400 })
  }

  const cutoffs = await prisma.rankCutoff.findMany({
    where: {
      exam: exam,
      category: category,
      rankMax: { gte: Number(rank) },
      rankMin: { lte: Number(rank) },
    },
    include: {
      college: {
        include: {
          placements: { take: 1, orderBy: { year: "desc" } }
        }
      }
    },
    orderBy: { college: { nirfRank: "asc" } }
  })

  const colleges = cutoffs.map(c => ({
    ...c.college,
    matchedCourse: c.course,
    cutoffMin: c.rankMin,
    cutoffMax: c.rankMax,
  }))

  return NextResponse.json({ colleges })
}
