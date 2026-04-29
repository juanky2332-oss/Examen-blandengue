'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ExamHeader from '@/components/ui/ExamHeader'
import { listeningParts } from '@/lib/mock-data/listening-questions'
import type { ListeningAnswers, ExamResult } from '@/lib/types'
import { Play, Pause, Volume2, CheckCircle, Send, RotateCcw, FileText, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'

const LISTENING_SECONDS = 40 * 60
const PART_KEYS = ['part1', 'part2', 'part3', 'part4'] as const

export default function ListeningModule() {
  const router = useRouter()
  const [currentPart, setCurrentPart] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [phase, setPhase] = useState<'exam' | 'transcripts'>('exam')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const [answers, setAnswers] = useState<ListeningAnswers>({ part1: {}, part2: {}, part3: {}, part4: {} })
  const [result, setResult] = useState<ExamResult | null>(null)

  const partKey = PART_KEYS[currentPart]

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const selectAnswer = (qId: number, idx: number) =>
    setAnswers(prev => ({ ...prev, [partKey]: { ...prev[partKey], [qId]: idx } }))

  const togglePlay = () => {
    if (playing) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setPlaying(false)
    } else {
      setPlaying(true)
      intervalRef.current = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            clearInterval(intervalRef.current!)
            setPlaying(false)
            return 100
          }
          return prev + 1
        })
      }, 150)
    }
  }

  const resetAudio = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setPlaying(false)
    setAudioProgress(0)
  }

  const handleSubmit = useCallback(() => {
    let correct = 0
    let total = 0
    const wrongAnswers: ExamResult['wrongAnswers'] = []

    listeningParts.forEach((part, pi) => {
      const pk = PART_KEYS[pi]
      part.questions.forEach(q => {
        total++
        const given = answers[pk][q.id]
        if (given === q.correctIndex) {
          correct++
        } else {
          wrongAnswers!.push({
            questionId: q.id,
            question: q.question,
            yourAnswer: given !== undefined && given !== null ? q.options[given] : '(not answered)',
            correctAnswer: q.options[q.correctIndex],
          })
        }
      })
    })

    const score = Math.round((correct / total) * 100)
    const level = score >= 80 ? 'B2+' : score >= 65 ? 'B2' : score >= 50 ? 'B1-B2' : 'B1'

    const partCorrects = listeningParts.map((part, pi) => {
      const pk = PART_KEYS[pi]
      return part.questions.filter(q => answers[pk][q.id] === q.correctIndex).length
    })

    const computed: ExamResult = {
      module: 'listening',
      timestamp: new Date().toISOString(),
      score,
      level,
      overallFeedback: `You answered ${correct}/${total} questions correctly. Part breakdown: Short exchanges ${partCorrects[0]}/${listeningParts[0].questions.length} · Information ${partCorrects[1]}/${listeningParts[1].questions.length} · Interview ${partCorrects[2]}/${listeningParts[2].questions.length} · Documentary ${partCorrects[3]}/${listeningParts[3].questions.length}. ${score >= 65 ? 'Good B2 listening performance.' : 'Focus on listening to authentic English at natural speed — podcasts, BBC, TED Talks.'}`,
      strengths: [
        partCorrects[0] >= 4 ? 'Strong comprehension of short, fast exchanges' : null,
        partCorrects[2] >= 3 ? 'Good ability to follow extended monologues (interviews)' : null,
        partCorrects[3] >= 3 ? 'Solid understanding of documentary-style academic content' : null,
        correct >= 12 ? 'Above-average overall listening comprehension' : null,
      ].filter(Boolean) as string[],
      improvements: [
        partCorrects[0] < 4 ? 'Short exchanges: focus on getting the gist quickly — you only hear each once in the real exam' : null,
        partCorrects[1] < 3 ? 'Information matching: take notes while listening; answers are often paraphrased' : null,
        partCorrects[2] < 3 ? 'Extended monologue: practise listening to interviews on BBC World Service or TED Talks' : null,
        partCorrects[3] < 3 ? 'Documentary: listen to documentaries and academic talks to build topic vocabulary' : null,
      ].filter(Boolean) as string[],
      wrongAnswers,
      correctCount: correct,
      totalCount: total,
      examinerTip: 'In the real Aptis exam, audio plays once only. Practise listening without rewinding — it builds the active listening skills critical for B2.',
    }

    localStorage.setItem('aptis_result_listening', JSON.stringify(computed))
    setResult(computed)
    setPhase('transcripts')
  }, [answers])

  // Transcript review phase
  if (phase === 'transcripts' && result) {
    return <TranscriptReview result={result} onContinue={() => router.push('/results?module=listening')} />
  }

  const part = listeningParts[currentPart]

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamHeader
        title="Listening Test"
        subtitle="Aptis B2 · 4 Parts · 40 min"
        totalSeconds={LISTENING_SECONDS}
        onTimeExpire={handleSubmit}
        currentPart={currentPart + 1}
        totalParts={4}
      />

      <div className="max-w-4xl mx-auto px-4 pt-6 pb-10">
        <div className="flex gap-2 mb-6 flex-wrap">
          {listeningParts.map((p, i) => {
            const pk = PART_KEYS[i]
            const answered = p.questions.filter(q => answers[pk][q.id] !== undefined).length
            return (
              <button key={i} onClick={() => { setCurrentPart(i); resetAudio() }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPart === i ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'}`}>
                Part {p.partNumber}
                <span className={`ml-1.5 text-xs ${currentPart === i ? 'text-blue-200' : 'text-gray-400'}`}>
                  {answered}/{p.questions.length}
                </span>
              </button>
            )
          })}
        </div>

        <div className="bg-blue-700 rounded-xl p-4 text-white mb-5">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">Part {part.partNumber}</span>
            <h2 className="font-bold">{part.title}</h2>
          </div>
          <p className="text-blue-100 text-sm">{part.audioDescription}</p>
        </div>

        {/* Mock Audio Player */}
        <div className="bg-gray-900 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-1 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" style={{ animationPlayState: playing ? 'running' : 'paused' }} />
            <span className="text-xs text-gray-400 ml-1 font-mono">SIMULATED AUDIO — Part {part.partNumber}</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}
              className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors shrink-0 shadow-lg">
              {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
            </button>
            <div className="flex-1">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full transition-all duration-150" style={{ width: `${audioProgress}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{Math.round(audioProgress * 0.9)}s</span>
                <span>~90s</span>
              </div>
            </div>
            <button onClick={resetAudio} className="text-gray-500 hover:text-gray-300 transition-colors" title="Restart">
              <RotateCcw className="w-4 h-4" />
            </button>
            <Volume2 className="w-4 h-4 text-gray-500 shrink-0" />
          </div>
          {audioProgress === 0 && (
            <p className="text-xs text-amber-400 mt-3">▶ Press play to simulate the audio. Read the questions below first, then listen.</p>
          )}
          {audioProgress > 0 && audioProgress < 100 && (
            <p className="text-xs text-blue-300 mt-3">🎧 Listening... Answer the questions below as you listen.</p>
          )}
          {audioProgress === 100 && (
            <p className="text-xs text-green-400 mt-3">✓ Audio finished. Answer all questions before moving to the next part.</p>
          )}
          <p className="text-xs text-gray-500 mt-2 italic">
            In the real exam: audio plays once only. Practise without rewinding.
          </p>
        </div>

        <div className="space-y-4">
          {part.questions.map((q, qi) => (
            <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                <span className="text-blue-600 mr-1">{qi + 1}.</span> {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <button key={i} onClick={() => selectAnswer(q.id, i)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-colors flex items-center gap-3 ${answers[partKey][q.id] === i ? 'bg-blue-700 border-blue-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-400'}`}>
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${answers[partKey][q.id] === i ? 'border-white bg-white text-blue-700' : 'border-gray-300 text-gray-400'}`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button onClick={() => { setCurrentPart(p => Math.max(0, p - 1)); resetAudio() }}
            disabled={currentPart === 0}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-300 disabled:opacity-40">
            ← Previous Part
          </button>
          {currentPart < 3 ? (
            <button onClick={() => { setCurrentPart(p => Math.min(3, p + 1)); resetAudio() }}
              className="px-5 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800">
              Next Part →
            </button>
          ) : (
            <button onClick={handleSubmit}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 shadow">
              <Send className="w-4 h-4" /> Submit & Review Transcripts
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Transcript Review Screen ─────────────────────────────────────────────────

function TranscriptReview({ result, onContinue }: { result: ExamResult; onContinue: () => void }) {
  const [openPart, setOpenPart] = useState<number | null>(0)
  const scoreColor = result.score >= 70 ? 'text-green-700 bg-green-100' : result.score >= 55 ? 'text-amber-700 bg-amber-100' : 'text-red-700 bg-red-100'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Score banner */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h2 className="font-bold text-gray-900">Listening Test Complete</h2>
            </div>
            <p className="text-sm text-gray-500">Review the transcripts below to understand what you heard</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-extrabold px-4 py-2 rounded-xl ${scoreColor}`}>{result.score}%</div>
            <p className="text-xs text-gray-400 mt-1">{result.correctCount}/{result.totalCount} correct · {result.level}</p>
          </div>
        </div>

        {/* Transcript accordions */}
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-gray-800 text-sm">Audio Transcripts — Read & Learn</h3>
        </div>
        <div className="space-y-3 mb-6">
          {listeningParts.map((part, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenPart(openPart === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-blue-700 text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-sm">{part.title}</p>
                    <p className="text-xs text-gray-400">{part.questions.length} questions</p>
                  </div>
                </div>
                {openPart === i ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {openPart === i && part.transcript && (
                <div className="border-t border-gray-100 px-5 py-4">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3">Full Transcript</p>
                  <pre className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-sans bg-blue-50 rounded-xl p-4 border border-blue-100">
                    {part.transcript}
                  </pre>
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Correct Answers:</p>
                    {part.questions.map(q => (
                      <div key={q.id} className="flex items-start gap-2 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600"><strong>{q.question}</strong> → {q.options[q.correctIndex]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onContinue}
          className="w-full flex items-center justify-center gap-2 py-4 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 transition-colors shadow-lg text-sm"
        >
          View Your Full Results <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
