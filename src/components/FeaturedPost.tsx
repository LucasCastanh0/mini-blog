import Image from 'next/image'
import { timeAgo, readingTime, extractText } from '@/lib/format'

interface Post {
  id: string
  title: string
  content: string
  coverUrl: string | null
  createdAt: Date
}

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <article
      className="group grid md:grid-cols-5 gap-0 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        background: '#fff',
        boxShadow: '0 2px 48px rgba(0,0,0,0.07)',
        border: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      {/* Imagem */}
      <div className="md:col-span-3 relative overflow-hidden" style={{ minHeight: '300px' }}>
        {post.coverUrl ? (
          <Image src={post.coverUrl} alt={post.title} fill className="object-cover card-img" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
              minHeight: '300px',
            }}
          >
            <span style={{ fontSize: '5rem', opacity: 0.08 }}>✦</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, transparent 50%, rgba(255,255,255,0.06))' }}
        />
        {/* Badge destaque */}
        <div className="absolute top-5 left-5">
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(155,140,255,0.9)',
              color: '#fff',
              backdropFilter: 'blur(8px)',
              letterSpacing: '0.02em',
            }}
          >
            ✦ Destaque
          </span>
        </div>
      </div>

      {/* Texto */}
      <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-medium" style={{ color: '#aaa' }}>
              {timeAgo(post.createdAt)}
            </span>
            <span className="w-1 h-1 rounded-full" style={{ background: '#ddd' }} />
            <span className="text-xs font-medium" style={{ color: '#aaa' }}>
              📖 {readingTime(post.content)} min de leitura
            </span>
          </div>

          <h2
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: '#111',
            }}
          >
            {post.title}
          </h2>

          <p className="text-sm leading-relaxed line-clamp-4" style={{ color: '#777' }}>
            {extractText(post.content)}
          </p>
        </div>

        <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-pink-400" />
              <span className="text-xs font-medium" style={{ color: '#555' }}>Lucas Ribeiro</span>
            </div>
            <span
              className="text-sm font-bold flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
              style={{ color: '#111' }}
            >
              Ler post <span style={{ color: '#9b8cff' }}>→</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
