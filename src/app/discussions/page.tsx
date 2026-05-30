'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { MessageCircle, Plus, X, ChevronDown, ChevronUp } from 'lucide-react'

export default function DiscussionsPage() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', body: '', author: '' })
  const [answerForms, setAnswerForms] = useState<Record<string, { body: string; author: string }>>({})

  const { data: questions = [], isLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: () => axios.get('/api/questions').then(r => r.data)
  })

  const askQuestion = useMutation({
    mutationFn: () => axios.post('/api/questions', form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      setForm({ title: '', body: '', author: '' })
      setShowForm(false)
    }
  })

  const postAnswer = useMutation({
    mutationFn: ({ questionId, data }: { questionId: string; data: any }) =>
      axios.post(`/api/questions/${questionId}/answers`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] })
      setAnswerForms({})
    }
  })

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Discussions</h1>
          <p className="text-gray-500 text-sm mt-1">Ask questions, share experiences</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Cancel' : 'Ask Question'}
        </button>
      </div>

      {/* Ask Question Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Ask a Question</h2>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1 block">Your Name</label>
              <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                placeholder="e.g. Rahul Sharma"
                className="w-full border rounded-xl px-3 py-2 text-sm text-gray-800 font-medium" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1 block">Question Title</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. What is the cutoff for IIT Bombay CSE?"
                className="w-full border rounded-xl px-3 py-2 text-sm text-gray-800 font-medium" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1 block">Details</label>
              <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                placeholder="Add more details about your question..."
                rows={3}
                className="w-full border rounded-xl px-3 py-2 text-sm text-gray-800 font-medium resize-none" />
            </div>
            <button
              onClick={() => askQuestion.mutate()}
              disabled={!form.title || !form.body || !form.author || askQuestion.isPending}
              className="bg-blue-600 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition">
              {askQuestion.isPending ? 'Posting...' : 'Post Question'}
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      {isLoading && <div className="text-center py-12 text-gray-400">Loading discussions...</div>}

      {!isLoading && questions.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <MessageCircle size={40} className="mx-auto mb-3 opacity-30" />
          <p>No questions yet. Be the first to ask!</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {questions.map((q: any) => (
          <div key={q.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Question */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{q.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{q.body}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="font-medium text-blue-600">@{q.author}</span>
                    {q.college && (
                      <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                        {q.college.name}
                      </span>
                    )}
                    <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <button onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition shrink-0">
                  <MessageCircle size={14} /> {q.answers.length}
                  {expandedId === q.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
            </div>

            {/* Answers */}
            {expandedId === q.id && (
              <div className="border-t bg-gray-50 p-5">
                {q.answers.length === 0 && (
                  <p className="text-sm text-gray-400 mb-4">No answers yet — be the first!</p>
                )}
                {q.answers.map((a: any) => (
                  <div key={a.id} className="mb-4 pb-4 border-b last:border-0 last:mb-0 last:pb-0">
                    <p className="text-sm text-gray-700">{a.body}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <span className="font-medium text-green-600">@{a.author}</span>
                      <span>{new Date(a.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}

                {/* Answer form */}
                <div className="mt-4 flex flex-col gap-2">
                  <input
                    value={answerForms[q.id]?.author || ''}
                    onChange={e => setAnswerForms(f => ({ ...f, [q.id]: { ...f[q.id], author: e.target.value } }))}
                    placeholder="Your name"
                    className="w-full border rounded-xl px-3 py-2 text-sm text-gray-800 font-medium" />
                  <textarea
                    value={answerForms[q.id]?.body || ''}
                    onChange={e => setAnswerForms(f => ({ ...f, [q.id]: { ...f[q.id], body: e.target.value } }))}
                    placeholder="Write your answer..."
                    rows={2}
                    className="w-full border rounded-xl px-3 py-2 text-sm text-gray-800 font-medium resize-none" />
                  <button
                    onClick={() => postAnswer.mutate({ questionId: q.id, data: answerForms[q.id] })}
                    disabled={!answerForms[q.id]?.body || !answerForms[q.id]?.author || postAnswer.isPending}
                    className="bg-green-600 text-white rounded-xl py-2 text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition">
                    {postAnswer.isPending ? 'Posting...' : 'Post Answer'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}