'use client'

import { createPost } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useActionState } from 'react'

export default function NewPost() {
  const [state, action, isPending] = useActionState(createPost, null)

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="text-gray-500 hover:text-black">← Voltar</Link>
        <h1 className="text-2xl font-bold">Novo post</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Criar post</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium">Título</label>
              <input
                name="title"
                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                placeholder="Digite o título"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Conteúdo</label>
              <textarea
                name="content"
                rows={6}
                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                placeholder="Escreva o conteúdo do post"
              />
            </div>

            {state?.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}

            <Button type="submit" disabled={isPending}>
              {isPending ? 'Salvando...' : 'Publicar post'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}