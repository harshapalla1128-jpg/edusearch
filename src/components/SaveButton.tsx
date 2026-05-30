'use client'
import { useAuth } from '@/lib/useAuth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SaveButton({ collegeId }: { collegeId: string }) {
  const { user } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: saved = [] } = useQuery({
    queryKey: ['saved'],
    queryFn: () => axios.get('/api/saved').then(r => r.data),
    enabled: !!user,
  })

  const isSaved = saved.some((c: any) => c.id === collegeId)

  const toggle = useMutation({
    mutationFn: () => isSaved
      ? axios.delete('/api/saved', { data: { collegeId } })
      : axios.post('/api/saved', { collegeId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['saved'] })
  })

  if (!user) return (
    <button onClick={() => router.push('/login')}
      className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl text-sm text-gray-600 hover:border-blue-300 transition">
      <Bookmark size={16} /> Save College
    </button>
  )

  return (
    <button onClick={() => toggle.mutate()}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border-2 transition ${
        isSaved ? 'bg-blue-50 border-blue-400 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-blue-300'
      }`}>
      {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      {isSaved ? 'Saved' : 'Save College'}
    </button>
  )
}