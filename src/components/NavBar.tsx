'use client'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { Bookmark, LogOut } from 'lucide-react'

export default function NavBar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center gap-6 sticky top-0 z-20">
      <Link href="/" className="text-xl font-bold text-blue-600">EduSearch</Link>
      <Link href="/predict" className="text-sm text-gray-600 hover:text-blue-600">Predictor</Link>
      <Link href="/compare" className="text-sm text-gray-600 hover:text-blue-600">Compare</Link>
      <Link href="/discussions" className="text-sm text-gray-600 hover:text-blue-600">Discussions</Link>
      <div className="ml-auto flex items-center gap-3">
        {user ? (
          <>
            <Link href="/saved" className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600">
              <Bookmark size={15} /> Saved
            </Link>
            <span className="text-sm text-gray-700 font-medium">Hi, {user.name?.split(' ')[0]}</span>
            <button onClick={logout} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600">
              <LogOut size={15} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600">Login</Link>
            <Link href="/signup" className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-xl hover:bg-blue-700 transition">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}