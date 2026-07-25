import Image from 'next/image'
import { timeAgo, readingTime, extractText } from '@/lib/format'

interface Post {
  id: string
  title: string
  content: string
  coverUrl: string | null
  createdAt: Date
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article
      className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2"
      style={{
        background: '#fff',
        boxShadow: '0 1px 24px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      {/* Imagem */}
      <div className="relative h-48 overflow-hidden" style={{ background: '#ede9e0' }}>
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            className="object-cover card-img"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4c1d95 100%)' }}
          >
            <span style={{ fontSize: '2rem', opacity: 0.15 }}>✦</span>
          </div>
        )}
        {/* Badge: tempo de leitura */}
        <div
          className="absolute top-3 right-3 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}
        >
          <span>📖</span> {readingTime(post.content)} min
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs mb-3 font-medium" style={{ color: '#bbb' }}>
          {timeAgo(post.createdAt)}
        </p>

        <h3
          className="font-bold text-base leading-snug mb-2 line-clamp-2"
          style={{ fontFamily: 'var(--font-fraunces)', letterSpacing: '-0.01em', color: '#111' }}
        >
          {post.title}
        </h3>

        <p className="text-sm leading-relaxed line-clamp-2 flex-1" style={{ color: '#888' }}>
          {extractText(post.content)}
        </p>

        <div
          className="mt-4 pt-4 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
        >
          <span
            className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
            style={{ color: '#111' }}
          >
            Ler mais <span style={{ color: '#9b8cff' }}>→</span>
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-pink-400" />
            <span className="text-xs font-medium" style={{ color: '#888' }}>Lucas Ribeiro</span>
          </div>
        </div>
      </div>
    </article>
  )
}
