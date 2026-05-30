'use client'
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { MapPin, Star, IndianRupee } from 'lucide-react'

export default function PredictPage() {
  const [exam, setExam] = useState('JEE_MAIN')
  const [rank, setRank] = useState('')
  const [category, setCategory] = useState('General')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const predict = async () => {
    if (!rank) return
    setLoading(true)
    setSearched(true)
    try {
      const res = await axios.post('/api/predict', {
        exam,
        rank: Number(rank),
        category,
      })
      setResults(res.data.colleges)
    } catch (err) {
      setResults([])
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-2">College Predictor</h1>
        <p className="text-blue-100">Enter your exam and rank to find matching colleges</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl border p-6 mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-gray-800 font-medium">Exam</label>
              <select value={exam} onChange={e => setExam(e.target.value)}
                className="text-gray-800 font-medium">
                <option value="JEE_MAIN">JEE Main</option>
                <option value="JEE_ADVANCED">JEE Advanced</option>
                <option value="CAT">CAT</option>
                <option value="NEET">NEET</option>
                <option value="GATE">GATE</option>
              </select>
            </div>
            <div>
              <label className="text-gray-800 font-medium">Your Rank</label>
              <input type="number" value={rank}
                onChange={e => setRank(e.target.value)}
                placeholder="e.g. 5000"
                className="w-full border rounded-xl px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-gray-800 font-medium">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}
                className="text-gray-800 font-medium">
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
          </div>
          <button onClick={predict} disabled={!rank || loading}
            className="w-full mt-4 bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 disabled:opacity-50 transition">
            {loading ? 'Finding colleges...' : 'Predict My Colleges'}
          </button>
        </div>
        {searched && !loading && results.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No colleges found. Try a different rank or category.
          </div>
        )}
        {results.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-4">{results.length} colleges match your rank</p>
            <div className="flex flex-col gap-4">
              {results.map((college: any) => (
                <div key={college.id} className="bg-white rounded-xl border p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{college.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} /> {college.location}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      {college.matchedCourse} · Rank {college.cutoffMin}–{college.cutoffMax}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="flex items-center gap-1 text-amber-500 text-sm">
                      <Star size={13} fill="currentColor" /> {college.rating}
                    </span>
                    <Link href={`/colleges/${college.slug}`}
                      className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}