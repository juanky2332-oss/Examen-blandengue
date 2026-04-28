import { notFound } from 'next/navigation'
import CoreModule from '@/components/exam-modules/CoreModule'
import ReadingModule from '@/components/exam-modules/ReadingModule'
import ListeningModule from '@/components/exam-modules/ListeningModule'
import WritingModule from '@/components/exam-modules/WritingModule'
import SpeakingModule from '@/components/exam-modules/SpeakingModule'
import type { ExamModule } from '@/lib/types'

const VALID_MODULES: ExamModule[] = ['core', 'reading', 'listening', 'writing', 'speaking']

interface Props {
  params: Promise<{ module: string }>
}

export default async function ExamPage({ params }: Props) {
  const { module } = await params

  if (!VALID_MODULES.includes(module as ExamModule)) {
    notFound()
  }

  const mod = module as ExamModule

  return (
    <>
      {mod === 'core' && <CoreModule />}
      {mod === 'reading' && <ReadingModule />}
      {mod === 'listening' && <ListeningModule />}
      {mod === 'writing' && <WritingModule />}
      {mod === 'speaking' && <SpeakingModule />}
    </>
  )
}

export function generateStaticParams() {
  return VALID_MODULES.map(m => ({ module: m }))
}
