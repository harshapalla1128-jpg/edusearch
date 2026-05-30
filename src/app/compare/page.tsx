'use client'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Suspense } from 'react'
import { MapPin, Star, IndianRupee, TrendingUp } from 'lucide-react'
import Link from 'next/link'

function CompareContent() {
  const searchParams = useSearchParams()
 const slugs = searchParams.getAll('slug')
const ids = slugs.join(',')

  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ['compare', ids],
   queryFn: () => axios.get(`/api/compare?${ids.split(',').map(s => `slug=${s}`).join('&')}`).then(r => r.data),
   enabled: slugs.length >= 2,
  })

  if (!ids) return (
    <div className="text-center py-20">
      <p className="text-gray-400 mb-4">No colleges selected</p>
      <Link href="/" className="text-blue-600 hover:underline">Browse Colleges</Link>
    </div>
  )

  if (isLoading) return (
    <div className="text-center py-20 text-gray-400">Loading comparison...</div>
  )

  const rows = [
    { label: 'Type', getValue: (c: any) => c.type },
    { label: 'Location', getValue: (c: any) => c.location },
    { label: 'Established', getValue: (c: any) => c.established },
    { label: 'NIRF Rank', getValue: (c: any) => c.nirfRank ? `#${c.nirfRank}` : '—' },
    { label: 'NAAC Grade', getValue: (c: any) => c.naacGrade || '—' },
    { label: 'Annual Fees', getValue: (c: any) => `₹${(c.totalFees / 100000).toFixed(1)}L` },
    { label: 'Rating', getValue: (c: any) => `⭐ ${c.rating}` },
    { label: 'Avg Package', getValue: (c: any) => c.placements?.[0] ? `₹${(c.placements[0].averagePackage / 100).toFixed(1)}L` : '—' },
    { label: 'Highest Package', getValue: (c: any) => c.placements?.[0] ? `₹${(c.placements[0].highestPackage / 100).toFixed(1)}L` : '—' },
    { label: 'Placement Rate', getValue: (c: any) => c.placements?.[0] ? `${c.placements[0].placementRate}%` : '—' },
    { label: 'Total Courses', getValue: (c: any) => c.courses?.length || '—' },
  ]

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 bg-gray-50 text-sm font-medium text-gray-500 w-40 rounded-tl-xl">Feature</th>
              {colleges.map((c: any) => (
                <th key={c.id} className="p-4 bg-blue-50 text-sm font-bold text-gray-800 text-center">
                  <div>{c.name}</div>
                  <div className="text-xs font-normal text-gray-500 flex items-center justify-center gap-1 mt-1">
                    <MapPin size={11} /> {c.city}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-4 text-sm text-gray-500 font-medium">{row.label}</td>
                {colleges.map((c: any) => (
                  <td key={c.id} className="p-4 text-center text-sm text-gray-800 font-medium">
                    {row.getValue(c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-center">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to search
        </Link>
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Compare Colleges</h1>
      <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading...</div>}>
        <CompareContent />
      </Suspense>
    </main>
  )
}