'use client'

import { timeAgo } from '@/lib/format'

export function RelativeTime({ date }: { date: Date }) {
  return <span>{timeAgo(date)}</span>
}
