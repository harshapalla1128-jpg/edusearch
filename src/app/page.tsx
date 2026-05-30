'use client'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import CollegeCard from '@/components/CollegeCard'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [state, setState] = useState('')
  const [maxFees, setMaxFees] = useState('')
  const [page, setPage] = useState(1)
  const [compareList, setCompareList] = useState<string[]>([])

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setSearch(q); setPage(1) }, 400)
    return () => clearTimeout(t)
  }, [q])

  const { data, isLoading } = useQuery({
    queryKey: ['colleges', search, type, state, maxFees, page],
    queryFn: () => axios.get('/api/colleges', {
      params: { q: search, type, state, maxFees, page }
    }).then(r => r.data),
    placeholderData: (prev) => prev,
  })

  const toggleCompare = (slug: string) => {
  setCompareList(prev =>
    prev.includes(slug)
      ? prev.filter(i => i !== slug)
      : prev.length < 3 ? [...prev, slug] : prev
  )
}

  const goCompare = () => {
  router.push(`/compare?${compareList.map(s => `slug=${s}`).join('&')}`)
}

  return (
   <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero */}
    <div className="relative text-white px-6 py-20 text-center overflow-hidden"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}>
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect College</h1>
       <p className="text-gray-200 mb-6 text-lg">Discover top colleges across India</p>
        <div className="max-w-xl mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search by college name, city, or state..."
         className="w-full pl-11 pr-4 py-3 rounded-xl text-gray-900 font-medium text-sm outline-none shadow placeholder:text-gray-400 placeholder:font-normal"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        {/* Filters */}
      <aside className="w-56 flex-shrink-0">
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-sm p-4 flex flex-col gap-4 sticky top-20">
           <h2 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <SlidersHorizontal size={14} /> Filters
            </h2>
            <div>
              <label className="text-xs text-gray-700 font-semibold mb-1 block">College Type</label>
            <select value={type} onChange={e => { setType(e.target.value); setPage(1) }}
  className="w-full border rounded-lg px-3 py-2 text-sm text-gray-800 font-medium">
  <option value="">All Types</option>
  {['IIT', 'NIT', 'IIIT', 'DEEMED', 'PRIVATE', 'GOVERNMENT'].map(t =>
    <option key={t} value={t}>{t}</option>)}
</select>
            </div>
            <div>
              <label className="text-xs text-gray-700 font-semibold mb-1 block">State</label>
              <input value={state} onChange={e => { setState(e.target.value); setPage(1) }}
                placeholder="e.g. Maharashtra"
                className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-700 font-semibold mb-1 block">Max Annual Fees (₹)</label>
              <select value={maxFees} onChange={e => { setMaxFees(e.target.value); setPage(1) }}
                className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Any</option>
                <option value="100000">Under 1L</option>
                <option value="200000">Under 2L</option>
                <option value="300000">Under 3L</option>
                <option value="600000">Under 6L</option>
              </select>
            </div>
            {(type || state || maxFees) && (
              <button onClick={() => { setType(''); setState(''); setMaxFees('') }}
                className="text-xs text-red-500 hover:underline text-left">
                Clear filters
              </button>
            )}
          </div>
        </aside>

        {/* Results */}
      <section className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
           <p className="text-sm font-semibold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full inline-block">
  {isLoading ? 'Searching...' : `${data?.total ?? 0} colleges found`}
</p>
            {compareList.length >= 2 && (
              <button onClick={goCompare}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition">
                Compare {compareList.length} Colleges →
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.colleges.map((college: any) => (
              <CollegeCard
                key={college.id}
                college={college}
                onCompare={toggleCompare}
                compareList={compareList}
              />
            ))}
          </div>

          {!isLoading && data?.colleges.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No colleges found. Try different filters.
            </div>
          )}

          {/* Pagination */}
          {data?.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: data.totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm ${page === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border hover:bg-gray-50'}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}