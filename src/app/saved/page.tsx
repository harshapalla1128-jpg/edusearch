'use client'
import { useAuth } from '@/lib/useAuth'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { Bookmark, MapPin, Star, Trash2 } from 'lucide-react'

export default function SavedPage() {
  const { user, isLoading: authLoading } = useAuth()
  const queryClient = useQueryClient()

  const { data: colleges = [], isLoading } = useQuery({
    queryKey: ['saved'],
    queryFn: () => axios.get('/api/saved').then(r => r.data),
    enabled: !!user,
  })

  const unsave = useMutation({
    mutationFn: (collegeId: string) => axios.delete('/api/saved', { data: { collegeId } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['saved'] })
  })

 if (authLoading) return <div className="text-center py-20 text-gray-400">Loading...</div>

 if (!user) return (
    <div className="text-center py-20">
      <Bookmark size={48} className="mx-auto mb-4 text-gray-300" />
      <h2 className="text-xl font-bold text-gray-700 mb-2">Save your favourite colleges</h2>
      <p className="text-gray-500 mb-6">Login to save and track colleges you're interested in</p>
      <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
        Login to continue
      </Link>
    </div>
  )

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Saved Colleges</h1>

      {isLoading && <div className="text-center py-12 text-gray-400">Loading...</div>}

      {!isLoading && colleges.length === 0 && (
        <div className="text-center py-20">
          <Bookmark size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No saved colleges yet.</p>
          <Link href="/" className="text-blue-600 hover:underline text-sm mt-2 block">Browse colleges</Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colleges.map((college: any) => (
          <div key={college.id} className="bg-white rounded-2xl border p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">{college.type}</span>
                <h3 className="font-bold text-gray-900 mt-1">{college.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin size={12} /> {college.location}
                </p>
              </div>
              <button onClick={() => unsave.mutate(college.id)}
                className="text-red-400 hover:text-red-600 transition">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-amber-500 font-medium">
                <Star size={13} fill="currentColor" /> {college.rating}
              </span>
              <span className="text-gray-600">₹{(college.totalFees / 100000).toFixed(1)}L/yr</span>
            </div>
            <Link href={`/colleges/${college.slug}`}
              className="text-center text-sm bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-medium">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}