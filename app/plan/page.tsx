'use client'

import Link from 'next/link'
import { studyPlan } from '@/lib/mock-data/study-plan'
import { CheckCircle, Lock, Play, ArrowLeft, Target, Calendar, Flame } from 'lucide-react'

const DAY_ONE_DATE = new Date('2026-04-29')

function getDayStatus(day: number): 'completed' | 'today' | 'upcoming' {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dayDate = new Date(DAY_ONE_DATE)
  dayDate.setDate(DAY_ONE_DATE.getDate() + day - 1)
  dayDate.setHours(0, 0, 0, 0)
  const diff = Math.floor((today.getTime() - dayDate.getTime()) / 86400000)
  if (diff > 0) return 'completed'
  if (diff === 0) return 'today'
  return 'upcoming'
}

function getTodayDayNumber(): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.floor((today.getTime() - DAY_ONE_DATE.getTime()) / 86400000) + 1
  return Math.min(Math.max(diff, 1), 14)
}

export default function PlanPage() {
  const todayDay = getTodayDayNumber()
  const completedDays = studyPlan.filter((_, i) => getDayStatus(i + 1) === 'completed').length
  const daysLeft = 14 - completedDays

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-blue-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-bold text-blue-900 text-base leading-tight">14-Day Aptis B2 Plan</h1>
              <p className="text-xs text-blue-500">29 April — 12 May 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
            <Flame className="w-4 h-4 text-orange-500" />
            Day {todayDay} of 14
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress banner */}
        <div className="bg-blue-700 rounded-2xl p-6 text-white mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-1">Intensive B2 Preparation</h2>
              <p className="text-blue-200 text-sm">Grammar · Reading · Listening · Writing · Speaking · Strategy</p>
            </div>
            <div className="flex gap-6 text-center shrink-0">
              <div>
                <p className="text-3xl font-extrabold">{completedDays}</p>
                <p className="text-blue-200 text-xs">Days done</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-amber-300">{daysLeft}</p>
                <p className="text-blue-200 text-xs">Days left</p>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full bg-blue-600 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all"
              style={{ width: `${(completedDays / 14) * 100}%` }}
            />
          </div>
          <p className="text-blue-200 text-xs mt-1">{completedDays}/14 days completed</p>
        </div>

        {/* Today's plan highlight */}
        {todayDay <= 14 && (
          <Link
            href={`/plan/${todayDay}`}
            className="block bg-white border-2 border-blue-500 rounded-2xl p-5 mb-8 shadow-md hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wide">Today</span>
                  <span className="text-xs text-gray-400">Day {todayDay}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{studyPlan[todayDay - 1]?.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{studyPlan[todayDay - 1]?.focus}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                  <Target className="w-3.5 h-3.5" />
                  <span>{studyPlan[todayDay - 1]?.totalMinutes} min · Grammar + Writing + Speaking + Strategy</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white rounded-xl text-sm font-semibold group-hover:bg-blue-800 transition-colors shrink-0">
                <Play className="w-4 h-4" /> Start
              </div>
            </div>
          </Link>
        )}

        {/* Day grid */}
        <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" /> All 14 Days
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {studyPlan.map(day => {
            const status = getDayStatus(day.day)
            const isToday = status === 'today'
            const isDone = status === 'completed'
            const isLocked = status === 'upcoming'

            return (
              <Link
                key={day.day}
                href={isLocked ? '#' : `/plan/${day.day}`}
                className={`rounded-xl border p-4 transition-all flex items-start gap-4 ${
                  isToday
                    ? 'bg-blue-50 border-blue-400 shadow-sm'
                    : isDone
                    ? 'bg-white border-green-200 hover:border-green-400'
                    : 'bg-white border-gray-200 opacity-60 cursor-not-allowed'
                }`}
                onClick={isLocked ? e => e.preventDefault() : undefined}
              >
                {/* Day number */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${
                  isToday ? 'bg-blue-700 text-white' : isDone ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                }`}>
                  {isDone ? <CheckCircle className="w-5 h-5" /> : isLocked ? <Lock className="w-4 h-4" /> : day.day}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-400">{day.date}</span>
                    {isToday && <span className="text-xs font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">TODAY</span>}
                    {isDone && <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">DONE</span>}
                  </div>
                  <h3 className={`font-semibold text-sm mt-0.5 leading-tight ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
                    Day {day.day}: {day.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{day.focus}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <Target className="w-3 h-3" />
                    <span>{day.totalMinutes} min</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <h3 className="font-semibold text-amber-800 mb-2 text-sm">How to Use This Plan</h3>
          <ul className="space-y-1.5 text-sm text-amber-700">
            <li>→ Complete each day&apos;s exercises in order — grammar first, then writing, then speaking</li>
            <li>→ For speaking: say every answer OUT LOUD — silent reading is not speaking practice</li>
            <li>→ Write your formal emails in full and compare with the model answer honestly</li>
            <li>→ Use the Free Practice modules to run full timed simulations (Core, Reading, Writing)</li>
            <li>→ Come back every day — consistency beats cramming at B2 level</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
