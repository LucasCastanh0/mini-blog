import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Fraunces } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz'],
})

export const metadata: Metadata = {
  title: 'Mini Blog',
  description: 'Tecnologia, código e ideias.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} ${fraunces.variable} grain`}
        style={{ background: '#F5F3EE', color: '#111', fontFamily: 'var(--font-geist), sans-serif' }}>

        {/* Header */}
        <header style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl">
          <div style={{ background: 'rgba(245,243,238,0.8)' }} className="absolute inset-0" />
          <div className="relative max-w-7xl mx-auto px-8 h-14 flex items-center justify-between">
            <Link href="/">
              <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                mini<span style={{ color: '#9b8cff' }}>blog</span>
              </span>
            </Link>

            <div className="flex items-center gap-5">
              <Link href="/"
                style={{ fontSize: '0.72rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>
                Posts
              </Link>
              <Link href="/new"
                className="transition-all active:scale-95 hover:bg-gray-800"
                style={{ fontSize: '0.78rem', fontWeight: 600, padding: '7px 18px', borderRadius: '99px', background: '#111', color: '#fff', letterSpacing: '0.01em' }}>
                Escrever
              </Link>
            </div>
          </div>
        </header>

        <div className="pt-14 min-h-screen">{children}</div>

        <footer style={{ borderTop: '1px solid rgba(0,0,0,0.07)', marginTop: '8rem' }}>
          <div className="max-w-7xl mx-auto px-8 py-10 flex items-center justify-between">
            <span style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 700, fontSize: '1rem' }}>
              mini<span style={{ color: '#9b8cff' }}>blog</span>
            </span>
            <p style={{ fontSize: '0.7rem', color: '#aaa' }}>
              Next.js 16 · React 19 · Prisma · Uploadthing · Lexical
            </p>
          </div>
        </footer>

      </body>
    </html>
  )
}
