'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ExamHeader from '@/components/ui/ExamHeader'
import { submitExamForEvaluation, buildExamId } from '@/lib/utils/webhook'
import {
  readingPart1Questions,
  readingPart2Paragraphs,
  readingPart3Persons,
  readingPart3Statements,
  readingPart4Paragraphs,
  readingPart4Titles,
} from '@/lib/mock-data/reading-questions'
import type { ReadingAnswers } from '@/lib/types'
import { CheckCircle, Loader2, Send, GripVertical } from 'lucide-react'

type Part = 1 | 2 | 3 | 4
const READING_SECONDS = 35 * 60

export default function ReadingModule() {
  const router = useRouter()
  const [currentPart, setCurrentPart] = useState<Part>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [answers, setAnswers] = useState<ReadingAnswers>({
    part1: Object.fromEntries(readingPart1Questions.map(q => [q.id, null])),
    part2: readingPart2Paragraphs.map(p => p.id),
    part3: Object.fromEntries(readingPart3Statements.map(s => [s.id, null])),
    part4: Object.fromEntries(readingPart4Paragraphs.map(p => [p.id, null])),
  })

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    try {
      await submitExamForEvaluation({
        examId: buildExamId(),
        module: 'reading',
        candidateName: 'Test Candidate',
        submittedAt: new Date().toISOString(),
        timeTaken: READING_SECONDS,
        answers,
      })
    } catch { /* handled gracefully */ }
    setSubmitted(true)
    setTimeout(() => router.push('/results?module=reading'), 2000)
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
        title="Reading Test"
        subtitle="Aptis B2 — 4 Parts"
        totalSeconds={READING_SECONDS}
        onTimeExpire={handleSubmit}
        currentPart={currentPart}
        totalParts={4}
      />

      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="flex gap-2 mb-6 flex-wrap">
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
          <ReadingPart1
            questions={readingPart1Questions}
            answers={answers.part1}
            onChange={id => idx => setAnswers(prev => ({ ...prev, part1: { ...prev.part1, [id]: idx } }))}
          />
        )}
        {currentPart === 2 && (
          <ReadingPart2
            paragraphs={readingPart2Paragraphs}
            order={answers.part2}
            onReorder={order => setAnswers(prev => ({ ...prev, part2: order }))}
          />
        )}
        {currentPart === 3 && (
          <ReadingPart3
            persons={readingPart3Persons}
            statements={readingPart3Statements}
            answers={answers.part3}
            onChange={id => person => setAnswers(prev => ({ ...prev, part3: { ...prev.part3, [id]: person } }))}
          />
        )}
        {currentPart === 4 && (
          <ReadingPart4
            paragraphs={readingPart4Paragraphs}
            titles={readingPart4Titles}
            answers={answers.part4}
            onChange={id => title => setAnswers(prev => ({ ...prev, part4: { ...prev.part4, [id]: title } }))}
          />
        )}

        <div className="flex justify-end mt-8 pb-8">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-60 text-sm shadow"
          >
            <Send className="w-4 h-4" /> Submit Test
          </button>
        </div>
      </div>
    </div>
  )
}

function ReadingPart1({
  questions,
  answers,
  onChange,
}: {
  questions: typeof readingPart1Questions
  answers: Record<number, number | null>
  onChange: (id: number) => (idx: number) => void
}) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
        <h2 className="font-semibold text-blue-900 mb-1">Part 1 – Sentence Completion</h2>
        <p className="text-blue-700 text-sm">Choose the correct word to complete each sentence.</p>
      </div>
      {questions.map(q => (
        <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-800 mb-3 font-medium">
            {q.text.replace('[BLANK]', '______')}
          </p>
          <div className="flex flex-wrap gap-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => onChange(q.id)(i)}
                className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                  answers[q.id] === i
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ReadingPart2({
  paragraphs,
  order,
  onReorder,
}: {
  paragraphs: typeof readingPart2Paragraphs
  order: number[]
  onReorder: (order: number[]) => void
}) {
  const move = (from: number, to: number) => {
    const next = [...order]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    onReorder(next)
  }

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
        <h2 className="font-semibold text-blue-900 mb-1">Part 2 – Text Ordering</h2>
        <p className="text-blue-700 text-sm">Use the ↑ ↓ buttons to arrange the paragraphs in the correct order to form a logical story.</p>
      </div>
      {order.map((pid, idx) => {
        const para = paragraphs.find(p => p.id === pid)!
        return (
          <div key={pid} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-3">
            <div className="flex flex-col gap-1 shrink-0 mt-0.5">
              <button
                onClick={() => idx > 0 && move(idx, idx - 1)}
                disabled={idx === 0}
                className="text-gray-400 hover:text-blue-600 disabled:opacity-30 text-lg leading-none"
              >▲</button>
              <button
                onClick={() => idx < order.length - 1 && move(idx, idx + 1)}
                disabled={idx === order.length - 1}
                className="text-gray-400 hover:text-blue-600 disabled:opacity-30 text-lg leading-none"
              >▼</button>
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mr-2">{idx + 1}</span>
              <span className="text-sm text-gray-700">{para.text}</span>
            </div>
            <GripVertical className="w-4 h-4 text-gray-300 shrink-0 mt-1" />
          </div>
        )
      })}
    </div>
  )
}

function ReadingPart3({
  persons,
  statements,
  answers,
  onChange,
}: {
  persons: typeof readingPart3Persons
  statements: typeof readingPart3Statements
  answers: Record<number, string | null>
  onChange: (id: number) => (person: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
        <h2 className="font-semibold text-blue-900 mb-1">Part 3 – Match Opinions to People</h2>
        <p className="text-blue-700 text-sm">Read the opinions below and match each statement to the correct person.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {persons.map(p => (
          <div key={p.name} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="font-semibold text-blue-700 mb-2">{p.name}</p>
            <p className="text-sm text-gray-600 italic">&ldquo;{p.opinion}&rdquo;</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {statements.map(s => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-800 mb-2">{s.id}. {s.text}</p>
            <div className="flex flex-wrap gap-2">
              {persons.map(p => (
                <button
                  key={p.name}
                  onClick={() => onChange(s.id)(p.name)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                    answers[s.id] === p.name
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReadingPart4({
  paragraphs,
  titles,
  answers,
  onChange,
}: {
  paragraphs: typeof readingPart4Paragraphs
  titles: string[]
  answers: Record<number, string | null>
  onChange: (id: number) => (title: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-2">
        <h2 className="font-semibold text-blue-900 mb-1">Part 4 – Long Text Comprehension</h2>
        <p className="text-blue-700 text-sm">Match each paragraph to the most appropriate heading from the list.</p>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800 mb-2">
        <strong>Headings:</strong> {titles.join(' · ')}
      </div>
      {paragraphs.map(p => (
        <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">{p.text}</p>
          <div className="flex flex-wrap gap-2">
            {titles.map(t => (
              <button
                key={t}
                onClick={() => onChange(p.id)(t)}
                className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                  answers[p.id] === t
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
