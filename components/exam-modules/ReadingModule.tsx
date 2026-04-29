'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ExamHeader from '@/components/ui/ExamHeader'
import {
  readingPart1Questions,
  readingPart2Paragraphs,
  readingPart3Persons,
  readingPart3Statements,
  readingPart4Paragraphs,
  readingPart4Titles,
} from '@/lib/mock-data/reading-questions'
import type { ReadingAnswers, ExamResult } from '@/lib/types'
import { CheckCircle, Loader2, Send, GripVertical } from 'lucide-react'

type Part = 1 | 2 | 3 | 4
const READING_SECONDS = 35 * 60
const CORRECT_PART2_ORDER = [1, 2, 3, 4, 5]

export default function ReadingModule() {
  const router = useRouter()
  const [currentPart, setCurrentPart] = useState<Part>(1)
  const [submitted, setSubmitted] = useState(false)

  const [answers, setAnswers] = useState<ReadingAnswers>({
    part1: Object.fromEntries(readingPart1Questions.map(q => [q.id, null])),
    part2: readingPart2Paragraphs.map(p => p.id),
    part3: Object.fromEntries(readingPart3Statements.map(s => [s.id, null])),
    part4: Object.fromEntries(readingPart4Paragraphs.map(p => [p.id, null])),
  })

  const handleSubmit = useCallback(() => {
    // Score Part 1
    const p1Correct = readingPart1Questions.filter(q => answers.part1[q.id] === q.correctIndex).length
    const p1Total = readingPart1Questions.length

    // Score Part 2 (order match)
    const p2Correct = answers.part2.filter((id, i) => id === CORRECT_PART2_ORDER[i]).length
    const p2Total = CORRECT_PART2_ORDER.length

    // Score Part 3
    const p3Correct = readingPart3Statements.filter(s => answers.part3[s.id] === s.correctPerson).length
    const p3Total = readingPart3Statements.length

    // Score Part 4
    const p4Correct = readingPart4Paragraphs.filter(p => answers.part4[p.id] === p.correctTitle).length
    const p4Total = readingPart4Paragraphs.length

    const total = p1Correct + p2Correct + p3Correct + p4Correct
    const maxTotal = p1Total + p2Total + p3Total + p4Total
    const score = Math.round((total / maxTotal) * 100)
    const level = score >= 80 ? 'B2+' : score >= 65 ? 'B2' : score >= 50 ? 'B1-B2' : 'B1'

    const wrongAnswers = [
      ...readingPart1Questions
        .filter(q => answers.part1[q.id] !== q.correctIndex)
        .map(q => ({
          questionId: q.id,
          question: q.text.replace('[BLANK]', '______'),
          yourAnswer: answers.part1[q.id] !== null ? q.options[answers.part1[q.id]!] : '(not answered)',
          correctAnswer: q.options[q.correctIndex],
        })),
      ...readingPart3Statements
        .filter(s => answers.part3[s.id] !== s.correctPerson)
        .map(s => ({
          questionId: s.id + 100,
          question: s.text,
          yourAnswer: answers.part3[s.id] ?? '(not answered)',
          correctAnswer: s.correctPerson,
        })),
      ...readingPart4Paragraphs
        .filter(p => answers.part4[p.id] !== p.correctTitle)
        .map(p => ({
          questionId: p.id + 200,
          question: p.text.slice(0, 80) + '...',
          yourAnswer: answers.part4[p.id] ?? '(not answered)',
          correctAnswer: p.correctTitle,
        })),
    ]

    const result: ExamResult = {
      module: 'reading',
      timestamp: new Date().toISOString(),
      score,
      level,
      overallFeedback: `You scored ${total}/${maxTotal} across all four reading parts (Part 1: ${p1Correct}/${p1Total} · Part 2: ${p2Correct}/${p2Total} · Part 3: ${p3Correct}/${p3Total} · Part 4: ${p4Correct}/${p4Total}). ${score >= 65 ? 'Good overall comprehension at B2 level.' : 'Focus on the weaker parts identified below.'}`,
      strengths: [
        p1Correct >= 5 ? 'Part 1: Strong sentence-level comprehension' : null,
        p2Correct >= 4 ? 'Part 2: Good understanding of text structure and narrative flow' : null,
        p3Correct >= 4 ? 'Part 3: Effective scanning for specific opinions' : null,
        p4Correct >= 3 ? 'Part 4: Good ability to match headings to paragraphs' : null,
      ].filter(Boolean) as string[],
      improvements: [
        p1Correct < 5 ? 'Part 1: Review word forms and collocations in context' : null,
        p2Correct < 4 ? 'Part 2: Practise identifying discourse markers that link paragraphs' : null,
        p3Correct < 4 ? 'Part 3: Slow down — re-read each opinion carefully before matching' : null,
        p4Correct < 3 ? 'Part 4: Focus on topic sentences; they usually indicate the heading' : null,
      ].filter(Boolean) as string[],
      partScores: {
        'Part 1': Math.round((p1Correct / p1Total) * 100),
        'Part 2': Math.round((p2Correct / p2Total) * 100),
        'Part 3': Math.round((p3Correct / p3Total) * 100),
        'Part 4': Math.round((p4Correct / p4Total) * 100),
      },
      wrongAnswers,
      correctCount: total,
      totalCount: maxTotal,
    }

    localStorage.setItem('aptis_result_reading', JSON.stringify(result))
    setSubmitted(true)
    setTimeout(() => router.push('/results?module=reading'), 400)
  }, [answers, router])

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="font-semibold text-gray-800">Scored! Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamHeader
        title="Reading Test"
        subtitle="Aptis B2 · 4 Parts · 35 min"
        totalSeconds={READING_SECONDS}
        onTimeExpire={handleSubmit}
        currentPart={currentPart}
        totalParts={4}
      />

      <div className="max-w-4xl mx-auto px-4 pt-6 pb-10">
        <div className="flex gap-2 mb-6 flex-wrap">
          {([1, 2, 3, 4] as Part[]).map(p => (
            <button key={p} onClick={() => setCurrentPart(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPart === p ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'}`}>
              Part {p}
            </button>
          ))}
        </div>

        {currentPart === 1 && <ReadingPart1 questions={readingPart1Questions} answers={answers.part1}
          onChange={id => idx => setAnswers(prev => ({ ...prev, part1: { ...prev.part1, [id]: idx } }))} />}
        {currentPart === 2 && <ReadingPart2 paragraphs={readingPart2Paragraphs} order={answers.part2}
          onReorder={order => setAnswers(prev => ({ ...prev, part2: order }))} />}
        {currentPart === 3 && <ReadingPart3 persons={readingPart3Persons} statements={readingPart3Statements}
          answers={answers.part3} onChange={id => person => setAnswers(prev => ({ ...prev, part3: { ...prev.part3, [id]: person } }))} />}
        {currentPart === 4 && <ReadingPart4 paragraphs={readingPart4Paragraphs} titles={readingPart4Titles}
          answers={answers.part4} onChange={id => title => setAnswers(prev => ({ ...prev, part4: { ...prev.part4, [id]: title } }))} />}

        <div className="flex justify-end mt-8">
          <button onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 text-sm shadow">
            <Send className="w-4 h-4" /> Submit & See Results
          </button>
        </div>
      </div>
    </div>
  )
}

function InstructionBox({ part, title, instruction }: { part: string; title: string; instruction: string }) {
  return (
    <div className="bg-blue-700 rounded-xl p-4 text-white mb-4">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">{part}</span>
        <h2 className="font-bold">{title}</h2>
      </div>
      <p className="text-blue-100 text-sm">{instruction}</p>
    </div>
  )
}

function ReadingPart1({ questions, answers, onChange }: {
  questions: typeof readingPart1Questions
  answers: Record<number, number | null>
  onChange: (id: number) => (idx: number) => void
}) {
  return (
    <div className="space-y-4">
      <InstructionBox part="Part 1" title="Sentence Completion" instruction="Choose the correct word to complete each sentence. These sentences are from emails, notices, or notes. Focus on grammar and collocation." />
      {questions.map(q => (
        <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-800 mb-3 font-medium leading-relaxed">
            {(() => {
              const parts = q.text.split('[BLANK]')
              return <>{parts[0]}<span className="inline-block px-2 border-b-2 border-blue-400 text-blue-500 font-bold mx-0.5">______</span>{parts[1]}</>
            })()}
          </p>
          <div className="flex flex-wrap gap-2">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => onChange(q.id)(i)}
                className={`px-4 py-2 rounded-lg text-sm border font-medium transition-colors ${answers[q.id] === i ? 'bg-blue-700 text-white border-blue-700' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ReadingPart2({ paragraphs, order, onReorder }: {
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
    <div className="space-y-3">
      <InstructionBox part="Part 2" title="Text Ordering" instruction="These paragraphs form a short story but they are in the wrong order. Use the ↑ ↓ arrows to arrange them so they make a logical, coherent narrative. Look for time references, pronouns, and linking words." />
      {order.map((pid, idx) => {
        const para = paragraphs.find(p => p.id === pid)!
        return (
          <div key={pid} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-3">
            <div className="flex flex-col gap-1 shrink-0 pt-0.5">
              <button onClick={() => idx > 0 && move(idx, idx - 1)} disabled={idx === 0}
                className="text-gray-400 hover:text-blue-600 disabled:opacity-20 text-xl leading-none font-bold">▲</button>
              <button onClick={() => idx < order.length - 1 && move(idx, idx + 1)} disabled={idx === order.length - 1}
                className="text-gray-400 hover:text-blue-600 disabled:opacity-20 text-xl leading-none font-bold">▼</button>
            </div>
            <div className="flex-1">
              <span className="inline-block text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mb-1">{idx + 1}</span>
              <p className="text-sm text-gray-700 leading-relaxed">{para.text}</p>
            </div>
            <GripVertical className="w-4 h-4 text-gray-200 shrink-0 mt-1" />
          </div>
        )
      })}
    </div>
  )
}

function ReadingPart3({ persons, statements, answers, onChange }: {
  persons: typeof readingPart3Persons
  statements: typeof readingPart3Statements
  answers: Record<number, string | null>
  onChange: (id: number) => (person: string) => void
}) {
  return (
    <div className="space-y-4">
      <InstructionBox part="Part 3" title="Matching Opinions to People" instruction="Read the four people's opinions on remote working. Then match each statement below to the correct person. A person may be matched more than once. Read carefully for paraphrased ideas." />
      <div className="grid md:grid-cols-2 gap-3 mb-4">
        {persons.map(p => (
          <div key={p.name} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="font-bold text-blue-700 mb-2 text-sm">{p.name}</p>
            <p className="text-sm text-gray-600 italic leading-relaxed">&ldquo;{p.opinion}&rdquo;</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {statements.map(s => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-800 mb-3 font-medium">{s.id}. {s.text}</p>
            <div className="flex flex-wrap gap-2">
              {persons.map(p => (
                <button key={p.name} onClick={() => onChange(s.id)(p.name)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${answers[s.id] === p.name ? 'bg-blue-700 text-white border-blue-700' : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400'}`}>
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

function ReadingPart4({ paragraphs, titles, answers, onChange }: {
  paragraphs: typeof readingPart4Paragraphs
  titles: string[]
  answers: Record<number, string | null>
  onChange: (id: number) => (title: string) => void
}) {
  return (
    <div className="space-y-4">
      <InstructionBox part="Part 4" title="Long Text — Heading Matching" instruction="Read each paragraph and choose the most appropriate heading from the list. One heading does not match any paragraph. Focus on the main idea of each paragraph, not individual details." />
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800 mb-2">
        <strong>Headings:</strong> {titles.join(' · ')}
      </div>
      {paragraphs.map(p => (
        <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-sm text-gray-700 mb-4 leading-relaxed">{p.text}</p>
          <div className="flex flex-wrap gap-2">
            {titles.map(t => (
              <button key={t} onClick={() => onChange(p.id)(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${answers[p.id] === t ? 'bg-blue-700 text-white border-blue-700' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-400'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
