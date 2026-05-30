import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import NavBar from '@/components/NavBar'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EduSearch — Find Your College',
  description: 'Discover, compare and find the best colleges in India',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}