'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ExamHeader from '@/components/ui/ExamHeader'
import WordCounter from '@/components/ui/WordCounter'
import { countWords, getWordCountStatus, getWordCountBorderColor } from '@/lib/utils/word-counter'
import { currentWritingData } from '@/lib/mock-data/writing-questions'
import type { WritingAnswers, ExamResult } from '@/lib/types'
import { Send, ChevronRight, ChevronLeft, CheckCircle, Loader2, Brain } from 'lucide-react'

type Part = 1 | 2 | 3 | 4
const WRITING_SECONDS = 50 * 60
const PARTS = ['Part 1', 'Part 2', 'Part 3', 'Part 4']

export default function WritingModule() {
  const router = useRouter()
  const { part1Prompts, part2Prompt, part3Prompts, part4 } = currentWritingData

  const [currentPart, setCurrentPart] = useState<Part>(1)
  const [status, setStatus] = useState<'idle' | 'evaluating' | 'done' | 'error'>('idle')
  const [evalMessage, setEvalMessage] = useState('')

  const [answers, setAnswers] = useState<WritingAnswers>({
    part1: { 1: '', 2: '', 3: '', 4: '', 5: '' },
    part2: '',
    part3: { 1: '', 2: '', 3: '' },
    part4Informal: '',
    part4Formal: '',
  })

  const updatePart1 = (id: number, val: string) =>
    setAnswers(prev => ({ ...prev, part1: { ...prev.part1, [id]: val } }))

  const updatePart3 = (id: number, val: string) =>
    setAnswers(prev => ({ ...prev, part3: { ...prev.part3, [id]: val } }))

  const handleSubmit = useCallback(async () => {
    setStatus('evaluating')
    setEvalMessage('Sending your writing to the AI examiner...')

    try {
      setEvalMessage('Analysing grammar, vocabulary and coherence...')
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, module: 'writing' }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()

      const result: ExamResult = {
        module: 'writing',
        timestamp: new Date().toISOString(),
        score: data.overallScore ?? 0,
        level: data.level ?? 'B2',
        overallFeedback: data.overallFeedback ?? '',
        strengths: data.strengths ?? [],
        improvements: data.improvements ?? [],
        partScores: data.partScores,
        detailedFeedback: data.detailedFeedback,
        examinerTip: data.examinerTip,
      }

      localStorage.setItem('aptis_result_writing', JSON.stringify(result))
      setStatus('done')
      setTimeout(() => router.push('/results?module=writing'), 1200)
    } catch {
      // Fallback: store a generic result so the page still renders
      const fallback: ExamResult = {
        module: 'writing',
        timestamp: new Date().toISOString(),
        score: 0,
        level: '—',
        overallFeedback: 'The AI evaluator could not be reached. Check your OPENAI_API_KEY environment variable.',
        strengths: [],
        improvements: ['Ensure OPENAI_API_KEY is set in .env.local'],
        examinerTip: 'Retry once the API key is configured.',
      }
      localStorage.setItem('aptis_result_writing', JSON.stringify(fallback))
      setStatus('error')
      setTimeout(() => router.push('/results?module=writing'), 2000)
    }
  }, [answers, router])

  const handleForceSubmit = useCallback(() => { handleSubmit() }, [handleSubmit])

  if (status === 'evaluating' || status === 'done' || status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-sm w-full">
          {status === 'done' ? (
            <><CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">Evaluation complete</h2>
            <p className="text-gray-500 text-sm">Redirecting to your results...</p></>
          ) : status === 'error' ? (
            <><Brain className="w-14 h-14 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-1">API not available</h2>
            <p className="text-gray-500 text-sm">Check OPENAI_API_KEY. Redirecting...</p></>
          ) : (
            <>
              <div className="relative mx-auto w-16 h-16 mb-5">
                <Loader2 className="w-16 h-16 text-blue-200 animate-spin" />
                <Brain className="w-7 h-7 text-blue-600 absolute inset-0 m-auto" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Examiner evaluating...</h2>
              <p className="text-gray-500 text-sm">{evalMessage}</p>
              <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full animate-pulse w-3/4" />
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamHeader
        title="Writing Test"
        subtitle={`Aptis B2 — ${currentWritingData.title}`}
        totalSeconds={WRITING_SECONDS}
        onTimeExpire={handleForceSubmit}
        currentPart={currentPart}
        totalParts={4}
      />

      <div className="max-w-4xl mx-auto px-4 pt-4 pb-10">
        {/* Part tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {PARTS.map((label, i) => (
            <button
              key={label}
              onClick={() => setCurrentPart((i + 1) as Part)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPart === i + 1
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {currentPart === 1 && (
          <Part1Section prompts={part1Prompts} answers={answers.part1} onChange={updatePart1} />
        )}
        {currentPart === 2 && (
          <Part2Section
            prompt={part2Prompt}
            value={answers.part2}
            onChange={val => setAnswers(prev => ({ ...prev, part2: val }))}
          />
        )}
        {currentPart === 3 && (
          <Part3Section prompts={part3Prompts} answers={answers.part3} onChange={updatePart3} />
        )}
        {currentPart === 4 && (
          <Part4Section
            part4={part4}
            informalValue={answers.part4Informal}
            formalValue={answers.part4Formal}
            onInformalChange={val => setAnswers(prev => ({ ...prev, part4Informal: val }))}
            onFormalChange={val => setAnswers(prev => ({ ...prev, part4Formal: val }))}
          />
        )}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentPart(p => (p > 1 ? (p - 1) as Part : p))}
            disabled={currentPart === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-blue-300 disabled:opacity-40 text-sm"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {currentPart < 4 ? (
            <button
              onClick={() => setCurrentPart(p => (p < 4 ? (p + 1) as Part : p))}
              className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm font-medium"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-semibold shadow"
            >
              <Brain className="w-4 h-4" />
              Submit for AI Evaluation
              <Send className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Part 1 ──────────────────────────────────────────────────────────────────

function Part1Section({
  prompts,
  answers,
  onChange,
}: {
  prompts: typeof currentWritingData.part1Prompts
  answers: Record<number, string>
  onChange: (id: number, val: string) => void
}) {
  return (
    <div className="space-y-4">
      <InstructionBox
        part="Part 1"
        title="Short Responses"
        instruction="Your friend has sent you several messages. Read each one and reply using 1–5 words only. This tests whether you can communicate essential information concisely."
      />
      {prompts.map(p => {
        const words = countWords(answers[p.id] ?? '')
        const isOver = words > 5
        return (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 font-medium">{p.context}</p>
            <blockquote className="bg-blue-50 rounded-lg p-3 mb-3 text-sm text-gray-800 border-l-4 border-blue-400 italic">
              &ldquo;{p.message}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={answers[p.id] ?? ''}
                onChange={e => onChange(p.id, e.target.value)}
                placeholder="Your reply (1–5 words)..."
                className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
                  isOver ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
              />
              <span className={`text-xs font-bold w-10 text-right ${isOver ? 'text-red-600' : words > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                {words}/5
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Part 2 ──────────────────────────────────────────────────────────────────

function Part2Section({
  prompt,
  value,
  onChange,
}: {
  prompt: typeof currentWritingData.part2Prompt
  value: string
  onChange: (val: string) => void
}) {
  const status = getWordCountStatus(countWords(value), prompt.minWords, prompt.maxWords)
  return (
    <div className="space-y-4">
      <InstructionBox
        part="Part 2"
        title="Short Message (20–30 words)"
        instruction="Write a short, clear message responding to a specific scenario. Focus on covering all key information within the word limit. Register should be semi-formal unless specified."
      />
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="mb-3">
          <span className="text-xs font-semibold text-gray-500 uppercase">Scenario</span>
          <p className="text-sm text-gray-700 mt-1 bg-gray-50 rounded-lg p-3">{prompt.scenario}</p>
        </div>
        <div className="mb-4">
          <span className="text-xs font-semibold text-gray-500 uppercase">Your task</span>
          <p className="text-sm text-gray-800 mt-1 font-medium">{prompt.instruction}</p>
        </div>
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
          placeholder="Write your message here..."
          className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors resize-none ${getWordCountBorderColor(status)}`}
        />
        <div className="mt-2 flex justify-end">
          <WordCounter text={value} min={prompt.minWords} max={prompt.maxWords} />
        </div>
      </div>
    </div>
  )
}

// ─── Part 3 ──────────────────────────────────────────────────────────────────

function Part3Section({
  prompts,
  answers,
  onChange,
}: {
  prompts: typeof currentWritingData.part3Prompts
  answers: Record<number, string>
  onChange: (id: number, val: string) => void
}) {
  return (
    <div className="space-y-5">
      <InstructionBox
        part="Part 3"
        title="Extended Answers (30–40 words each)"
        instruction="Answer each question with a developed, coherent response. Give your opinion with a reason or example. Aim for B2 vocabulary: linking phrases, hedging, and discourse markers."
      />
      {prompts.map(p => {
        const status = getWordCountStatus(countWords(answers[p.id] ?? ''), p.minWords, p.maxWords)
        return (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm font-semibold text-gray-800 mb-3">
              <span className="text-blue-600 mr-1">Q{p.id}.</span> {p.question}
            </p>
            <textarea
              value={answers[p.id] ?? ''}
              onChange={e => onChange(p.id, e.target.value)}
              rows={4}
              placeholder="Write your answer here..."
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors resize-none ${getWordCountBorderColor(status)}`}
            />
            <div className="mt-2 flex justify-end">
              <WordCounter text={answers[p.id] ?? ''} min={p.minWords} max={p.maxWords} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Part 4 ──────────────────────────────────────────────────────────────────

function Part4Section({
  part4,
  informalValue,
  formalValue,
  onInformalChange,
  onFormalChange,
}: {
  part4: typeof currentWritingData.part4
  informalValue: string
  formalValue: string
  onInformalChange: (val: string) => void
  onFormalChange: (val: string) => void
}) {
  const infStatus = getWordCountStatus(countWords(informalValue), part4.informalMin, part4.informalMax)
  const formalStatus = getWordCountStatus(countWords(formalValue), part4.formalMin, part4.formalMax)

  return (
    <div className="space-y-6">
      <InstructionBox
        part="Part 4"
        title="Emails — Informal + Formal"
        instruction="Write two emails: one informal (40–60 words) using a friendly, natural register, and one formal (120–150 words) using professional language, correct salutations, and a clear structure. This is the highest-weighted part."
      />

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">INFORMAL EMAIL</span>
          <span className="text-xs text-gray-400">40–60 words · friend / personal contact</span>
        </div>
        <p className="text-sm text-gray-700 mb-4 bg-gray-50 rounded-lg p-3 leading-relaxed">{part4.informalPrompt}</p>
        <div className="text-xs text-gray-400 mb-2 italic">Tip: Start with "Hi [name]," — use contractions, casual vocabulary, first names.</div>
        <textarea
          value={informalValue}
          onChange={e => onInformalChange(e.target.value)}
          rows={5}
          placeholder="Hi [name],&#10;&#10;..."
          className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors resize-none ${getWordCountBorderColor(infStatus)}`}
        />
        <div className="mt-2 flex justify-end">
          <WordCounter text={informalValue} min={part4.informalMin} max={part4.informalMax} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">FORMAL EMAIL</span>
          <span className="text-xs text-gray-400">120–150 words · professional / official</span>
        </div>
        <p className="text-sm text-gray-700 mb-4 bg-gray-50 rounded-lg p-3 leading-relaxed">{part4.formalPrompt}</p>
        <div className="text-xs text-gray-400 mb-2 italic">Tip: Start with "Dear Mr/Ms [surname]," — use formal vocabulary, no contractions, passive voice.</div>
        <textarea
          value={formalValue}
          onChange={e => onFormalChange(e.target.value)}
          rows={10}
          placeholder="Dear [Title Surname],&#10;&#10;I am writing to...&#10;&#10;Yours sincerely,&#10;[Your name]"
          className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors resize-none ${getWordCountBorderColor(formalStatus)}`}
        />
        <div className="mt-2 flex justify-end">
          <WordCounter text={formalValue} min={part4.formalMin} max={part4.formalMax} />
        </div>
      </div>
    </div>
  )
}

function InstructionBox({ part, title, instruction }: { part: string; title: string; instruction: string }) {
  return (
    <div className="bg-blue-700 rounded-xl p-4 text-white">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">{part}</span>
        <h2 className="font-bold text-base">{title}</h2>
      </div>
      <p className="text-blue-100 text-sm leading-relaxed">{instruction}</p>
    </div>
  )
}
