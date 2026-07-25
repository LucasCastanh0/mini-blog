import { prisma } from '@/lib/prisma'
import { cacheTag } from 'next/cache'
import Link from 'next/link'
import { FeaturedPost } from '@/components/FeaturedPost'
import { PostCard } from '@/components/PostCard'

async function getPosts() {
  'use cache'
  cacheTag('posts')
  return prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
}

export default async function Home() {
  const posts = await getPosts()
  const [featured, ...rest] = posts

  return (
    <main className="w-full">

      {/* ── Hero — full bleed ─────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        {/* Orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 w-[700px] h-[600px] opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(ellipse at top right, #c084fc 0%, #9b8cff 35%, transparent 70%)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)' }}
        />

        {/* Conteúdo centralizado */}
        <div className="relative max-w-7xl mx-auto px-8 pt-24 pb-20 md:pt-32 md:pb-28">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-px" style={{ background: '#9b8cff' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#9b8cff', letterSpacing: '0.16em' }}>
              Mini Blog
            </span>
          </div>

          {/* Título */}
          <h1
            className="font-bold leading-none mb-8"
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(3.5rem, 7vw, 7rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1,
            }}
          >
            Ideias &amp;<br />
            <span style={{
              background: 'linear-gradient(135deg, #9b8cff 0%, #c084fc 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              código.
            </span>
          </h1>

          {/* Subtítulo + CTA */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-lg max-w-md leading-relaxed" style={{ color: '#777', lineHeight: 1.75 }}>
              Um espaço para compartilhar aprendizados sobre desenvolvimento, tecnologia e o que aparecer pelo caminho.
            </p>
            <div className="flex items-center gap-6 shrink-0">
              {posts.length > 0 && (
                <span className="text-sm" style={{ color: '#bbb' }}>
                  <span className="font-bold" style={{ color: '#333' }}>{posts.length}</span>{' '}
                  {posts.length === 1 ? 'post publicado' : 'posts publicados'}
                </span>
              )}
              <Link href="/new"
                className="text-sm font-semibold px-6 py-3 rounded-full transition-all active:scale-95 hover:opacity-80"
                style={{ background: '#111', color: '#fff' }}>
                Escrever →
              </Link>
            </div>
          </div>
        </div>

        {/* Linha base */}
        <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.07), transparent)' }} />
      </section>

      {/* ── Conteúdo com container ───────────────────────── */}
      <div className="max-w-7xl mx-auto px-8">

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="py-36 text-center">
            <div className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-6"
              style={{ background: 'rgba(155,140,255,0.1)', border: '1px solid rgba(155,140,255,0.2)' }}>
              <span style={{ color: '#9b8cff', fontSize: '1.5rem' }}>✦</span>
            </div>
            <p className="font-semibold text-xl mb-2" style={{ fontFamily: 'var(--font-fraunces)' }}>
              Nenhum post ainda.
            </p>
            <p className="text-sm mb-8" style={{ color: '#999' }}>Comece escrevendo agora.</p>
            <Link href="/new"
              className="inline-flex text-sm font-semibold px-6 py-3 rounded-full transition-all active:scale-95"
              style={{ background: '#111', color: '#fff' }}>
              Escrever primeiro post →
            </Link>
          </div>
        )}

        {/* Post destaque */}
        {featured && (
          <section className="pt-16 mb-20">
            <SectionLabel label="Em destaque" count={null} />
            <Link href={`/posts/${featured.id}`} className="block mt-8">
              <FeaturedPost post={featured} />
            </Link>
          </section>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <section className="pb-28">
            <SectionLabel label="Mais posts" count={rest.length} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              {rest.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`} className="block">
                  <PostCard post={post} />
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  )
}

function SectionLabel({ label, count }: { label: string; count: number | null }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-semibold uppercase tracking-widest shrink-0" style={{ color: '#aaa', letterSpacing: '0.14em' }}>
        {label}
      </span>
      <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.07)' }} />
      {count !== null && (
        <span className="text-xs shrink-0" style={{ color: '#ccc' }}>
          {count} {count === 1 ? 'post' : 'posts'}
        </span>
      )}
    </div>
  )
}
