'use client'

import { createPost } from '@/app/actions'
import type { OurFileRouter } from '@/app/api/uploadthing/core'
import { Editor } from '@/components/Editor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UploadButton } from '@uploadthing/react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState, useRef, useState } from 'react'

export default function NewPost() {
  const [state, action, isPending] = useActionState(createPost, null)
  const contentRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

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
              <label className="text-sm font-medium">Imagem de capa</label>
              <input type="hidden" name="coverUrl" ref={coverRef} />
              {coverPreview && (
                <Image
                  src={coverPreview}
                  alt="Capa"
                  width={600}
                  height={200}
                  className="w-full h-40 object-cover rounded-md mt-2 mb-2"
                />
              )}
              <UploadButton<OurFileRouter, 'imageUploader'>
                endpoint="imageUploader"
                onClientUploadComplete={(files) => {
                  if (coverRef.current) coverRef.current.value = files[0].url
                  setCoverPreview(files[0].url)
                }}
                onUploadError={(error) => alert('Erro no upload: ' + error.message)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Conteúdo</label>
              <input type="hidden" name="content" ref={contentRef} />
              <Editor onChange={(value) => {
                if (contentRef.current) contentRef.current.value = value
              }} />
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