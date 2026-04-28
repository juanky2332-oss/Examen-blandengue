import type { ExamSubmission } from '@/lib/types'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ?? 'https://paneln8n.transformaconia.com/webhook/aptis-evaluation'

export async function submitExamForEvaluation(submission: ExamSubmission): Promise<void> {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  })

  if (!response.ok) {
    throw new Error(`Webhook error: ${response.status} ${response.statusText}`)
  }
}

export function buildExamId(): string {
  return `APTIS-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}
