'use client'
import Link from 'next/link'
import { MapPin, Star, IndianRupee, TrendingUp } from 'lucide-react'

interface Props {
  college: any
  onCompare: (slug: string) => void
  compareList: string[]
}

export default function CollegeCard({ college, onCompare, compareList }: Props) {
  const isSelected = compareList?.includes(college.slug)
  const p = college.placements?.[0]

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-50 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 p-4 flex flex-col gap-3">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          {college.type}
        </span>
        {college.nirfRank && (
          <span className="text-xs text-gray-400">#{college.nirfRank} NIRF</span>
        )}
      </div>

      {/* Name & location */}
      <div>
        <h3 className="font-bold text-gray-900 leading-tight">{college.name}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
          <MapPin size={12} /> {college.city}, {college.state}
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-3 text-sm">
        <span className="flex items-center gap-1 text-amber-500 font-medium">
          <Star size={13} fill="currentColor" /> {college.rating}
        </span>
        <span className="flex items-center gap-1 text-gray-600">
          <IndianRupee size={13} />{(college.totalFees / 100000).toFixed(1)}L/yr
        </span>
        {p && (
          <span className="flex items-center gap-1 text-green-600">
            <TrendingUp size={13} />{(p.averagePackage / 100).toFixed(1)}L avg
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-1">
        <Link
          href={`/colleges/${college.slug}`}
          className="flex-1 text-center py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
        <button
           onClick={() => onCompare(college.slug)}
          disabled={!isSelected && compareList.length >= 3}
          className={`px-3 py-2 rounded-xl text-sm border transition-colors ${
            isSelected
              ? 'bg-blue-50 border-blue-400 text-blue-600'
              : compareList.length >= 3
              ? 'opacity-40 cursor-not-allowed border-gray-200 text-gray-400'
              : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600'
          }`}
        >
          {isSelected ? '✓ Added' : '+ Compare'}
        </button>
      </div>
    </div>
  )
}