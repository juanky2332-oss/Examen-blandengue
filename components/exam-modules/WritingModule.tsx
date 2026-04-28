'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ExamHeader from '@/components/ui/ExamHeader'
import WordCounter from '@/components/ui/WordCounter'
import { countWords, getWordCountStatus, getWordCountBorderColor } from '@/lib/utils/word-counter'
import { currentWritingData } from '@/lib/mock-data/writing-questions'
import { submitExamForEvaluation, buildExamId } from '@/lib/utils/webhook'
import type { WritingAnswers } from '@/lib/types'
import { Send, ChevronRight, ChevronLeft, CheckCircle, Loader2 } from 'lucide-react'

type Part = 1 | 2 | 3 | 4

const WRITING_SECONDS = 50 * 60

const PARTS = ['Part 1', 'Part 2', 'Part 3', 'Part 4']

export default function WritingModule() {
  const router = useRouter()
  const { part1Prompts, part2Prompt, part3Prompts, part4 } = currentWritingData

  const [currentPart, setCurrentPart] = useState<Part>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [answers, setAnswers] = useState<WritingAnswers>({
    part1: { 1: '', 2: '', 3: '', 4: '', 5: '' },
    part2: '',
    part3: { 1: '', 2: '', 3: '' },
    part4Informal: '',
    part4Formal: '',
  })

  const updatePart1 = (id: number, val: string) => {
    const words = val.trim().split(/\s+/).filter(Boolean)
    if (words.length > 5 && val.endsWith(' ')) return
    setAnswers(prev => ({ ...prev, part1: { ...prev.part1, [id]: val } }))
  }

  const updatePart3 = (id: number, val: string) =>
    setAnswers(prev => ({ ...prev, part3: { ...prev.part3, [id]: val } }))

  const handleForceSubmit = useCallback(() => {
    handleSubmit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers])

  const handleSubmit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      await submitExamForEvaluation({
        examId: buildExamId(),
        module: 'writing',
        candidateName: 'Test Candidate',
        submittedAt: new Date().toISOString(),
        timeTaken: WRITING_SECONDS,
        answers,
      })
      setSubmitted(true)
      setTimeout(() => router.push('/results?module=writing'), 2000)
    } catch {
      setError('Could not connect to the evaluation server. Your answers have been saved locally.')
      setSubmitted(true)
      setTimeout(() => router.push('/results?module=writing'), 3000)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
          {submitting ? (
            <>
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Evaluating...</h2>
              <p className="text-gray-500 text-sm">Your writing is being analysed. Please wait.</p>
            </>
          ) : (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Submitted!</h2>
              <p className="text-gray-500 text-sm">{error ?? 'Redirecting to your results...'}</p>
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

      {/* Part tabs */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="flex gap-2 mb-6">
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
          <Part1
            prompts={part1Prompts}
            answers={answers.part1}
            onChange={updatePart1}
          />
        )}
        {currentPart === 2 && (
          <Part2
            prompt={part2Prompt}
            value={answers.part2}
            onChange={val => setAnswers(prev => ({ ...prev, part2: val }))}
          />
        )}
        {currentPart === 3 && (
          <Part3
            prompts={part3Prompts}
            answers={answers.part3}
            onChange={updatePart3}
          />
        )}
        {currentPart === 4 && (
          <Part4
            part4={part4}
            informalValue={answers.part4Informal}
            formalValue={answers.part4Formal}
            onInformalChange={val => setAnswers(prev => ({ ...prev, part4Informal: val }))}
            onFormalChange={val => setAnswers(prev => ({ ...prev, part4Formal: val }))}
          />
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pb-8">
          <button
            onClick={() => setCurrentPart(p => (p > 1 ? (p - 1) as Part : p))}
            disabled={currentPart === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
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
              disabled={submitting}
              className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium disabled:opacity-60"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Submit for AI Evaluation
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Part1({
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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <h2 className="font-semibold text-blue-900 mb-1">Part 1 – Short Responses</h2>
        <p className="text-blue-700 text-sm">
          Read each message and reply using <strong>1–5 words</strong> only.
        </p>
      </div>
      {prompts.map(p => {
        const words = countWords(answers[p.id] ?? '')
        const isOver = words > 5
        return (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{p.context}</p>
            <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm text-gray-700 italic border-l-4 border-blue-300">
              &ldquo;{p.message}&rdquo;
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={answers[p.id] ?? ''}
                onChange={e => onChange(p.id, e.target.value)}
                placeholder="Your reply (max 5 words)..."
                className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors ${
                  isOver ? 'border-red-400 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'
                }`}
              />
              <span className={`text-xs font-semibold w-12 text-right ${isOver ? 'text-red-600' : 'text-gray-400'}`}>
                {words}/5
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Part2({
  prompt,
  value,
  onChange,
}: {
  prompt: typeof currentWritingData.part2Prompt
  value: string
  onChange: (val: string) => void
}) {
  const status = getWordCountStatus(countWords(value), prompt.minWords, prompt.maxWords)
  const borderColor = getWordCountBorderColor(status)

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
        <h2 className="font-semibold text-blue-900 mb-1">Part 2 – Short Message</h2>
        <p className="text-blue-700 text-sm">Write between <strong>20–30 words</strong>.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 mb-1">Scenario</p>
          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{prompt.scenario}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Task</p>
          <p className="text-sm text-gray-800">{prompt.instruction}</p>
        </div>
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
          placeholder="Write your message here..."
          className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors resize-none ${borderColor}`}
        />
        <div className="mt-2 flex justify-end">
          <WordCounter text={value} min={prompt.minWords} max={prompt.maxWords} />
        </div>
      </div>
    </div>
  )
}

function Part3({
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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
        <h2 className="font-semibold text-blue-900 mb-1">Part 3 – Extended Responses</h2>
        <p className="text-blue-700 text-sm">Answer each question in <strong>30–40 words</strong>.</p>
      </div>
      {prompts.map(p => {
        const status = getWordCountStatus(countWords(answers[p.id] ?? ''), p.minWords, p.maxWords)
        const borderColor = getWordCountBorderColor(status)
        return (
          <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-800 mb-3">
              Question {p.id}: {p.question}
            </p>
            <textarea
              value={answers[p.id] ?? ''}
              onChange={e => onChange(p.id, e.target.value)}
              rows={4}
              placeholder="Write your answer here..."
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors resize-none ${borderColor}`}
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

function Part4({
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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h2 className="font-semibold text-blue-900 mb-1">Part 4 – Emails</h2>
        <p className="text-blue-700 text-sm">Write an informal email (40–60 words) and a formal email (120–150 words).</p>
      </div>

      {/* Informal */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded">Informal</span>
          <span className="text-xs text-gray-400">40–60 words</span>
        </div>
        <p className="text-sm text-gray-700 mb-4 bg-gray-50 rounded-lg p-3">{part4.informalPrompt}</p>
        <textarea
          value={informalValue}
          onChange={e => onInformalChange(e.target.value)}
          rows={5}
          placeholder="Write your informal email here..."
          className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors resize-none ${getWordCountBorderColor(infStatus)}`}
        />
        <div className="mt-2 flex justify-end">
          <WordCounter text={informalValue} min={part4.informalMin} max={part4.informalMax} />
        </div>
      </div>

      {/* Formal */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">Formal</span>
          <span className="text-xs text-gray-400">120–150 words</span>
        </div>
        <p className="text-sm text-gray-700 mb-4 bg-gray-50 rounded-lg p-3">{part4.formalPrompt}</p>
        <textarea
          value={formalValue}
          onChange={e => onFormalChange(e.target.value)}
          rows={10}
          placeholder="Write your formal email here..."
          className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-colors resize-none ${getWordCountBorderColor(formalStatus)}`}
        />
        <div className="mt-2 flex justify-end">
          <WordCounter text={formalValue} min={part4.formalMin} max={part4.formalMax} />
        </div>
      </div>
    </div>
  )
}
