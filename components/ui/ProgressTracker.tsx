'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { ExamResult, ExamModule } from '@/lib/types'
import { BarChart3, ChevronRight, RefreshCw } from 'lucide-react'

const MODULES: { id: ExamModule; label: string; color: string; textColor: string }[] = [
  { id: 'core', label: 'Core', color: 'bg-violet-100', textColor: 'text-violet-700' },
  { id: 'reading', label: 'Reading', color: 'bg-blue-100', textColor: 'text-blue-700' },
  { id: 'listening', label: 'Listening', color: 'bg-cyan-100', textColor: 'text-cyan-700' },
  { id: 'writing', label: 'Writing', color: 'bg-emerald-100', textColor: 'text-emerald-700' },
  { id: 'speaking', label: 'Speaking', color: 'bg-rose-100', textColor: 'text-rose-700' },
]

export default function ProgressTracker() {
  const [results, setResults] = useState<Record<string, ExamResult>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const data: Record<string, ExamResult> = {}
    MODULES.forEach(m => {
      const stored = localStorage.getItem(`aptis_result_${m.id}`)
      if (stored) {
        try { data[m.id] = JSON.parse(stored) } catch { /* ignore */ }
      }
    })
    setResults(data)
    setMounted(true)
  }, [])

  if (!mounted) return null
  const completedCount = Object.keys(results).length
  if (completedCount === 0) return null

  const avgScore = completedCount > 0
    ? Math.round(Object.values(results).reduce((s, r) => s + r.score, 0) / completedCount)
    : 0

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-600" /> Your Progress
        </h3>
        <div className="text-xs text-gray-400">{completedCount}/5 attempted</div>
      </div>

      {/* Average bar */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-blue-700 font-semibold">Average score</span>
          <span className="font-bold text-blue-900">{avgScore}%</span>
        </div>
        <div className="w-full bg-blue-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${avgScore >= 70 ? 'bg-green-500' : avgScore >= 55 ? 'bg-amber-400' : 'bg-red-400'}`}
            style={{ width: `${avgScore}%` }}
          />
        </div>
      </div>

      {/* Per-module rows */}
      <div className="space-y-1.5">
        {MODULES.map(m => {
          const r = results[m.id]
          if (!r) return (
            <div key={m.id} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg">
              <span className="text-gray-400">{m.label}</span>
              <Link href={`/exam/${m.id}`} className="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1">
                Start <RefreshCw className="w-3 h-3" />
              </Link>
            </div>
          )
          const scoreColor = r.score >= 70 ? 'text-green-700 bg-green-50' : r.score >= 55 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50'
          return (
            <Link
              key={m.id}
              href={`/results?module=${m.id}`}
              className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <span className={`font-semibold px-2 py-0.5 rounded-md text-xs ${m.color} ${m.textColor}`}>{m.label}</span>
              <div className="flex items-center gap-2">
                <span className={`font-bold px-2 py-0.5 rounded-full text-xs ${scoreColor}`}>
                  {r.score}% · {r.level}
                </span>
                <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
