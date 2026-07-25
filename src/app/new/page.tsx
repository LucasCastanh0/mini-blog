'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
    title: z.string().min(3, 'Titulo precisa ter pelo menos 3 caracteres'),
    content: z.string().min(10, 'Conteudo precisa ter pelo menos 10 caracteres'),
})

type FormValues = z.infer<typeof schema>

export default function NewPost(){
    const{
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { title: '', content: '' },
    })

    const onSubmit = async (data: FormValues) => {
        console.log('dados validos', data)
    }

    return(
        <main className="max-w-2x1 mx-auto py-12 px-4">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/" className="text-gray-500 hover:text-black">← Voltar</Link>
                <h1 className="text-2xl font-bold">Novo Post</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Criar post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-medium">Titulo</label>
                            <input
                                {...register('title')}
                                className="w-full border rounded-md px-3 py-2 mt-1 tex-sm"
                                placeholder="Digite o titulo"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium">Conteudo</label>
                            <textarea
                                {...register('content')}
                                rows={6}
                                className="w-full border rounded-md px-3 py-2 mt-1 text-sm"
                                placeholder="Escreva o conteudo do post"
                            />
                            {errors.content && (
                                <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
                            )}
                        </div>

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Salvando...' : 'Criar Post'}
                        </Button>
                    </form>
                </CardContent>
                </Card>
                </main>
    )
}