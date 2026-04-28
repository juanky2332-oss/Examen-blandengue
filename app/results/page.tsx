'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { CheckCircle, ArrowLeft, BarChart3, Lightbulb, Star } from 'lucide-react'

const mockResults: Record<string, {
  score: number
  level: string
  feedback: string
  strengths: string[]
  improvements: string[]
}> = {
  writing: {
    score: 72,
    level: 'B2',
    feedback: 'Your writing demonstrates a good command of B2-level English. You use a range of vocabulary and grammatical structures, and your responses are generally coherent and well-organised. The formal email shows awareness of register, though some phrases could be more idiomatic.',
    strengths: [
      'Appropriate register maintained throughout',
      'Good range of vocabulary for B2 level',
      'Clear topic sentences in extended responses',
      'Correct use of cohesive devices',
    ],
    improvements: [
      'Part 4 formal email could include more formal linking phrases',
      'Some sentences in Part 3 exceeded the word limit',
      'More variety in sentence structure would enhance the formal email',
    ],
  },
  core: {
    score: 68,
    level: 'B2',
    feedback: 'Your grammar and vocabulary scores indicate a solid B2 foundation. You performed well on complex grammar structures including conditionals and passive voice. Some vocabulary items at the higher B2 range posed difficulties.',
    strengths: [
      'Strong performance on conditionals and inversion',
      'Good command of passive constructions',
      'Vocabulary in context: above average',
    ],
    improvements: [
      'Subjunctive forms need more practice',
      'Advanced vocabulary (academic register) requires attention',
    ],
  },
  reading: {
    score: 75,
    level: 'B2+',
    feedback: 'An excellent reading performance. You demonstrated strong skimming and scanning skills across all four task types. Your ability to understand implied meaning in Part 3 was particularly impressive.',
    strengths: [
      'Excellent text ordering (Part 2) — full marks',
      'Strong comprehension of opinion and attitude',
      'Accurate understanding of long text structure',
    ],
    improvements: [
      'Part 1 sentence completion: check preposition + verb collocations',
    ],
  },
  listening: {
    score: 65,
    level: 'B1/B2',
    feedback: 'Your listening comprehension is at a transitional B1/B2 level. You performed well on shorter exchanges but found the extended monologue sections more challenging.',
    strengths: [
      'Good performance on short exchanges (Part 1)',
      'Able to identify key information in Part 2',
    ],
    improvements: [
      'Extended monologues require more practice with note-taking',
      'Focus on paraphrasing — answers are often worded differently from the audio',
      'Practise listening to academic and documentary-style content',
    ],
  },
  speaking: {
    score: 70,
    level: 'B2',
    feedback: 'Your speaking responses show a good ability to communicate ideas at B2 level. You engaged with all task types and demonstrated range in your vocabulary choices.',
    strengths: [
      'Natural delivery on personal questions (Part 1)',
      'Good comparative language in Part 3',
      'Relevant and developed answers throughout',
    ],
    improvements: [
      'Part 4 extended responses could include more complex sentences',
      'Practise discourse markers to improve fluency and coherence',
    ],
  },
}

function ResultsContent() {
  const params = useSearchParams()
  const module = (params.get('module') ?? 'writing') as keyof typeof mockResults
  const result = mockResults[module] ?? mockResults.writing

  const scoreColor = result.score >= 70 ? 'text-green-600' : result.score >= 55 ? 'text-amber-600' : 'text-red-600'
  const scoreRing = result.score >= 70 ? 'ring-green-300' : result.score >= 55 ? 'ring-amber-300' : 'ring-red-300'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Score card */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1 capitalize">{module} — AI Evaluation</h1>
          <p className="text-gray-500 text-sm mb-6">Aptis B2 Simulator Pro · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ring-8 ${scoreRing} bg-white mb-4`}>
            <div>
              <p className={`text-4xl font-bold ${scoreColor}`}>{result.score}</p>
              <p className="text-xs text-gray-400">/ 100</p>
            </div>
          </div>

          <div className="inline-block bg-blue-100 text-blue-800 font-bold text-lg px-6 py-2 rounded-full mb-4">
            {result.level}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed max-w-lg mx-auto">{result.feedback}</p>
        </div>

        {/* Strengths */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-500" />
            <h2 className="font-semibold text-gray-800">Strengths</h2>
          </div>
          <ul className="space-y-2">
            {result.strengths.map(s => (
              <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Improvements */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-blue-500" />
            <h2 className="font-semibold text-gray-800">Areas for Improvement</h2>
          </div>
          <ul className="space-y-2">
            {result.improvements.map(s => (
              <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-400 mt-0.5 shrink-0">→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          <Link
            href={`/exam/${module}`}
            className="flex-1 text-center py-3 bg-blue-700 text-white rounded-xl font-medium text-sm hover:bg-blue-800 transition-colors"
          >
            Retry This Module
          </Link>
          <Link
            href="/"
            className="flex-1 text-center py-3 border border-blue-200 text-blue-700 rounded-xl font-medium text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
          >
            <BarChart3 className="w-4 h-4" /> All Modules
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading results...</p></div>}>
      <ResultsContent />
    </Suspense>
  )
}
