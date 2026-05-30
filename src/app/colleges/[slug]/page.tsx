'use client'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MapPin, Star, IndianRupee, TrendingUp, Award } from 'lucide-react'
import SaveButton from '@/components/SaveButton'

export default function CollegeDetailPage() {
  const { slug } = useParams()

  const { data: college, isLoading } = useQuery({
    queryKey: ['college', slug],
    queryFn: () => axios.get(`/api/colleges/${slug}`).then(r => r.data),
  })

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen text-gray-400">Loading...</div>
  )

  if (!college || college.error) return (
    <div className="text-center py-20 text-gray-400">College not found.</div>
  )

  const latestPlacement = college.placements?.[0]

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <div className="bg-white rounded-2xl border p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">{college.type}</span>
            <h1 className="text-3xl font-bold mt-2 text-gray-900">{college.name}</h1>
            <p className="text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={14} /> {college.location} · Est. {college.established}
            </p>
          </div>
          {college.nirfRank && (
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">#{college.nirfRank}</div>
              <div className="text-xs text-gray-400">NIRF Rank</div>
              <SaveButton collegeId={college.id} />
            </div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 bg-amber-50 rounded-xl">
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-xl">
              <Star size={18} fill="currentColor" /> {college.rating}
            </div>
            <div className="flex items-start justify-between">
  <div>
    ...college name and location...
  </div>
  <div className="flex flex-col items-end gap-2">
    {college.nirfRank && (
      <div className="text-right">
        <div className="text-2xl font-bold text-blue-600">#{college.nirfRank}</div>
        <div className="text-xs text-gray-400">NIRF Rank</div>
      </div>
    )}
    <SaveButton collegeId={college.id} />
  </div>
</div>
            <div className="text-xs text-gray-500 mt-1">Rating</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-xl">
            <div className="flex items-center justify-center gap-1 text-blue-600 font-bold text-xl">
              <IndianRupee size={16} />{(college.totalFees / 100000).toFixed(1)}L
            </div>
            <div className="text-xs text-gray-500 mt-1">Annual Fees</div>
          </div>
          {latestPlacement && (
            <>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <div className="flex items-center justify-center gap-1 text-green-600 font-bold text-xl">
                  <TrendingUp size={16} />{(latestPlacement.averagePackage / 100).toFixed(1)}L
                </div>
                <div className="text-xs text-gray-500 mt-1">Avg Package</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <div className="text-purple-600 font-bold text-xl">{latestPlacement.placementRate}%</div>
                <div className="text-xs text-gray-500 mt-1">Placement Rate</div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border p-6 mb-6">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 leading-relaxed">{college.overview}</p>
        {college.naacGrade && (
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
            <Award size={14} /> NAAC Grade: {college.naacGrade}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border p-6 mb-6">
       <h2 className="text-xl font-extrabold text-gray-900 mb-4">Courses Offered</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 rounded-l-lg font-medium text-gray-600">Course</th>
              <th className="px-4 py-3 font-medium text-gray-600">Degree</th>
              <th className="px-4 py-3 font-medium text-gray-600">Duration</th>
              <th className="px-4 py-3 font-medium text-gray-600">Fees/yr</th>
              <th className="px-4 py-3 rounded-r-lg font-medium text-gray-600">Seats</th>
            </tr>
          </thead>
          <tbody>
            {college.courses.map((course: any) => (
              <tr key={course.id} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-900">{course.name}</td>
                <td className="px-4 py-3 text-gray-600">{course.degree}</td>
                <td className="px-4 py-3 text-gray-600">{course.duration} years</td>
                <td className="px-4 py-3 text-gray-600">₹{(course.fees / 100000).toFixed(1)}L</td>
                <td className="px-4 py-3 text-gray-600">{course.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {latestPlacement && (
        <div className="bg-white rounded-2xl border p-6 mb-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Placements {latestPlacement.year}</h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-600">₹{(latestPlacement.averagePackage / 100).toFixed(1)}L</div>
              <div className="text-xs text-gray-500 mt-1">Average Package</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-600">₹{(latestPlacement.highestPackage / 100).toFixed(1)}L</div>
              <div className="text-xs text-gray-500 mt-1">Highest Package</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <div className="text-2xl font-bold text-purple-600">{latestPlacement.placementRate}%</div>
              <div className="text-xs text-gray-500 mt-1">Placement Rate</div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Top Recruiters</p>
            <div className="flex flex-wrap gap-2">
              {latestPlacement.topRecruiters.map((r: string) => (
                <span key={r} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">{r}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border p-6">
       <h2 className="text-xl font-extrabold text-gray-900 mb-4">Student Reviews</h2>
        {college.reviews.length === 0 && <p className="text-gray-400 text-sm">No reviews yet.</p>}
        {college.reviews.map((review: any) => (
          <div key={review.id} className="border-b last:border-0 py-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900">{review.title}</p>
                <p className="text-sm text-gray-500">{review.authorName} · Batch of {review.batch}</p>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={14} fill="currentColor" /> {review.rating}
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-2">{review.body}</p>
            <div className="flex gap-4 mt-2 text-sm">
              <span className="text-green-600">👍 {review.pros}</span>
              <span className="text-red-500">👎 {review.cons}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}