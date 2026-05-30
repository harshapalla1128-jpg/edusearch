import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const q = params.get("q") || ""
  const state = params.get("state") || ""
  const type = params.get("type") || ""
  const maxFees = params.get("maxFees") ? Number(params.get("maxFees")) : undefined
  const page = Number(params.get("page") || 1)
  const limit = 12

  const where: any = {
    ...(q && {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { city: { contains: q, mode: "insensitive" } },
        { state: { contains: q, mode: "insensitive" } },
      ]
    }),
    ...(state && { state: { contains: state, mode: "insensitive" } }),
    ...(type && { type: type }),
    ...(maxFees && { totalFees: { lte: maxFees } }),
  }

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { rating: "desc" },
      include: {
        placements: { take: 1, orderBy: { year: "desc" } }
      }
    }),
    prisma.college.count({ where })
  ])

  return NextResponse.json({ colleges, total, page, totalPages: Math.ceil(total / limit) })
}
