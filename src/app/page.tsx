import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mini Blog</h1>
        <Link
          href="/new"
          className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
        >
          Novo post
        </Link>
      </div>

      {posts.length === 0 && (
        <p className="text-gray-500">Nenhum post ainda. Crie o primeiro!</p>
      )}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{post.title}</CardTitle>
                <Badge variant="outline">
                  {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-2">
                {(() => {
                  try {
                    const parsed = JSON.parse(post.content)
                    return parsed.root.children
                      .map((p: any) => p.children.map((n: any) => n.text).join(''))
                    .join(' ')
                  } catch {
                    return post.content
                  }
                })()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}