'use server'

import { prisma } from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  coverUrl: z.string().optional(),
})

export async function createPost(prevState: unknown, formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    coverUrl: (formData.get('coverUrl') as string) || undefined,
  }

  const result = schema.safeParse(data)

  if (!result.success) {
    return { error: 'Dados inválidos. Verifique os campos.' }
  }

  await prisma.post.create({ data: result.data })

  revalidateTag('posts')

  redirect('/')
}
