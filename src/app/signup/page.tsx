'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    setLoading(true)
    setError('')
    try {
      await axios.post('/api/auth/signup', form)
      router.push('/login')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900">Create account</h1>
          <p className="text-gray-500 text-sm mt-1">Join EduSearch to save colleges</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1 block">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Rahul Sharma"
              className="w-full border rounded-xl px-4 py-3 text-sm text-gray-800 font-medium outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full border rounded-xl px-4 py-3 text-sm text-gray-800 font-medium outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1 block">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full border rounded-xl px-4 py-3 text-sm text-gray-800 font-medium outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <button
            onClick={handleSignup}
            disabled={!form.name || !form.email || !form.password || loading}
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 disabled:opacity-50 transition mt-2">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}