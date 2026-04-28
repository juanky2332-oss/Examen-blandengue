'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import ExamHeader from '@/components/ui/ExamHeader'
import ProgressBar from '@/components/ui/ProgressBar'
import { grammarQuestions, vocabularyQuestions } from '@/lib/mock-data/core-questions'
import type { CoreAnswers, ExamResult, WrongAnswer } from '@/lib/types'
import { CheckCircle, XCircle, Send, BookOpen, Brain } from 'lucide-react'

type Section = 'grammar' | 'vocabulary'
const CORE_SECONDS = 25 * 60

export default function CoreModule() {
  const router = useRouter()
  const [section, setSection] = useState<Section>('grammar')
  const [grammarIndex, setGrammarIndex] = useState(0)
  const [vocabIndex, setVocabIndex] = useState(0)
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

  const handleSubmit = useCallback(() => {
    const grammarWrong: WrongAnswer[] = grammarQuestions
      .filter(q => answers.grammar[q.id] !== q.correctIndex)
      .map(q => ({
        questionId: q.id,
        question: q.sentence,
        yourAnswer: answers.grammar[q.id] !== null ? q.options[answers.grammar[q.id]!] : '(not answered)',
        correctAnswer: q.options[q.correctIndex],
      }))

    const vocabWrong: WrongAnswer[] = vocabularyQuestions
      .filter(q => answers.vocabulary[q.id] !== q.correctIndex)
      .map(q => ({
        questionId: q.id + 100,
        question: q.question,
        yourAnswer: answers.vocabulary[q.id] !== null ? q.options[answers.vocabulary[q.id]!] : '(not answered)',
        correctAnswer: q.options[q.correctIndex],
      }))

    const grammarCorrect = grammarQuestions.filter(q => answers.grammar[q.id] === q.correctIndex).length
    const vocabCorrect = vocabularyQuestions.filter(q => answers.vocabulary[q.id] === q.correctIndex).length
    const total = grammarCorrect + vocabCorrect
    const score = Math.round((total / 50) * 100)
    const level = score >= 80 ? 'B2+' : score >= 65 ? 'B2' : score >= 50 ? 'B1-B2' : 'B1'

    const result: ExamResult = {
      module: 'core',
      timestamp: new Date().toISOString(),
      score,
      level,
      overallFeedback: `You answered ${total} out of 50 correctly (${grammarCorrect}/25 grammar, ${vocabCorrect}/25 vocabulary). ${
        score >= 65
          ? 'This is a solid B2 performance. Focus on the items you got wrong to push towards B2+.'
          : 'Review the grammar structures and vocabulary items marked below — these are your priority areas.'
      }`,
      strengths: grammarCorrect >= 18
        ? ['Strong grammar accuracy overall']
        : vocabCorrect >= 18
        ? ['Good vocabulary range']
        : ['Attempted all questions'],
      improvements: [
        grammarCorrect < 20 ? `Grammar: revise ${25 - grammarCorrect} incorrect items (see below)` : 'Grammar is strong — maintain accuracy under time pressure',
        vocabCorrect < 20 ? `Vocabulary: review ${25 - vocabCorrect} incorrect items (see below)` : 'Vocabulary is strong — practise collocation and register',
      ],
      partScores: { grammar: Math.round((grammarCorrect / 25) * 100), vocabulary: Math.round((vocabCorrect / 25) * 100) },
      wrongAnswers: [...grammarWrong, ...vocabWrong],
      correctCount: total,
      totalCount: 50,
    }

    localStorage.setItem('aptis_result_core', JSON.stringify(result))
    setSubmitted(true)
    setTimeout(() => router.push('/results?module=core'), 400)
  }, [answers, router])

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="font-semibold text-gray-800">Scored! Redirecting to results...</p>
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
        subtitle="Aptis B2 · 25 min"
        totalSeconds={CORE_SECONDS}
        onTimeExpire={handleSubmit}
      />

      <div className="max-w-3xl mx-auto px-4 pt-6 pb-10">
        {/* Section toggle */}
        <div className="flex gap-2 mb-5">
          {(['grammar', 'vocabulary'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
                section === s ? 'bg-blue-700 text-white shadow' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              {s === 'grammar' ? <BookOpen className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
              {s}
              <span className={`text-xs px-1.5 py-0.5 rounded-md ${section === s ? 'bg-blue-600 text-blue-100' : 'bg-gray-100 text-gray-500'}`}>
                {s === 'grammar' ? `${answeredGrammar}/25` : `${answeredVocab}/25`}
              </span>
            </button>
          ))}
        </div>

        <ProgressBar
          current={section === 'grammar' ? answeredGrammar : answeredVocab}
          total={25}
          label={`${section === 'grammar' ? 'Grammar' : 'Vocabulary'} progress`}
        />

        {/* Question navigator */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
          {(section === 'grammar' ? grammarQuestions : vocabularyQuestions).map((q, i) => {
            const answered = section === 'grammar' ? answers.grammar[q.id] !== null : answers.vocabulary[q.id] !== null
            const current = section === 'grammar' ? grammarIndex : vocabIndex
            return (
              <button
                key={q.id}
                onClick={() => section === 'grammar' ? setGrammarIndex(i) : setVocabIndex(i)}
                className={`w-8 h-8 rounded-md text-xs font-bold transition-colors ${
                  current === i ? 'bg-blue-700 text-white' : answered ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {i + 1}
              </button>
            )
          })}
        </div>

        {section === 'grammar' && (
          <QuestionCard
            key={`g-${gq.id}`}
            questionNumber={grammarIndex + 1}
            total={25}
            type="Grammar"
            typeDetail="Choose the grammatically correct option"
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
            type="Vocabulary"
            typeDetail={vq.type === 'definition' ? 'Choose the correct definition' : vq.type === 'synonym' ? 'Choose the closest synonym' : 'Choose the correct word in context'}
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

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            {answeredGrammar + answeredVocab} / 50 answered
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 text-sm shadow"
          >
            <Send className="w-4 h-4" /> Submit & See Results
          </button>
        </div>
      </div>
    </div>
  )
}

function QuestionCard({
  questionNumber, total, type, typeDetail, question, options, selected, onSelect, onPrev, onNext,
}: {
  questionNumber: number; total: number; type: string; typeDetail: string; question: string
  options: readonly string[]; selected: number | null
  onSelect: (i: number) => void; onPrev: () => void; onNext: () => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{type}</span>
          <span className="text-xs text-gray-400 ml-2">{typeDetail}</span>
        </div>
        <span className="text-xs text-gray-400 font-mono">{questionNumber} / {total}</span>
      </div>
      <p className="text-gray-800 text-base mb-5 leading-relaxed mt-3 font-medium">{question}</p>
      <div className="space-y-2.5">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${
              selected === i
                ? 'bg-blue-700 border-blue-700 text-white font-medium'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
              selected === i ? 'bg-white border-white text-blue-700' : 'border-gray-300 text-gray-400'
            }`}>
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-5">
        <button onClick={onPrev} disabled={questionNumber === 1} className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:border-blue-300 disabled:opacity-30 transition-colors">
          ← Prev
        </button>
        <button onClick={onNext} disabled={questionNumber === total} className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:border-blue-300 disabled:opacity-30 transition-colors">
          Next →
        </button>
      </div>
    </div>
  )
}

// ─── Results Review (shown inline if needed) ──────────────────────────────────

export function CoreResultReview({ wrongAnswers }: { wrongAnswers: WrongAnswer[] }) {
  return (
    <div className="space-y-3">
      {wrongAnswers.map(w => (
        <div key={w.questionId} className="bg-white rounded-xl border border-red-100 p-4">
          <p className="text-xs text-gray-500 mb-2 font-medium">{w.question}</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 rounded-lg px-3 py-1.5">
              <XCircle className="w-4 h-4 shrink-0" /> Your answer: <strong>{w.yourAnswer}</strong>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg px-3 py-1.5">
              <CheckCircle className="w-4 h-4 shrink-0" /> Correct: <strong>{w.correctAnswer}</strong>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
