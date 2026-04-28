'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ExamHeader from '@/components/ui/ExamHeader'
import { speakingPart1, speakingPart2, speakingPart3, speakingPart4 } from '@/lib/mock-data/speaking-questions'
import { submitExamForEvaluation, buildExamId } from '@/lib/utils/webhook'
import type { SpeakingAnswers } from '@/lib/types'
import { Mic, MicOff, CheckCircle, Loader2, Send, Camera, Clock } from 'lucide-react'

type Part = 1 | 2 | 3 | 4
const SPEAKING_SECONDS = 12 * 60

export default function SpeakingModule() {
  const router = useRouter()
  const [currentPart, setCurrentPart] = useState<Part>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [answers, setAnswers] = useState<SpeakingAnswers>({
    part1: { 0: null, 1: null, 2: null },
    part2: null,
    part3: null,
    part4: { 0: null, 1: null, 2: null },
  })

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    try {
      await submitExamForEvaluation({
        examId: buildExamId(),
        module: 'speaking',
        candidateName: 'Test Candidate',
        submittedAt: new Date().toISOString(),
        timeTaken: SPEAKING_SECONDS,
        answers,
      })
    } catch { /* handled gracefully */ }
    setSubmitted(true)
    setTimeout(() => router.push('/results?module=speaking'), 2000)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamHeader
        title="Speaking Test"
        subtitle="Aptis B2 — 4 Parts"
        totalSeconds={SPEAKING_SECONDS}
        onTimeExpire={handleSubmit}
        currentPart={currentPart}
        totalParts={4}
      />

      <div className="max-w-3xl mx-auto px-4 pt-6">
        <div className="flex gap-2 mb-6">
          {([1, 2, 3, 4] as Part[]).map(p => (
            <button
              key={p}
              onClick={() => setCurrentPart(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPart === p ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              Part {p}
            </button>
          ))}
        </div>

        {currentPart === 1 && (
          <SpeakingPart1
            questions={speakingPart1.questions}
            timePerQ={speakingPart1.timePerQuestion}
            recorded={answers.part1}
            onRecord={idx => status =>
              setAnswers(prev => ({ ...prev, part1: { ...prev.part1, [idx]: status } }))
            }
          />
        )}
        {currentPart === 2 && (
          <SpeakingPart2Card
            data={speakingPart2}
            recorded={answers.part2}
            onRecord={status => setAnswers(prev => ({ ...prev, part2: status }))}
          />
        )}
        {currentPart === 3 && (
          <SpeakingPart3Card
            data={speakingPart3}
            recorded={answers.part3}
            onRecord={status => setAnswers(prev => ({ ...prev, part3: status }))}
          />
        )}
        {currentPart === 4 && (
          <SpeakingPart4Card
            data={speakingPart4}
            recorded={answers.part4}
            onRecord={idx => status =>
              setAnswers(prev => ({ ...prev, part4: { ...prev.part4, [idx]: status } }))
            }
          />
        )}

        <div className="flex justify-between mt-8 pb-8">
          <button
            onClick={() => setCurrentPart(p => (p > 1 ? (p - 1) as Part : p))}
            disabled={currentPart === 1}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-300 disabled:opacity-40"
          >
            ← Previous
          </button>
          {currentPart < 4 ? (
            <button
              onClick={() => setCurrentPart(p => (p < 4 ? (p + 1) as Part : p))}
              className="px-5 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800"
            >
              Next →
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

// ─── Mock Recording Button ───────────────────────────────────────────────────

function RecordButton({
  status,
  onDone,
  seconds,
}: {
  status: 'recorded' | 'skipped' | null
  onDone: (s: 'recorded' | 'skipped') => void
  seconds: number
}) {
  const [recording, setRecording] = useState(false)
  const [countdown, setCountdown] = useState(seconds)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const start = () => {
    setRecording(true)
    setCountdown(seconds)
    intervalRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(intervalRef.current!)
          setRecording(false)
          onDone('recorded')
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  if (status === 'recorded') {
    return (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <span className="text-sm text-green-700 font-medium">Response recorded</span>
      </div>
    )
  }

  if (recording) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
          <Mic className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-red-700">Recording...</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <Clock className="w-3 h-3" />
            <span>{countdown}s remaining</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={start}
        className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors shadow"
      >
        <Mic className="w-4 h-4" /> Start Recording ({seconds}s)
      </button>
      <button
        onClick={() => onDone('skipped')}
        className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-gray-300"
      >
        Skip
      </button>
    </div>
  )
}

// ─── Part 1 ──────────────────────────────────────────────────────────────────

function SpeakingPart1({
  questions,
  timePerQ,
  recorded,
  onRecord,
}: {
  questions: string[]
  timePerQ: number
  recorded: Record<number, 'recorded' | 'skipped' | null>
  onRecord: (idx: number) => (s: 'recorded' | 'skipped') => void
}) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
        <h2 className="font-semibold text-blue-900 mb-1">Part 1 – Personal Questions</h2>
        <p className="text-blue-700 text-sm">Answer each question. You have <strong>{timePerQ} seconds</strong> per question.</p>
      </div>
      {questions.map((q, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-800 mb-4">Question {i + 1}: {q}</p>
          <RecordButton status={recorded[i]} onDone={onRecord(i)} seconds={timePerQ} />
        </div>
      ))}
    </div>
  )
}

// ─── Part 2 ──────────────────────────────────────────────────────────────────

function SpeakingPart2Card({
  data,
  recorded,
  onRecord,
}: {
  data: typeof speakingPart2
  recorded: 'recorded' | 'skipped' | null
  onRecord: (s: 'recorded' | 'skipped') => void
}) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h2 className="font-semibold text-blue-900 mb-1">Part 2 – Photo Description</h2>
        <p className="text-blue-700 text-sm">Describe the photo and answer the follow-up questions.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center mb-4">
          <div className="text-center text-gray-400">
            <Camera className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm font-medium">Image: Office Scene</p>
            <p className="text-xs mt-1 max-w-xs mx-auto">{data.imageDescription}</p>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-700 mb-2">{data.photoQuestion}</p>
        {data.followUpQuestions.map((fq, i) => (
          <p key={i} className="text-sm text-gray-600 mb-1">• {fq}</p>
        ))}
        <div className="mt-4">
          <RecordButton status={recorded} onDone={onRecord} seconds={data.timeSeconds} />
        </div>
      </div>
    </div>
  )
}

// ─── Part 3 ──────────────────────────────────────────────────────────────────

function SpeakingPart3Card({
  data,
  recorded,
  onRecord,
}: {
  data: typeof speakingPart3
  recorded: 'recorded' | 'skipped' | null
  onRecord: (s: 'recorded' | 'skipped') => void
}) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h2 className="font-semibold text-blue-900 mb-1">Part 3 – Photo Comparison</h2>
        <p className="text-blue-700 text-sm">Compare the two images and answer the questions.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Image A', desc: data.imageADescription },
            { label: 'Image B', desc: data.imageBDescription },
          ].map(img => (
            <div key={img.label} className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center">
              <div className="text-center text-gray-400 p-2">
                <Camera className="w-8 h-8 mx-auto mb-1" />
                <p className="text-xs font-medium">{img.label}</p>
                <p className="text-xs mt-0.5">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm font-medium text-gray-800 mb-2">{data.comparisonPrompt}</p>
        {data.followUpQuestions.map((q, i) => (
          <p key={i} className="text-sm text-gray-600 mb-1">• {q}</p>
        ))}
        <div className="mt-4">
          <RecordButton status={recorded} onDone={onRecord} seconds={data.timeSeconds} />
        </div>
      </div>
    </div>
  )
}

// ─── Part 4 ──────────────────────────────────────────────────────────────────

function SpeakingPart4Card({
  data,
  recorded,
  onRecord,
}: {
  data: typeof speakingPart4
  recorded: Record<number, 'recorded' | 'skipped' | null>
  onRecord: (idx: number) => (s: 'recorded' | 'skipped') => void
}) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h2 className="font-semibold text-blue-900 mb-1">Part 4 – Image Discussion</h2>
        <p className="text-blue-700 text-sm">Look at the image and answer each question. You have <strong>2 minutes</strong> per question.</p>
      </div>
      <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center mb-2">
        <div className="text-center text-gray-400">
          <Camera className="w-12 h-12 mx-auto mb-2" />
          <p className="text-sm font-medium">Image: Climate Demonstration</p>
          <p className="text-xs mt-1 max-w-xs mx-auto">{data.imageDescription}</p>
        </div>
      </div>
      {data.questions.map((q, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-800 mb-4">Question {i + 1}: {q}</p>
          <RecordButton status={recorded[i]} onDone={onRecord(i)} seconds={data.timeSeconds} />
        </div>
      ))}
    </div>
  )
}
