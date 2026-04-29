'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ExamHeader from '@/components/ui/ExamHeader'
import {
  speakingPart1, speakingPart2, speakingPart3, speakingPart4,
  speakingModelAnswers, speakingKeyPhrases,
} from '@/lib/mock-data/speaking-questions'
import type { SpeakingAnswers, ExamResult } from '@/lib/types'
import {
  Mic, CheckCircle, Send, Camera, Clock, Eye, EyeOff,
  ChevronDown, ChevronUp, Star, ArrowRight, Target,
} from 'lucide-react'

type Part = 1 | 2 | 3 | 4
type Phase = 'practice' | 'selfAssess'
const SPEAKING_SECONDS = 12 * 60

const PART_LABELS = ['Personal Questions', 'Photo Description', 'Photo Comparison', 'Image Discussion']

export default function SpeakingModule() {
  const router = useRouter()
  const [currentPart, setCurrentPart] = useState<Part>(1)
  const [phase, setPhase] = useState<Phase>('practice')

  const [answers, setAnswers] = useState<SpeakingAnswers>({
    part1: { 0: null, 1: null, 2: null },
    part2: null,
    part3: null,
    part4: { 0: null, 1: null, 2: null },
  })

  // Self-assessment ratings per part (1–5)
  const [ratings, setRatings] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0 })

  const allAttempted =
    Object.values(answers.part1).every(v => v !== null) &&
    answers.part2 !== null &&
    answers.part3 !== null &&
    Object.values(answers.part4).every(v => v !== null)

  const allRated = Object.values(ratings).every(r => r > 0)

  const handleFinishPractice = () => {
    setPhase('selfAssess')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmitSelfAssess = useCallback(() => {
    // Score = average rating out of 5, scaled to 0-100
    const avgRating = Object.values(ratings).reduce((a, b) => a + b, 0) / 4
    const score = Math.round((avgRating / 5) * 100)
    const level = score >= 80 ? 'B2+' : score >= 65 ? 'B2' : score >= 50 ? 'B1-B2' : 'B1'

    const labelForRating = (r: number) =>
      r >= 5 ? 'Excellent — fully addressed the task at B2+ level'
      : r >= 4 ? 'Very good — strong B2 performance with minor gaps'
      : r >= 3 ? 'Good — mostly addressed with some B2 features'
      : r >= 2 ? 'Fair — partial response with limited vocabulary'
      : 'Needs improvement — response did not address the task adequately'

    const result: ExamResult = {
      module: 'speaking',
      timestamp: new Date().toISOString(),
      score,
      level,
      overallFeedback: `Self-assessed score: ${score}/100 across 4 speaking parts. ${score >= 65 ? 'Your self-assessment indicates B2-level speaking performance. Focus on expanding vocabulary range and grammatical variety.' : 'Your self-assessment suggests areas that need development. Practise speaking aloud daily using B2 phrases and structured responses.'}`,
      strengths: [
        ratings[1] >= 4 ? 'Part 1: Confident and fluent personal responses' : null,
        ratings[2] >= 4 ? 'Part 2: Good descriptive language for photo description' : null,
        ratings[3] >= 4 ? 'Part 3: Effective comparison and contrast language' : null,
        ratings[4] >= 4 ? 'Part 4: Strong opinion expression on complex topics' : null,
        avgRating >= 4 ? 'Overall consistent B2 performance across all parts' : null,
      ].filter(Boolean) as string[],
      improvements: [
        ratings[1] < 4 ? 'Part 1: Expand personal answers — give reasons and examples, not just facts' : null,
        ratings[2] < 4 ? 'Part 2: Use more descriptive vocabulary — "there appears to be...", "in the foreground..."' : null,
        ratings[3] < 4 ? 'Part 3: Use contrast phrases — "whereas...", "by contrast...", "on the other hand..."' : null,
        ratings[4] < 4 ? 'Part 4: Support opinions with arguments — "because...", "as a result...", "it follows that..."' : null,
      ].filter(Boolean) as string[],
      partScores: {
        'Part 1 — Personal Questions': Math.round((ratings[1] / 5) * 100),
        'Part 2 — Photo Description': Math.round((ratings[2] / 5) * 100),
        'Part 3 — Photo Comparison': Math.round((ratings[3] / 5) * 100),
        'Part 4 — Image Discussion': Math.round((ratings[4] / 5) * 100),
      },
      examinerTip: 'In the real Aptis Speaking exam, the examiner awards marks for Task Achievement, Vocabulary, Grammar, and Coherence — not just fluency. A well-structured answer with B2 vocabulary is always better than a fast but simple one.',
    }

    localStorage.setItem('aptis_result_speaking', JSON.stringify(result))
    router.push('/results?module=speaking')
  }, [ratings, router])

  if (phase === 'selfAssess') {
    return (
      <SelfAssessScreen
        ratings={ratings}
        allRated={allRated}
        onRate={(part, rating) => setRatings(r => ({ ...r, [part]: rating }))}
        onSubmit={handleSubmitSelfAssess}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamHeader
        title="Speaking Test"
        subtitle="Aptis B2 — 4 Parts · 12 min"
        totalSeconds={SPEAKING_SECONDS}
        onTimeExpire={handleFinishPractice}
        currentPart={currentPart}
        totalParts={4}
      />

      <div className="max-w-3xl mx-auto px-4 pt-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {([1, 2, 3, 4] as Part[]).map(p => (
            <button
              key={p}
              onClick={() => setCurrentPart(p)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPart === p ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              Part {p}
              {/* Completion dot */}
              {p === 1 && Object.values(answers.part1).every(v => v !== null) && (
                <span className="w-2 h-2 bg-green-400 rounded-full" />
              )}
              {p === 2 && answers.part2 !== null && <span className="w-2 h-2 bg-green-400 rounded-full" />}
              {p === 3 && answers.part3 !== null && <span className="w-2 h-2 bg-green-400 rounded-full" />}
              {p === 4 && Object.values(answers.part4).every(v => v !== null) && (
                <span className="w-2 h-2 bg-green-400 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {currentPart === 1 && (
          <SpeakingPart1Section
            questions={speakingPart1.questions}
            timePerQ={speakingPart1.timePerQuestion}
            recorded={answers.part1}
            onRecord={idx => status =>
              setAnswers(prev => ({ ...prev, part1: { ...prev.part1, [idx]: status } }))
            }
          />
        )}
        {currentPart === 2 && (
          <SpeakingPart2Section
            data={speakingPart2}
            recorded={answers.part2}
            onRecord={status => setAnswers(prev => ({ ...prev, part2: status }))}
          />
        )}
        {currentPart === 3 && (
          <SpeakingPart3Section
            data={speakingPart3}
            recorded={answers.part3}
            onRecord={status => setAnswers(prev => ({ ...prev, part3: status }))}
          />
        )}
        {currentPart === 4 && (
          <SpeakingPart4Section
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
              onClick={handleFinishPractice}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 shadow"
            >
              <Star className="w-4 h-4" /> Finish & Self-Assess
            </button>
          )}
        </div>

        {allAttempted && currentPart < 4 && (
          <div className="mb-8 text-center">
            <button
              onClick={handleFinishPractice}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow"
            >
              <Star className="w-4 h-4" /> All parts done — Finish & Self-Assess
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Self-Assessment Screen ───────────────────────────────────────────────────

function SelfAssessScreen({
  ratings, allRated, onRate, onSubmit,
}: {
  ratings: Record<number, number>
  allRated: boolean
  onRate: (part: number, rating: number) => void
  onSubmit: () => void
}) {
  const [expandedModel, setExpandedModel] = useState<string | null>(null)
  const [showPhrases, setShowPhrases] = useState(false)

  const ratingLabels = ['', 'Needs work', 'Fair', 'Good', 'Very good', 'Excellent']
  const ratingColors = ['', 'bg-red-100 text-red-700', 'bg-amber-100 text-amber-700', 'bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700', 'bg-green-100 text-green-700']

  const parts = [
    {
      num: 1,
      label: 'Part 1 — Personal Questions',
      color: 'border-violet-300 bg-violet-50',
      headerColor: 'text-violet-800',
      taskSummary: '3 personal questions · 45 seconds each',
      modelKey: 'part1' as const,
      isArray: true,
    },
    {
      num: 2,
      label: 'Part 2 — Photo Description',
      color: 'border-blue-300 bg-blue-50',
      headerColor: 'text-blue-800',
      taskSummary: 'Describe image + 2 follow-up questions · 45 seconds total',
      modelKey: 'part2' as const,
      isArray: false,
    },
    {
      num: 3,
      label: 'Part 3 — Photo Comparison',
      color: 'border-cyan-300 bg-cyan-50',
      headerColor: 'text-cyan-800',
      taskSummary: 'Compare 2 images + 2 follow-up questions · 45 seconds total',
      modelKey: 'part3' as const,
      isArray: false,
    },
    {
      num: 4,
      label: 'Part 4 — Image Discussion',
      color: 'border-rose-300 bg-rose-50',
      headerColor: 'text-rose-800',
      taskSummary: 'Discuss social topic from image · 3 questions · 2 minutes each',
      modelKey: 'part4' as const,
      isArray: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-blue-700 text-white rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-blue-200" />
            <h2 className="font-extrabold text-xl">Self-Assessment</h2>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed">
            Compare your responses with the model answers below, then honestly rate each part. This is how you build speaking accuracy at B2 level.
          </p>
        </div>

        {/* Key phrases */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-5">
          <button
            onClick={() => setShowPhrases(p => !p)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Star className="w-4 h-4 text-amber-500" />
              Essential B2 Phrases — did you use any of these?
            </div>
            {showPhrases ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>
          {showPhrases && (
            <div className="border-t border-gray-100 px-5 py-4 grid sm:grid-cols-2 gap-4">
              {Object.entries(speakingKeyPhrases).map(([cat, phrases]) => (
                <div key={cat}>
                  <p className="text-xs font-bold uppercase text-gray-500 mb-2 tracking-wide">{cat}</p>
                  <ul className="space-y-1">
                    {phrases.map((p, i) => (
                      <li key={i} className="text-xs text-gray-700 flex items-start gap-1.5">
                        <span className="text-blue-400 shrink-0 font-bold">→</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Per-part review + rating */}
        <div className="space-y-4 mb-6">
          {parts.map(part => {
            const modelKey = `model_${part.num}`
            const isOpen = expandedModel === modelKey
            const modelContent = speakingModelAnswers[part.modelKey]

            return (
              <div key={part.num} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className={`border-l-4 ${part.color} px-5 py-4`}>
                  <h3 className={`font-bold text-sm mb-0.5 ${part.headerColor}`}>{part.label}</h3>
                  <p className="text-xs text-gray-500">{part.taskSummary}</p>
                </div>

                {/* Model answer toggle */}
                <div className="px-5 py-3 border-t border-gray-100">
                  <button
                    onClick={() => setExpandedModel(isOpen ? null : modelKey)}
                    className="flex items-center gap-2 text-sm text-emerald-700 font-medium hover:text-emerald-900"
                  >
                    {isOpen ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {isOpen ? 'Hide model answer' : 'Show model answer (compare honestly)'}
                  </button>

                  {isOpen && (
                    <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <p className="text-xs font-bold text-emerald-700 mb-3 uppercase tracking-wide">B2 Model Answer</p>
                      {Array.isArray(modelContent) ? (
                        <div className="space-y-3">
                          {(modelContent as string[]).map((m, i) => (
                            <div key={i}>
                              {part.num === 1 && (
                                <p className="text-xs font-semibold text-gray-500 mb-1">
                                  Q{i + 1}: {speakingPart1.questions[i]}
                                </p>
                              )}
                              {part.num === 4 && (
                                <p className="text-xs font-semibold text-gray-500 mb-1">
                                  Q{i + 1}: {speakingPart4.questions[i]}
                                </p>
                              )}
                              <p className="text-sm text-gray-700 leading-relaxed italic">&ldquo;{m}&rdquo;</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700 leading-relaxed italic">&ldquo;{modelContent as string}&rdquo;</p>
                      )}
                      <p className="text-xs text-emerald-600 mt-3 font-medium">
                        Read it once, then say it in your OWN words — adapt, don&apos;t memorise.
                      </p>
                    </div>
                  )}
                </div>

                {/* Self-rating */}
                <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
                  <p className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wide">How well did you perform?</p>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map(r => (
                      <button
                        key={r}
                        onClick={() => onRate(part.num, r)}
                        className={`flex-1 min-w-[56px] py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                          ratings[part.num] === r
                            ? `${ratingColors[r]} border-current scale-105 shadow`
                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400'
                        }`}
                      >
                        {r}
                        <span className="block text-[10px] font-medium opacity-80">{ratingLabels[r]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Submit */}
        <button
          onClick={onSubmit}
          disabled={!allRated}
          className="w-full flex items-center justify-center gap-2 py-4 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 transition-colors shadow-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowRight className="w-4 h-4" />
          {allRated ? 'Submit Self-Assessment & View Results' : `Rate all 4 parts to continue (${Object.values(ratings).filter(r => r > 0).length}/4 rated)`}
        </button>
      </div>
    </div>
  )
}

// ─── Mock Recording Button ────────────────────────────────────────────────────

function RecordButton({
  status, onDone, seconds,
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
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <span className="text-sm text-green-700 font-semibold">Response complete</span>
          <p className="text-xs text-gray-400">You&apos;ll compare with a model answer after all parts</p>
        </div>
      </div>
    )
  }

  if (recording) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
          <Mic className="w-5 h-5 text-red-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-red-700">Speaking now...</p>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <Clock className="w-3 h-3" />
            <span>{countdown}s remaining</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={start}
        className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors shadow"
      >
        <Mic className="w-4 h-4" /> Start Speaking ({seconds}s)
      </button>
      <button
        onClick={() => onDone('skipped')}
        className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-gray-300"
      >
        Skip
      </button>
      <p className="text-xs text-gray-400 w-full">Speak your answer out loud — do NOT just think it.</p>
    </div>
  )
}

// ─── Part 1 ──────────────────────────────────────────────────────────────────

function SpeakingPart1Section({
  questions, timePerQ, recorded, onRecord,
}: {
  questions: string[]
  timePerQ: number
  recorded: Record<number, 'recorded' | 'skipped' | null>
  onRecord: (idx: number) => (s: 'recorded' | 'skipped') => void
}) {
  return (
    <div className="space-y-4">
      <div className="bg-violet-700 text-white rounded-xl p-4 mb-2">
        <h2 className="font-bold mb-1">Part 1 – Personal Questions</h2>
        <p className="text-violet-200 text-sm">Answer each question. You have <strong>{timePerQ} seconds</strong> per question. Give full, developed answers with reasons and examples.</p>
      </div>
      <div className="bg-violet-50 border border-violet-200 rounded-xl p-3 text-xs text-violet-800">
        <strong>B2 tip:</strong> Don&apos;t just answer with one sentence. Expand: give a reason, an example, or a contrast. Aim for 8–12 seconds minimum per response.
      </div>
      {questions.map((q, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            <span className="text-violet-600 font-bold mr-1">Q{i + 1}.</span> {q}
          </p>
          <RecordButton status={recorded[i]} onDone={onRecord(i)} seconds={timePerQ} />
        </div>
      ))}
    </div>
  )
}

// ─── Part 2 ──────────────────────────────────────────────────────────────────

function SpeakingPart2Section({
  data, recorded, onRecord,
}: {
  data: typeof speakingPart2
  recorded: 'recorded' | 'skipped' | null
  onRecord: (s: 'recorded' | 'skipped') => void
}) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-700 text-white rounded-xl p-4">
        <h2 className="font-bold mb-1">Part 2 – Photo Description</h2>
        <p className="text-blue-200 text-sm">Describe the photo, then answer the follow-up questions. Total: <strong>{data.timeSeconds} seconds</strong>.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        {/* Image placeholder with rich description */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 mb-4 text-center border border-gray-200">
          <Camera className="w-10 h-10 mx-auto mb-2 text-gray-400" />
          <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Image Description</p>
          <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">{data.imageDescription}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-800 mb-2">{data.photoQuestion}</p>
          {data.followUpQuestions.map((fq, i) => (
            <p key={i} className="text-sm text-gray-600 mb-1">• {fq}</p>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800 mb-4">
          <strong>B2 phrases to use:</strong> "In this photograph I can see...", "In the background...", "It appears that...", "The atmosphere seems..."
        </div>
        <RecordButton status={recorded} onDone={onRecord} seconds={data.timeSeconds} />
      </div>
    </div>
  )
}

// ─── Part 3 ──────────────────────────────────────────────────────────────────

function SpeakingPart3Section({
  data, recorded, onRecord,
}: {
  data: typeof speakingPart3
  recorded: 'recorded' | 'skipped' | null
  onRecord: (s: 'recorded' | 'skipped') => void
}) {
  return (
    <div className="space-y-4">
      <div className="bg-cyan-700 text-white rounded-xl p-4">
        <h2 className="font-bold mb-1">Part 3 – Photo Comparison</h2>
        <p className="text-cyan-200 text-sm">Compare both images and answer the questions. Total: <strong>{data.timeSeconds} seconds</strong>.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Image A', desc: data.imageADescription },
            { label: 'Image B', desc: data.imageBDescription },
          ].map(img => (
            <div key={img.label} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 border border-gray-200 text-center">
              <Camera className="w-8 h-8 mx-auto mb-1 text-gray-400" />
              <p className="text-xs font-bold text-gray-500 mb-1">{img.label}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{img.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm font-semibold text-gray-800 mb-2">{data.comparisonPrompt}</p>
        {data.followUpQuestions.map((q, i) => (
          <p key={i} className="text-sm text-gray-600 mb-1">• {q}</p>
        ))}
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3 text-xs text-cyan-800 mb-4 mt-3">
          <strong>B2 phrases to use:</strong> "Whereas the first image..., the second depicts...", "The key difference is...", "By contrast...", "On balance, I think..."
        </div>
        <RecordButton status={recorded} onDone={onRecord} seconds={data.timeSeconds} />
      </div>
    </div>
  )
}

// ─── Part 4 ──────────────────────────────────────────────────────────────────

function SpeakingPart4Section({
  data, recorded, onRecord,
}: {
  data: typeof speakingPart4
  recorded: Record<number, 'recorded' | 'skipped' | null>
  onRecord: (idx: number) => (s: 'recorded' | 'skipped') => void
}) {
  return (
    <div className="space-y-4">
      <div className="bg-rose-700 text-white rounded-xl p-4">
        <h2 className="font-bold mb-1">Part 4 – Image Discussion</h2>
        <p className="text-rose-200 text-sm">Look at the image and answer each question. You have <strong>2 minutes per question</strong>. Give detailed, structured opinions.</p>
      </div>
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-5 border border-gray-200 text-center mb-2">
        <Camera className="w-10 h-10 mx-auto mb-2 text-gray-400" />
        <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Image Description</p>
        <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">{data.imageDescription}</p>
      </div>
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-800">
        <strong>B2 tip:</strong> 2 minutes is a long time. Structure your answer: state your opinion, give 2–3 reasons, give an example, and conclude. Use discourse markers: "Furthermore...", "As a result...", "Having said that..."
      </div>
      {data.questions.map((q, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            <span className="text-rose-600 font-bold mr-1">Q{i + 1}.</span> {q}
          </p>
          <RecordButton status={recorded[i]} onDone={onRecord(i)} seconds={data.timeSeconds} />
        </div>
      ))}
    </div>
  )
}
