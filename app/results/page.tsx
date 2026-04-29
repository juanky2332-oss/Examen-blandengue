'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  CheckCircle, XCircle, ArrowLeft, BarChart3,
  Star, Lightbulb, Target, RefreshCw, ChevronDown, ChevronUp, Brain, FileText,
} from 'lucide-react'
import type { ExamResult, ExamModule } from '@/lib/types'
import { listeningParts } from '@/lib/mock-data/listening-questions'

const MODULE_LABELS: Record<ExamModule, string> = {
  core: 'Core — Grammar & Vocabulary',
  reading: 'Reading',
  listening: 'Listening',
  writing: 'Writing',
  speaking: 'Speaking',
}

const LEVEL_DESCRIPTIONS: Record<string, string> = {
  'A2': 'Below B1 — Significant gaps in English at this level.',
  'B1': 'Below target — Continue practising foundational structures.',
  'B1-B2': 'Approaching B2 — You are close but need more accuracy.',
  'B2': 'At target level — This performance would pass the Aptis B2 exam.',
  'B2+': 'Above target — Excellent B2 performance. Push towards C1.',
  'B2-C1': 'Strong B2/C1 — Outstanding. Aim for the C component.',
  'C1': 'C1 level — Exceptional performance.',
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 70 ? '#16a34a' : score >= 55 ? '#d97706' : '#dc2626'
  const ringColor = score >= 70 ? 'ring-green-200' : score >= 55 ? 'ring-amber-200' : 'ring-red-200'
  return (
    <div className={`inline-flex items-center justify-center w-36 h-36 rounded-full ring-8 bg-white ${ringColor} shadow-inner`}>
      <div className="text-center">
        <p className="text-5xl font-extrabold" style={{ color }}>{score}</p>
        <p className="text-xs text-gray-400 font-medium">/ 100</p>
      </div>
    </div>
  )
}

