'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { studyPlan } from '@/lib/mock-data/study-plan'
import {
  ArrowLeft, ArrowRight, BookOpen, PenLine, Mic, Target, Brain,
  CheckCircle, XCircle, Eye, EyeOff, ChevronDown, ChevronUp, Clock, Star,
} from 'lucide-react'

interface Props { params: Promise<{ day: string }> }

export default function DayPage({ params }: Props) {
  const { day: dayParam } = use(params)
  const dayNumber = parseInt(dayParam, 10)
  const plan = studyPlan.find(d => d.day === dayNumber)
  if (!plan) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky nav */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/plan" className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4" /> Study Plan
          </Link>
          <div className="text-center">
            <p className="font-bold text-blue-900 text-sm">Day {plan.day} of 14</p>
            <p className="text-xs text-gray-400">{plan.date}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            {plan.totalMinutes} min
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 pb-16">
        {/* Day title */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">{plan.title}</h1>
          <p className="text-sm text-gray-500">{plan.focus}</p>
        </div>

        {/* Vocabulary */}
        <VocabSection plan={plan} />

        {/* Grammar */}
        <GrammarSection plan={plan} />

        {/* Writing */}
        <WritingSection plan={plan} />

        {/* Speaking */}
        <SpeakingSection plan={plan} />

        {/* Strategy */}
        <StrategySection plan={plan} />

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          {dayNumber > 1 ? (
            <Link href={`/plan/${dayNumber - 1}`}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-blue-300 font-medium">
              <ArrowLeft className="w-4 h-4" /> Day {dayNumber - 1}
            </Link>
          ) : <div />}
          {dayNumber < 14 ? (
            <Link href={`/plan/${dayNumber + 1}`}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-semibold hover:bg-blue-800">
              Day {dayNumber + 1} <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700">
              <CheckCircle className="w-4 h-4" /> Plan Complete!
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}

// ─── Section header ──────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${color}`}>
      <Icon className="w-5 h-5" />
      <h2 className="font-bold text-base">{label}</h2>
    </div>
  )
}

// ─── Vocabulary ──────────────────────────────────────────────────────────────

function VocabSection({ plan }: { plan: typeof studyPlan[0] }) {
  const [open, setOpen] = useState(false)
  const { vocabulary } = plan
  return (
    <section className="mb-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-2 text-amber-700">
          <Star className="w-5 h-5 text-amber-500" />
          <h2 className="font-bold">Vocabulary — {vocabulary.topic}</h2>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && (
        <div className="border-t border-gray-100 px-5 py-4 space-y-3">
          {vocabulary.words.map(w => (
            <div key={w.word} className="bg-amber-50 rounded-xl p-3">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-amber-800">{w.word}</span>
                <span className="text-xs text-amber-600 italic">{w.definition}</span>
              </div>
              <p className="text-sm text-gray-600">&ldquo;{w.example}&rdquo;</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

// ─── Grammar Quiz ─────────────────────────────────────────────────────────────

function GrammarSection({ plan }: { plan: typeof studyPlan[0] }) {
  const [selected, setSelected] = useState<Record<number, number | null>>({})
  const [submitted, setSubmitted] = useState(false)
  const { grammar } = plan

  const score = grammar.questions.filter((q, i) => selected[i] === q.correctIndex).length

  return (
    <section className="mb-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <SectionHeader icon={Brain} label="Grammar Practice" color="text-violet-700" />
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-5">
          <p className="font-semibold text-violet-900 text-sm mb-1">Focus: {grammar.focus}</p>
          <p className="text-sm text-violet-700 leading-relaxed">{grammar.explanation}</p>
          <div className="mt-2 text-xs text-violet-600 font-medium bg-violet-100 rounded-lg px-3 py-1.5">
            💡 {grammar.tip}
          </div>
        </div>

        <div className="space-y-5">
          {grammar.questions.map((q, qi) => (
            <div key={qi} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
              <p className="text-sm font-medium text-gray-800 mb-3">
                <span className="text-violet-600 font-bold mr-1">{qi + 1}.</span> {q.sentence}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected[qi] === oi
                  const isCorrect = oi === q.correctIndex
                  let cls = 'bg-white border-gray-200 text-gray-700 hover:border-violet-400'
                  if (submitted) {
                    if (isCorrect) cls = 'bg-green-100 border-green-400 text-green-800 font-semibold'
                    else if (isSelected && !isCorrect) cls = 'bg-red-100 border-red-400 text-red-800'
                    else cls = 'bg-white border-gray-200 text-gray-400'
                  } else if (isSelected) {
                    cls = 'bg-violet-700 border-violet-700 text-white font-medium'
                  }
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => !submitted && setSelected(s => ({ ...s, [qi]: oi }))}
                      className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all flex items-center gap-3 ${cls}`}
                    >
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${
                        !submitted && isSelected ? 'border-white bg-white text-violet-700' : 'border-current'
                      }`}>
                        {String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                      {submitted && isCorrect && <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />}
                      {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600 ml-auto" />}
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <div className="mt-3 text-xs text-blue-700 bg-blue-50 rounded-lg px-3 py-2 leading-relaxed">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(selected).length < grammar.questions.length}
            className="mt-5 w-full py-3 bg-violet-700 text-white rounded-xl font-semibold text-sm hover:bg-violet-800 disabled:opacity-40 transition-colors"
          >
            Check Answers ({Object.keys(selected).length}/{grammar.questions.length} answered)
          </button>
        ) : (
          <div className={`mt-5 rounded-xl p-4 text-center font-bold ${score === grammar.questions.length ? 'bg-green-100 text-green-800' : score >= 3 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
            {score}/{grammar.questions.length} correct — {score === grammar.questions.length ? '🎯 Perfect! Excellent grammar accuracy.' : score >= 3 ? '✓ Good. Review the explanations above for the errors.' : '⚠ Review needed. Read the explanations carefully and retry tomorrow.'}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Writing ─────────────────────────────────────────────────────────────────

function WritingSection({ plan }: { plan: typeof studyPlan[0] }) {
  const [text, setText] = useState('')
  const [showTemplate, setShowTemplate] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const { writing } = plan
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <section className="mb-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <SectionHeader icon={PenLine} label={`Writing — ${writing.part}`} color="text-emerald-700" />

        <div className="bg-emerald-700 text-white rounded-xl p-4 mb-4">
          <p className="text-sm leading-relaxed">{writing.prompt}</p>
          <p className="text-emerald-200 text-xs mt-2 font-semibold">Word limit: {writing.wordLimit}</p>
        </div>

        {/* Template toggle */}
        <button
          onClick={() => setShowTemplate(o => !o)}
          className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-3 hover:text-blue-800"
        >
          {showTemplate ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showTemplate ? 'Hide template' : 'Show structure template'}
        </button>
        {showTemplate && (
          <pre className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-700 mb-3 whitespace-pre-wrap font-mono leading-relaxed">
            {writing.template}
          </pre>
        )}

        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={8}
          placeholder="Write your answer here..."
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 resize-none transition-colors"
        />
        <div className="flex items-center justify-between mt-2 mb-4">
          <span className={`text-xs font-semibold ${wordCount === 0 ? 'text-gray-400' : 'text-emerald-600'}`}>
            {wordCount} words
          </span>
          <span className="text-xs text-gray-400">Target: {writing.wordLimit}</span>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-xs text-amber-800 leading-relaxed">
          <strong>Examiner tip:</strong> {writing.examinertip}
        </div>

        {/* Model answer */}
        <button
          onClick={() => setShowModel(o => !o)}
          className="flex items-center gap-2 text-sm text-emerald-700 font-semibold hover:text-emerald-900"
        >
          {showModel ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showModel ? 'Hide model answer' : 'Show model answer (write yours first!)'}
        </button>
        {showModel && (
          <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="text-xs font-bold text-emerald-700 mb-2 uppercase tracking-wide">Model Answer</p>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">{writing.modelAnswer}</pre>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Speaking ────────────────────────────────────────────────────────────────

function SpeakingSection({ plan }: { plan: typeof studyPlan[0] }) {
  const [showPhrases, setShowPhrases] = useState(false)
  const [showModel, setShowModel] = useState(false)
  const [showMistakes, setShowMistakes] = useState(false)
  const { speaking } = plan

  return (
    <section className="mb-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <SectionHeader icon={Mic} label={`Speaking — ${speaking.part}`} color="text-rose-700" />

        <div className="bg-rose-700 text-white rounded-xl p-4 mb-4">
          <p className="text-sm leading-relaxed">{speaking.prompt}</p>
          <div className="flex gap-4 mt-3 text-xs text-rose-200">
            <span>⏱ Prep: {speaking.preparationTime}</span>
            <span>🎙 Response: {speaking.responseTime}</span>
          </div>
        </div>

        {/* Timer reminder */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-4 text-xs text-rose-800">
          <strong>Practice tip:</strong> Set a phone timer. Say your answer out loud — do NOT just read it in your head. Speaking practice must be spoken.
        </div>

        {/* Key phrases */}
        <button onClick={() => setShowPhrases(o => !o)} className="flex items-center gap-2 text-sm text-rose-700 font-medium mb-3 hover:text-rose-900">
          {showPhrases ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showPhrases ? 'Hide key phrases' : 'Show useful B2 phrases for this task'}
        </button>
        {showPhrases && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-3">
            <p className="text-xs font-bold text-rose-700 mb-2 uppercase tracking-wide">B2 Phrases to Use</p>
            <ul className="space-y-1.5">
              {speaking.keyPhrases.map((phrase, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-rose-400 shrink-0 font-bold">→</span> {phrase}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Model answer */}
        <button onClick={() => setShowModel(o => !o)} className="flex items-center gap-2 text-sm text-rose-700 font-semibold mb-3 hover:text-rose-900">
          {showModel ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showModel ? 'Hide model answer' : 'Show model answer (practise first!)'}
        </button>
        {showModel && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-3">
            <p className="text-xs font-bold text-rose-700 mb-2 uppercase tracking-wide">Model Answer (B2 Level)</p>
            <p className="text-sm text-gray-700 leading-relaxed">{speaking.modelAnswer}</p>
            <p className="text-xs text-rose-600 mt-2 font-medium">Read it once, then say it again in your OWN words — don't memorise, adapt.</p>
          </div>
        )}

        {/* Common mistakes */}
        <button onClick={() => setShowMistakes(o => !o)} className="flex items-center gap-2 text-sm text-amber-700 font-medium hover:text-amber-900">
          {showMistakes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showMistakes ? 'Hide common mistakes' : 'See common B1 mistakes to avoid'}
        </button>
        {showMistakes && (
          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wide">Common Mistakes</p>
            <ul className="space-y-2">
              {speaking.commonMistakes.map((m, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> {m}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Strategy ────────────────────────────────────────────────────────────────

function StrategySection({ plan }: { plan: typeof studyPlan[0] }) {
  const { strategy } = plan
  return (
    <section className="mb-6">
      <div className="bg-blue-700 rounded-2xl p-5 text-white">
        <SectionHeader icon={Target} label={`Strategy: ${strategy.title}`} color="text-blue-100" />
        <p className="text-blue-100 text-sm leading-relaxed mb-4">{strategy.content}</p>
        <div className="bg-blue-600 rounded-xl px-4 py-3">
          <p className="text-xs font-bold text-blue-200 uppercase tracking-wide mb-1">Key Takeaway</p>
          <p className="text-sm text-white leading-relaxed">{strategy.tip}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-600">
          <Link
            href="/exam/writing"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Practice this in the full Writing exam →
          </Link>
        </div>
      </div>
    </section>
  )
}
