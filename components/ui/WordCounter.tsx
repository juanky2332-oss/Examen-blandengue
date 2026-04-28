'use client'

import { countWords, getWordCountStatus, getWordCountColor } from '@/lib/utils/word-counter'

interface WordCounterProps {
  text: string
  min: number
  max: number
}

export default function WordCounter({ text, min, max }: WordCounterProps) {
  const count = countWords(text)
  const status = getWordCountStatus(count, min, max)
  const color = getWordCountColor(status)

  return (
    <div className={`text-xs font-medium ${color} flex items-center gap-1`}>
      <span>{count} words</span>
      <span className="text-gray-400">({min}–{max} required)</span>
      {status === 'valid' && <span className="text-green-600">✓</span>}
      {status === 'over' && <span className="text-red-600">▲ too many</span>}
    </div>
  )
}
