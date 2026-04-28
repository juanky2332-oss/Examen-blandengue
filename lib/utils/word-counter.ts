export function countWords(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).filter(w => w.length > 0).length
}

export type WordCountStatus = 'under' | 'valid' | 'over'

export function getWordCountStatus(
  count: number,
  min: number,
  max: number,
): WordCountStatus {
  if (count < min) return 'under'
  if (count > max) return 'over'
  return 'valid'
}

export function getWordCountColor(status: WordCountStatus): string {
  switch (status) {
    case 'under': return 'text-amber-500'
    case 'valid': return 'text-green-600'
    case 'over': return 'text-red-600'
  }
}

export function getWordCountBorderColor(status: WordCountStatus): string {
  switch (status) {
    case 'under': return 'border-amber-300 focus:ring-amber-400'
    case 'valid': return 'border-green-400 focus:ring-green-500'
    case 'over': return 'border-red-400 focus:ring-red-500'
  }
}
