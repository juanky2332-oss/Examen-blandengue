'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ExamHeader from '@/components/ui/ExamHeader'
import { listeningParts } from '@/lib/mock-data/listening-questions'
import { submitExamForEvaluation, buildExamId } from '@/lib/utils/webhook'
import type { ListeningAnswers } from '@/lib/types'
import { Play, Pause, Volume2, CheckCircle, Loader2, Send } from 'lucide-react'

const LISTENING_SECONDS = 40 * 60

export default function ListeningModule() {
  const router = useRouter()
  const [currentPart, setCurrentPart] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [answers, setAnswers] = useState<ListeningAnswers>({
    part1: {},
    part2: {},
    part3: {},
    part4: {},
  })

  const partKey = (['part1', 'part2', 'part3', 'part4'] as const)[currentPart]

  const selectAnswer = (qId: number, idx: number) =>
    setAnswers(prev => ({ ...prev, [partKey]: { ...prev[partKey], [qId]: idx } }))

  const togglePlay = () => {
    setPlaying(p => !p)
    if (!playing) {
      const interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setPlaying(false)
            return 100
          }
          return prev + 2
        })
      }, 200)
    }
  }

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    try {
      await submitExamForEvaluation({
        examId: buildExamId(),
        module: 'listening',
        candidateName: 'Test Candidate',
        submittedAt: new Date().toISOString(),
        timeTaken: LISTENING_SECONDS,
        answers,
      })
    } catch { /* handled gracefully */ }
    setSubmitted(true)
    setTimeout(() => router.push('/results?module=listening'), 2000)
  }, [answers, router])

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
          {submitting
            ? <><Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" /><h2 className="text-xl font-semibold">AI Evaluating...</h2></>
            : <><CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" /><h2 className="text-xl font-semibold">Submitted!</h2></>
          }
        </div>
      </div>
    )
  }

  const part = listeningParts[currentPart]

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamHeader
        title="Listening Test"
        subtitle="Aptis B2 — 4 Parts"
        totalSeconds={LISTENING_SECONDS}
        onTimeExpire={handleSubmit}
        currentPart={currentPart + 1}
        totalParts={4}
      />

      <div className="max-w-4xl mx-auto px-4 pt-6">
        {/* Part tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {listeningParts.map((p, i) => (
            <button
              key={i}
              onClick={() => { setCurrentPart(i); setPlaying(false); setAudioProgress(0) }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPart === i ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              Part {p.partNumber}
            </button>
          ))}
        </div>

        {/* Part description */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-2">Part {part.partNumber}: {part.title}</h2>
          <p className="text-sm text-gray-600 mb-5">{part.audioDescription}</p>

          {/* Mock audio player */}
          <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors shrink-0"
            >
              {playing
                ? <Pause className="w-4 h-4 text-white" />
                : <Play className="w-4 h-4 text-white ml-0.5" />
              }
            </button>
            <div className="flex-1">
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-blue-400 h-1.5 rounded-full transition-all duration-200"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
            </div>
            <Volume2 className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-xs text-gray-400 shrink-0">MOCK AUDIO</span>
          </div>

          {audioProgress === 0 && (
            <p className="text-xs text-amber-600 mt-2">
              ▶ Press play to simulate the audio. In the real exam, audio plays automatically.
            </p>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {part.questions.map(q => (
            <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-800 mb-3">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selectAnswer(q.id, i)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-colors ${
                      answers[partKey][q.id] === i
                        ? 'bg-blue-700 border-blue-700 text-white'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-400'
                    }`}
                  >
                    <span className="font-semibold mr-2 opacity-60">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pb-8">
          <button
            onClick={() => { setCurrentPart(p => Math.max(0, p - 1)); setAudioProgress(0) }}
            disabled={currentPart === 0}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-300 disabled:opacity-40"
          >
            ← Previous Part
          </button>
          {currentPart < 3 ? (
            <button
              onClick={() => { setCurrentPart(p => Math.min(3, p + 1)); setAudioProgress(0) }}
              className="px-5 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800"
            >
              Next Part →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-60"
            >
              <Send className="w-4 h-4" /> Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
