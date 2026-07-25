import { prisma } from '@/lib/prisma'
import { cacheTag } from 'next/cache'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate, readingTime } from '@/lib/format'
import { renderLexical } from '@/lib/lexical-render'

async function getPost(id: string) {
  'use cache'
  cacheTag('posts')
  return prisma.post.findUnique({ where: { id } })
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) notFound()

  return (
    <main className="w-full">

      {/* Capa */}
      {post.coverUrl && (
        <div className="w-full h-72 md:h-[420px] relative overflow-hidden">
          <Image src={post.coverUrl} alt={post.title} fill className="object-cover" priority />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(245,243,238,0.95) 100%)' }}
          />
        </div>
      )}

      {/* Conteúdo */}
      <div className="max-w-2xl mx-auto px-6 pb-24" style={{ marginTop: post.coverUrl ? '-4rem' : '3rem' }}>

        {/* Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-10 group"
          style={{ fontSize: '0.72rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
          Todos os posts
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 shrink-0" />
          <div>
            <p className="text-sm font-semibold" style={{ color: '#222' }}>Lucas Ribeiro</p>
            <p className="text-xs" style={{ color: '#aaa' }}>
              {formatDate(post.createdAt)} · {readingTime(post.content)} min de leitura
            </p>
          </div>
        </div>

        {/* Título */}
        <h1
          className="font-bold mb-10"
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            color: '#111',
          }}
        >
          {post.title}
        </h1>

        {/* Divisor */}
        <div className="mb-10 flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
          <span style={{ color: '#ccc', fontSize: '0.75rem' }}>✦</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.08)' }} />
        </div>

        {/* Corpo */}
        <article
          className="prose-content"
          style={{ fontSize: '1.075rem', lineHeight: 1.85 }}
        >
          {renderLexical(post.content)}
        </article>

        {/* Rodapé do post */}
        <div className="mt-16 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-400" />
            <div>
              <p className="text-sm font-semibold" style={{ color: '#111' }}>Lucas Ribeiro</p>
              <p className="text-xs" style={{ color: '#aaa' }}>Autor</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold px-5 py-2 rounded-full transition-all hover:opacity-70"
            style={{ background: 'rgba(0,0,0,0.06)', color: '#333' }}
          >
            ← Voltar ao blog
          </Link>
        </div>

      </div>
    </main>
  )
}
