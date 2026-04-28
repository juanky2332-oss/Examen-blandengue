'use client'

import { useEffect, useState, useCallback } from 'react'
import { Clock, AlertTriangle } from 'lucide-react'

interface TimerProps {
  totalSeconds: number
  onExpire: () => void
  className?: string
}

export default function Timer({ totalSeconds, onExpire, className = '' }: TimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds)
  const isWarning = remaining <= 300 // last 5 min
  const isCritical = remaining <= 60

  const handleExpire = useCallback(() => {
    onExpire()
  }, [onExpire])

  useEffect(() => {
    if (remaining <= 0) {
      handleExpire()
      return
    }
    const id = setInterval(() => setRemaining(s => s - 1), 1000)
    return () => clearInterval(id)
  }, [remaining, handleExpire])

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-semibold text-sm transition-colors ${
        isCritical
          ? 'bg-red-100 text-red-700 animate-pulse'
          : isWarning
          ? 'bg-amber-100 text-amber-700'
          : 'bg-blue-50 text-blue-700'
      } ${className}`}
    >
      {isCritical ? (
        <AlertTriangle className="w-4 h-4" />
      ) : (
        <Clock className="w-4 h-4" />
      )}
      <span>{formatted}</span>
    </div>
  )
}
