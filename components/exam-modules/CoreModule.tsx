'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ExamHeader from '@/components/ui/ExamHeader'
import ProgressBar from '@/components/ui/ProgressBar'
import { grammarQuestions, vocabularyQuestions } from '@/lib/mock-data/core-questions'
import { submitExamForEvaluation, buildExamId } from '@/lib/utils/webhook'
import type { CoreAnswers } from '@/lib/types'
import { CheckCircle, Loader2, Send } from 'lucide-react'

type Section = 'grammar' | 'vocabulary'
const CORE_SECONDS = 25 * 60

export default function CoreModule() {
  const router = useRouter()
  const [section, setSection] = useState<Section>('grammar')
  const [grammarIndex, setGrammarIndex] = useState(0)
  const [vocabIndex, setVocabIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [answers, setAnswers] = useState<CoreAnswers>({
    grammar: Object.fromEntries(grammarQuestions.map(q => [q.id, null])),
    vocabulary: Object.fromEntries(vocabularyQuestions.map(q => [q.id, null])),
  })

  const selectGrammar = (id: number, idx: number) =>
    setAnswers(prev => ({ ...prev, grammar: { ...prev.grammar, [id]: idx } }))

  const selectVocab = (id: number, idx: number) =>
    setAnswers(prev => ({ ...prev, vocabulary: { ...prev.vocabulary, [id]: idx } }))

  const answeredGrammar = Object.values(answers.grammar).filter(v => v !== null).length
  const answeredVocab = Object.values(answers.vocabulary).filter(v => v !== null).length

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    try {
      await submitExamForEvaluation({
        examId: buildExamId(),
        module: 'core',
        candidateName: 'Test Candidate',
        submittedAt: new Date().toISOString(),
        timeTaken: CORE_SECONDS,
        answers,
      })
    } catch { /* handled gracefully */ }
    setSubmitted(true)
    setTimeout(() => router.push('/results?module=core'), 2000)
  }, [answers, router])

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
          {submitting ? (
            <><Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">AI Evaluating...</h2></>
          ) : (
            <><CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Submitted!</h2></>
          )}
        </div>
      </div>
    )
  }

  const gq = grammarQuestions[grammarIndex]
  const vq = vocabularyQuestions[vocabIndex]

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamHeader
        title="Core Test — Grammar & Vocabulary"
        subtitle="Aptis B2"
        totalSeconds={CORE_SECONDS}
        onTimeExpire={handleSubmit}
      />

      <div className="max-w-3xl mx-auto px-4 pt-6">
        {/* Section toggle */}
        <div className="flex gap-2 mb-6">
          {(['grammar', 'vocabulary'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                section === s ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {s} ({s === 'grammar' ? `${answeredGrammar}/25` : `${answeredVocab}/25`})
            </button>
          ))}
        </div>

        <ProgressBar
          current={section === 'grammar' ? answeredGrammar : answeredVocab}
          total={25}
          label={`${section === 'grammar' ? 'Grammar' : 'Vocabulary'} progress`}
        />

        {/* Question navigator */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-6">
          {(section === 'grammar' ? grammarQuestions : vocabularyQuestions).map((q, i) => {
            const answered = section === 'grammar'
              ? answers.grammar[q.id] !== null
              : answers.vocabulary[q.id] !== null
            const current = section === 'grammar' ? grammarIndex : vocabIndex
            return (
              <button
                key={q.id}
                onClick={() => section === 'grammar' ? setGrammarIndex(i) : setVocabIndex(i)}
                className={`w-8 h-8 rounded-md text-xs font-semibold transition-colors ${
                  current === i
                    ? 'bg-blue-700 text-white'
                    : answered
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>

        {/* Question card */}
        {section === 'grammar' && (
          <QuestionCard
            key={`g-${gq.id}`}
            questionNumber={grammarIndex + 1}
            total={25}
            type="Grammar"
            question={gq.sentence}
            options={gq.options}
            selected={answers.grammar[gq.id]}
            onSelect={idx => {
              selectGrammar(gq.id, idx)
              if (grammarIndex < 24) setTimeout(() => setGrammarIndex(i => i + 1), 300)
            }}
            onPrev={() => setGrammarIndex(i => Math.max(0, i - 1))}
            onNext={() => setGrammarIndex(i => Math.min(24, i + 1))}
          />
        )}

        {section === 'vocabulary' && (
          <QuestionCard
            key={`v-${vq.id}`}
            questionNumber={vocabIndex + 1}
            total={25}
            type={`Vocabulary – ${vq.type}`}
            question={vq.question}
            options={vq.options}
            selected={answers.vocabulary[vq.id]}
            onSelect={idx => {
              selectVocab(vq.id, idx)
              if (vocabIndex < 24) setTimeout(() => setVocabIndex(i => i + 1), 300)
            }}
            onPrev={() => setVocabIndex(i => Math.max(0, i - 1))}
            onNext={() => setVocabIndex(i => Math.min(24, i + 1))}
          />
        )}

        {/* Submit */}
        <div className="flex justify-end mt-6 pb-8">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-60 text-sm shadow"
          >
            <Send className="w-4 h-4" />
            Submit Test ({answeredGrammar + answeredVocab}/50 answered)
          </button>
        </div>
      </div>
    </div>
  )
}

function QuestionCard({
  questionNumber,
  total,
  type,
  question,
  options,
  selected,
  onSelect,
  onPrev,
  onNext,
}: {
  questionNumber: number
  total: number
  type: string
  question: string
  options: readonly string[]
  selected: number | null
  onSelect: (i: number) => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide capitalize">{type}</span>
        <span className="text-xs text-gray-400">{questionNumber} / {total}</span>
      </div>
      <p className="text-gray-800 text-base mb-6 leading-relaxed">{question}</p>
      <div className="space-y-2.5">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
              selected === i
                ? 'bg-blue-700 border-blue-700 text-white font-medium'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            <span className="font-semibold mr-2 opacity-60">{String.fromCharCode(65 + i)}.</span>
            {opt}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrev}
          disabled={questionNumber === 1}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:border-blue-300 disabled:opacity-40"
        >
          ← Previous
        </button>
        <button
          onClick={onNext}
          disabled={questionNumber === total}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:border-blue-300 disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
