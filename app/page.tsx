'use client'

import Link from 'next/link'
import {
  BookOpen,
  Headphones,
  PenLine,
  Mic,
  Brain,
  Clock,
  ChevronRight,
  Trophy,
  BarChart3,
  GraduationCap,
} from 'lucide-react'

const modules = [
  {
    id: 'core',
    label: 'Core',
    sublabel: 'Grammar & Vocabulary',
    icon: Brain,
    time: '25 min',
    questions: '50 questions',
    color: 'from-violet-500 to-purple-600',
    textColor: 'text-violet-700',
    description: 'Test your grammar accuracy and vocabulary range with multiple-choice questions at B2 level.',
    parts: ['25 Grammar questions', '25 Vocabulary questions'],
  },
  {
    id: 'reading',
    label: 'Reading',
    sublabel: '4 Parts',
    icon: BookOpen,
    time: '35 min',
    questions: '4 tasks',
    color: 'from-blue-500 to-cyan-600',
    textColor: 'text-blue-700',
    description: 'Demonstrate your reading comprehension through sentence completion, text ordering, and opinion matching.',
    parts: ['Sentence completion', 'Text ordering', 'Matching opinions', 'Long text comprehension'],
  },
  {
    id: 'listening',
    label: 'Listening',
    sublabel: '4 Parts',
    icon: Headphones,
    time: '40 min',
    questions: '17 questions',
    color: 'from-cyan-500 to-teal-600',
    textColor: 'text-cyan-700',
    description: 'Understand short exchanges, radio programmes, interviews, and documentaries.',
    parts: ['Short exchanges', 'Information identification', 'Interview monologue', 'Documentary extract'],
  },
  {
    id: 'writing',
    label: 'Writing',
    sublabel: '4 Parts',
    icon: PenLine,
    time: '50 min',
    questions: '4 tasks',
    color: 'from-emerald-500 to-green-600',
    textColor: 'text-emerald-700',
    description: 'Produce written responses from single words to a 150-word formal email. AI-powered feedback.',
    parts: ['1–5 word responses', '20–30 word message', '30–40 word answers', 'Informal & formal emails'],
    badge: 'AI Feedback',
  },
  {
    id: 'speaking',
    label: 'Speaking',
    sublabel: '4 Parts',
    icon: Mic,
    time: '12 min',
    questions: '4 tasks',
    color: 'from-rose-500 to-pink-600',
    textColor: 'text-rose-700',
    description: 'Practise speaking about personal topics, describing photos, comparing images, and discussing ideas.',
    parts: ['Personal questions', 'Photo description', 'Image comparison', 'Extended discussion'],
  },
]

const stats = [
  { label: 'Practice Tests', value: '12', icon: Trophy },
  { label: 'Questions Answered', value: '348', icon: BarChart3 },
  { label: 'Hours Studied', value: '6.5', icon: Clock },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-blue-900 text-base leading-tight">Aptis B2 Simulator Pro</h1>
              <p className="text-xs text-blue-500">British Council Exam Preparation</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
            B2 Level Training
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Aptis Preparation Centre</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Practise all five skills with timed simulations, real exam formats, and AI-powered writing feedback.
            Choose a module below to begin.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
              <s.icon className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map(mod => (
            <Link
              key={mod.id}
              href={`/exam/${mod.id}`}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden"
            >
              <div className={`h-1.5 bg-gradient-to-r ${mod.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${mod.color} rounded-xl flex items-center justify-center shadow-sm`}>
                    <mod.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {'badge' in mod && mod.badge && (
                      <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                        {mod.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{mod.time}</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-0.5">{mod.label}</h3>
                <p className="text-xs font-medium text-gray-400 mb-3">{mod.sublabel} · {mod.questions}</p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{mod.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {mod.parts.map(p => (
                    <li key={p} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${mod.color} shrink-0`} />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className={`flex items-center justify-between ${mod.textColor} font-medium text-sm`}>
                  <span>Start Practice</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-blue-700 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Exam Format Tip</h3>
              <p className="text-blue-100 text-sm max-w-lg">
                In the official Aptis exam, Core is always taken first. Writing is evaluated against CEFR descriptors.
                Use this simulator to build familiarity with every task type under timed conditions.
              </p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-3xl font-bold">B2</p>
              <p className="text-blue-200 text-xs">Target Level</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
