'use client'

import { useActionState, useRef, useState } from 'react'
import { createPost } from '@/app/actions'
import { Editor } from '@/components/Editor'
import { useUploadThing } from '@/lib/uploadthing'
import Link from 'next/link'
import Image from 'next/image'

export default function NewPost() {
  const [state, action, isPending] = useActionState(createPost, null)
  const contentRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (files) => {
      if (coverRef.current) coverRef.current.value = files[0].url
      setCoverPreview(files[0].url)
    },
    onUploadError: (error) => alert('Erro no upload: ' + error.message),
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) startUpload([file])
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      {/* Topo */}
      <div className="flex items-center justify-between mb-14">
        <Link href="/"
          className="flex items-center gap-2 transition-all group"
          style={{ fontSize: '0.72rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
          Voltar
        </Link>
        <span className="text-xs px-3 py-1 rounded-full font-medium"
          style={{ background: 'rgba(155,140,255,0.15)', color: '#7c6ff0', border: '1px solid rgba(155,140,255,0.3)' }}>
          Novo post
        </span>
      </div>

      <form action={action} className="flex flex-col gap-10">

        {/* Capa */}
        <div>
          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            className="block mb-3">
            Imagem de capa{' '}
            <span style={{ color: '#aaa', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(opcional)</span>
          </label>

          <input type="hidden" name="coverUrl" ref={coverRef} />
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

          {coverPreview ? (
            <div className="relative w-full h-56 rounded-2xl overflow-hidden group">
              <Image src={coverPreview} alt="Capa" fill className="object-cover" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.45)' }}>
                <button type="button"
                  onClick={() => {
                    setCoverPreview(null)
                    if (coverRef.current) coverRef.current.value = ''
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                  className="text-xs font-semibold px-4 py-2 rounded-full"
                  style={{ background: '#fff', color: '#111', cursor: 'pointer' }}>
                  Remover capa
                </button>
              </div>
            </div>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              className="rounded-2xl h-44 flex flex-col items-center justify-center gap-3 transition-all select-none"
              style={{ border: '1.5px dashed rgba(0,0,0,0.2)', background: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24" fill="none" style={{ color: '#9b8cff' }}>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  <p className="text-sm font-medium" style={{ color: '#666' }}>Enviando...</p>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(155,140,255,0.15)' }}>
                    <span style={{ color: '#9b8cff', fontSize: '1.2rem', lineHeight: 1 }}>↑</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold" style={{ color: '#333' }}>Clique para escolher imagem</p>
                    <p className="text-xs mt-1" style={{ color: '#999' }}>PNG, JPG até 4MB</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Título */}
        <div style={{ borderBottom: '2px solid rgba(0,0,0,0.1)' }} className="pb-4">
          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            className="block mb-3">
            Título
          </label>
          <input
            name="title"
            className="w-full bg-transparent outline-none border-none"
            style={{ fontFamily: 'var(--font-fraunces)', fontSize: '2.2rem', letterSpacing: '-0.02em', lineHeight: 1.15, color: '#111' }}
            placeholder="Título do post..."
          />
        </div>

        {/* Editor */}
        <div>
          <label style={{ fontSize: '0.7rem', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            className="block mb-4">
            Conteúdo
          </label>
          <div className="rounded-2xl p-5 min-h-48"
            style={{ background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(0,0,0,0.1)' }}>
            <input type="hidden" name="content" ref={contentRef} />
            <Editor onChange={(value) => { if (contentRef.current) contentRef.current.value = value }} />
          </div>
        </div>

        {/* Erro */}
        {state?.error && (
          <div className="flex items-center gap-3 text-sm px-4 py-3 rounded-xl"
            style={{ background: '#fff0f0', border: '1px solid #ffcdd2', color: '#c62828' }}>
            ⚠️ {state.error}
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center justify-between pt-4" style={{ borderTop: '1.5px solid rgba(0,0,0,0.08)' }}>
          <p style={{ fontSize: '0.75rem', color: '#999' }}>Publicado imediatamente após envio.</p>
          <button type="submit" disabled={isPending}
            className="transition-all active:scale-95 hover:bg-gray-800 disabled:opacity-40"
            style={{ fontSize: '0.82rem', fontWeight: 600, padding: '10px 24px', borderRadius: '99px', background: '#111', color: '#fff', cursor: 'pointer' }}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Publicando...
              </span>
            ) : 'Publicar →'}
          </button>
        </div>

      </form>
    </main>
  )
}
