export function extractText(content: string): string {
  try {
    const parsed = JSON.parse(content)
    return parsed.root.children
      .map((p: any) => p.children?.map((n: any) => n.text).join('') ?? '')
      .join(' ')
      .trim()
  } catch {
    return content
  }
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'agora mesmo'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `há ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `há ${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `há ${days} dia${days > 1 ? 's' : ''}`
  const weeks = Math.floor(days / 7)
  if (weeks < 4) return `há ${weeks} semana${weeks > 1 ? 's' : ''}`
  const months = Math.floor(days / 30)
  if (months < 12) return `há ${months} mês${months > 1 ? 'es' : ''}`
  const years = Math.floor(days / 365)
  return `há ${years} ano${years > 1 ? 's' : ''}`
}

export function readingTime(content: string): number {
  const words = extractText(content).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