function WrongAnswersAccordion({ wrongAnswers }: { wrongAnswers: NonNullable<ExamResult['wrongAnswers']> }) {
  const [open, setOpen] = useState(false)
  if (wrongAnswers.length === 0) return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center text-green-700 text-sm font-medium">
      ✓ Perfect score — no errors to review!
    </div>
  )
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-red-500" />
          Review {wrongAnswers.length} incorrect answer{wrongAnswers.length !== 1 ? 's' : ''}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && (
        <div className="border-t border-gray-100 px-5 py-4 space-y-3 max-h-[500px] overflow-y-auto">
          {wrongAnswers.map((w, i) => (
            <div key={w.questionId} className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 font-semibold mb-1">#{i + 1}</p>
              <p className="text-sm text-gray-800 mb-2 italic">&ldquo;{w.question}&rdquo;</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 rounded-lg px-3 py-1.5">
                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Your answer: <strong>{w.yourAnswer}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg px-3 py-1.5">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Correct: <strong>{w.correctAnswer}</strong></span>
                </div>
                {w.explanation && (
                  <p className="text-xs text-blue-700 bg-blue-50 rounded-lg px-3 py-1.5">{w.explanation}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ListeningTranscripts() {
  const [open, setOpen] = useState(false)
  const [openPart, setOpenPart] = useState<number | null>(null)
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-500" />
          View Audio Transcripts (learn from what you heard)
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && (
        <div className="border-t border-gray-100 px-5 py-4 space-y-3">
          {listeningParts.map((part, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenPart(openPart === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-sm"
              >
                <span className="font-semibold text-gray-700">Part {part.partNumber} — {part.title}</span>
                {openPart === i ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {openPart === i && part.transcript && (
                <div className="px-4 py-3">
                  <pre className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-sans bg-blue-50 rounded-lg p-3 border border-blue-100">
                    {part.transcript}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ResultsContent() {
  const params = useSearchParams()
  const module = (params.get('module') ?? 'writing') as ExamModule
  const [result, setResult] = useState<ExamResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(`aptis_result_${module}`)
    if (stored) {
      try { setResult(JSON.parse(stored)) } catch { /* ignore */ }
    }
    setLoading(false)
  }, [module])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading your results...</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-sm">
          <p className="text-gray-600 mb-4">No results found for this module.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const levelDesc = LEVEL_DESCRIPTIONS[result.level] ?? ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 mb-6 font-medium">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </Link>

        {/* Score header */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-5 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            {module === 'writing' && <Brain className="w-5 h-5 text-blue-500" />}
            <h1 className="text-lg font-bold text-gray-900">{MODULE_LABELS[module]}</h1>
          </div>
          <p className="text-gray-400 text-xs mb-6">
            {module === 'writing' ? 'AI Examiner Evaluation' : 'Auto-scored'} ·{' '}
            {new Date(result.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <ScoreRing score={result.score} />

          <div className="mt-4 mb-5">
            <span className="inline-block bg-blue-100 text-blue-800 font-bold text-xl px-6 py-1.5 rounded-full">
              {result.level}
            </span>
            {levelDesc && <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">{levelDesc}</p>}
          </div>

          {result.correctCount !== undefined && result.totalCount !== undefined && (
            <p className="text-sm text-gray-600 font-medium mb-3">
              {result.correctCount} correct out of {result.totalCount}
              {result.partScores && (
                <span className="text-gray-400 ml-2">
                  (Grammar: {result.partScores.grammar}% · Vocab: {result.partScores.vocabulary}%)
                </span>
              )}
            </p>
          )}

          <p className="text-sm text-gray-600 leading-relaxed max-w-lg mx-auto">{result.overallFeedback}</p>
        </div>

        {/* Part scores — all modules */}
        {result.partScores && (
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h2 className="font-semibold text-gray-800 text-sm">Scores by Part</h2>
            </div>
            <div className="space-y-2.5">
              {Object.entries(result.partScores).map(([part, score]) => {
                const label: Record<string, string> = {
                  part1: 'Part 1 — Short Responses',
                  part2: 'Part 2 — Short Message',
                  part3: 'Part 3 — Extended Answers',
                  part4Informal: 'Part 4 — Informal Email',
                  part4Formal: 'Part 4 — Formal Email',
                }
                const color = score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-amber-400' : 'bg-red-500'
                return (
                  <div key={part}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{label[part] ?? part}</span>
                      <span className="font-semibold">{score}/100</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${score}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Detailed writing feedback per part */}
        {result.detailedFeedback && (
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-5">
            <h2 className="font-semibold text-gray-800 text-sm mb-3">Examiner Notes by Part</h2>
            <div className="space-y-2">
              {Object.entries(result.detailedFeedback).map(([part, fb]) => {
                const label: Record<string, string> = { part1: 'Part 1', part2: 'Part 2', part3: 'Part 3', part4: 'Part 4' }
                return (
                  <div key={part} className="flex gap-3 text-sm">
                    <span className="font-bold text-blue-600 w-12 shrink-0">{label[part] ?? part}</span>
                    <span className="text-gray-600">{fb}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Strengths */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-amber-500" />
            <h2 className="font-semibold text-gray-800 text-sm">Strengths</h2>
          </div>
          {result.strengths.length > 0 ? (
            <ul className="space-y-2">
              {result.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-gray-400">Complete the test to see your strengths.</p>}
        </div>

        {/* Improvements */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-blue-500" />
            <h2 className="font-semibold text-gray-800 text-sm">Areas to Improve</h2>
          </div>
          <ul className="space-y-2">
            {result.improvements.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-400 shrink-0 mt-0.5 font-bold">→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Examiner tip */}
        {result.examinerTip && (
          <div className="bg-blue-700 text-white rounded-2xl p-5 mb-5 flex items-start gap-3">
            <Target className="w-5 h-5 shrink-0 mt-0.5 text-blue-200" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-blue-200 mb-1">Examiner&apos;s Tip</p>
              <p className="text-sm leading-relaxed">{result.examinerTip}</p>
            </div>
          </div>
        )}

        {/* Listening transcripts */}
        {result.module === 'listening' && (
          <div className="mb-5">
            <ListeningTranscripts />
          </div>
        )}

        {/* Wrong answers accordion */}
        {result.wrongAnswers && result.wrongAnswers.length > 0 && (
          <div className="mb-5">
            <WrongAnswersAccordion wrongAnswers={result.wrongAnswers} />
          </div>
        )}

        {/* CTAs */}
        <div className="flex gap-3">
          <Link
            href={`/exam/${module}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-700 text-white rounded-xl font-semibold text-sm hover:bg-blue-800 transition-colors shadow"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </Link>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-blue-200 text-blue-700 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors"
          >
            <BarChart3 className="w-4 h-4" /> All Modules
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
