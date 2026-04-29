'use client'

import Link from 'next/link'
import { studyPlan } from '@/lib/mock-data/study-plan'
import {
  BookOpen, Headphones, PenLine, Mic, Brain, Clock, ChevronRight,
  GraduationCap, Flame, ArrowRight, Target, Star, CheckCircle,
} from 'lucide-react'

const DAY_ONE = new Date('2026-04-29')

function getTodayDay(): number {
  const today = new Date(); today.setHours(0,0,0,0)
  const d1 = new Date(DAY_ONE); d1.setHours(0,0,0,0)
  return Math.min(Math.max(Math.floor((today.getTime()-d1.getTime())/86400000)+1, 1), 14)
}

const modules = [
  { id: 'core', label: 'Core', sub: 'Grammar & Vocab · 50Q', icon: Brain, color: 'from-violet-500 to-purple-600', text: 'text-violet-700', time: '25 min' },
  { id: 'reading', label: 'Reading', sub: '4 Parts', icon: BookOpen, color: 'from-blue-500 to-cyan-600', text: 'text-blue-700', time: '35 min' },
  { id: 'listening', label: 'Listening', sub: '4 Parts · 17Q', icon: Headphones, color: 'from-cyan-500 to-teal-600', text: 'text-cyan-700', time: '40 min' },
  { id: 'writing', label: 'Writing', sub: '4 Parts · AI Feedback', icon: PenLine, color: 'from-emerald-500 to-green-600', text: 'text-emerald-700', time: '50 min', badge: 'AI' },
  { id: 'speaking', label: 'Speaking', sub: '4 Parts', icon: Mic, color: 'from-rose-500 to-pink-600', text: 'text-rose-700', time: '12 min' },
]

export default function Dashboard() {
  const todayDay = getTodayDay()
  const todayPlan = studyPlan[todayDay - 1]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-blue-900 text-base leading-tight">Aptis B2 Simulator Pro</h1>
              <p className="text-xs text-blue-400">British Council Exam Preparation</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-lg">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold text-orange-700">Day {todayDay}/14</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* TODAY'S PLAN — Primary CTA */}
        <div className="mb-8">
          <Link
            href={`/plan/${todayDay}`}
            className="block bg-blue-700 rounded-2xl p-6 text-white hover:bg-blue-800 transition-all shadow-lg group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-amber-300" />
                  <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">Today&apos;s Plan — Day {todayDay}</span>
                </div>
                <h2 className="text-2xl font-extrabold mb-1">{todayPlan.title}</h2>
                <p className="text-blue-200 text-sm mb-3">{todayPlan.focus}</p>
                <div className="flex flex-wrap gap-2">
                  {['Grammar', 'Writing', 'Speaking', 'Strategy'].map(s => (
                    <span key={s} className="text-xs bg-blue-600 text-blue-100 px-2.5 py-1 rounded-full font-medium">{s}</span>
                  ))}
                  <span className="text-xs bg-blue-600 text-blue-100 px-2.5 py-1 rounded-full font-medium">
                    <Clock className="w-3 h-3 inline mr-1" />{todayPlan.totalMinutes} min
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white text-blue-700 px-5 py-3 rounded-xl font-bold text-sm shrink-0 group-hover:shadow-md transition-all">
                Start <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* 14-day progress bar */}
            <div className="mt-5 pt-4 border-t border-blue-600">
              <div className="flex justify-between text-xs text-blue-300 mb-1.5">
                <span>Progress to exam</span>
                <span>{todayDay}/14 days</span>
              </div>
              <div className="flex gap-1">
                {studyPlan.map(d => (
                  <div
                    key={d.day}
                    className={`flex-1 h-2 rounded-full ${
                      d.day < todayDay ? 'bg-green-400' : d.day === todayDay ? 'bg-amber-300' : 'bg-blue-600'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-blue-300 mt-1">
                <span>29 Apr</span>
                <span>12 May</span>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: modules */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" /> Full Practice Tests
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {modules.map(mod => (
                <Link
                  key={mod.id}
                  href={`/exam/${mod.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 overflow-hidden"
                >
                  <div className={`h-1 bg-gradient-to-r ${mod.color}`} />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${mod.color} rounded-xl flex items-center justify-center`}>
                        <mod.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        {'badge' in mod && mod.badge && (
                          <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.5 rounded">{mod.badge}</span>
                        )}
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />{mod.time}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">{mod.label}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{mod.sub}</p>
                    <div className={`flex items-center justify-between ${mod.text} font-semibold text-xs mt-3`}>
                      <span>Start timed exam</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}

              {/* All days link */}
              <Link
                href="/plan"
                className="group bg-gradient-to-br from-blue-700 to-indigo-700 rounded-2xl p-4 text-white hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-amber-300" />
                  <span className="font-bold text-sm">14-Day Plan</span>
                </div>
                <p className="text-blue-200 text-xs mb-3">Full study schedule with grammar, writing & speaking exercises</p>
                <div className="flex items-center justify-between text-white font-semibold text-xs">
                  <span>View all days</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="space-y-4">
            {/* Today's vocab */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" /> Today&apos;s Vocabulary
              </h3>
              <p className="text-xs text-gray-400 mb-3">{todayPlan.vocabulary.topic}</p>
              <div className="space-y-2">
                {todayPlan.vocabulary.words.slice(0, 3).map(w => (
                  <div key={w.word} className="border-l-2 border-amber-300 pl-3">
                    <p className="text-sm font-bold text-gray-800">{w.word}</p>
                    <p className="text-xs text-gray-500">{w.definition}</p>
                  </div>
                ))}
              </div>
              <Link href={`/plan/${todayDay}`} className="text-xs text-blue-600 font-medium mt-3 block hover:text-blue-800">
                See all 5 words + examples →
              </Link>
            </div>

            {/* Strategy tip */}
            <div className="bg-blue-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-200" /> Today&apos;s Exam Strategy
              </h3>
              <p className="text-blue-900 font-semibold text-xs mb-2">{todayPlan.strategy.title}</p>
              <p className="text-blue-100 text-xs leading-relaxed line-clamp-4">{todayPlan.strategy.content}</p>
              <Link href={`/plan/${todayDay}`} className="text-xs text-blue-200 font-medium mt-3 block hover:text-white">
                Read full strategy →
              </Link>
            </div>

            {/* Format reminder */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-800 text-sm mb-3">Exam Format Reminder</h3>
              <div className="space-y-2">
                {[
                  ['Core', '25 min', '50 questions'],
                  ['Reading', '35 min', '4 tasks'],
                  ['Listening', '40 min', '4 parts'],
                  ['Writing', '50 min', '4 parts'],
                  ['Speaking', '12 min', '4 parts'],
                ].map(([name, time, q]) => (
                  <div key={name} className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">{name}</span>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span>{time}</span>
                      <span className="text-gray-200">·</span>
                      <span>{q}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-green-700 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" /> Target: B2 in all 5 skills
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
