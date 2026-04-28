'use client'

import Timer from './Timer'
import { BookOpen } from 'lucide-react'

interface ExamHeaderProps {
  title: string
  subtitle: string
  totalSeconds: number
  onTimeExpire: () => void
  currentPart?: number
  totalParts?: number
}

export default function ExamHeader({
  title,
  subtitle,
  totalSeconds,
  onTimeExpire,
  currentPart,
  totalParts,
}: ExamHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-blue-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="font-semibold text-gray-900 text-sm leading-tight truncate">{title}</h1>
            <p className="text-xs text-gray-500 truncate">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {currentPart !== undefined && totalParts !== undefined && (
            <span className="text-xs text-gray-500 hidden sm:inline">
              Part {currentPart} of {totalParts}
            </span>
          )}
          <Timer totalSeconds={totalSeconds} onExpire={onTimeExpire} />
        </div>
      </div>
    </header>
  )
}
