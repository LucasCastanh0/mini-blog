'use server'

import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
})

export async function createPost(prevState: unknown, formData: FormData) {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  }

  const result = schema.safeParse(data)

  if (!result.success) {
    return { error: 'Dados inválidos. Verifique os campos.' }
  }

  await prisma.post.create({ data: result.data })

  redirect('/')
}