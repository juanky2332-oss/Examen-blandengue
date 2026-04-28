export type ExamModule = 'core' | 'reading' | 'listening' | 'writing' | 'speaking'

// ─── CORE ───────────────────────────────────────────────────────────────────

export interface GrammarQuestion {
  id: number
  sentence: string
  options: [string, string, string]
  correctIndex: number
}

export interface VocabularyQuestion {
  id: number
  type: 'definition' | 'synonym' | 'context'
  question: string
  options: [string, string, string]
  correctIndex: number
}

export interface CoreAnswers {
  grammar: Record<number, number | null>
  vocabulary: Record<number, number | null>
}

// ─── READING ─────────────────────────────────────────────────────────────────

export interface ReadingPart1Question {
  id: number
  text: string // sentence with [BLANK]
  options: [string, string, string, string]
  correctIndex: number
}

export interface ReadingPart2Paragraph {
  id: number
  text: string
}

export interface ReadingPart3Person {
  name: string
  opinion: string
}

export interface ReadingPart3Statement {
  id: number
  text: string
  correctPerson: string
}

export interface ReadingPart4Paragraph {
  id: number
  text: string
  correctTitle: string
}

export interface ReadingAnswers {
  part1: Record<number, number | null>
  part2: number[] // ordered paragraph IDs
  part3: Record<number, string | null>
  part4: Record<number, string | null>
}

// ─── LISTENING ───────────────────────────────────────────────────────────────

export interface ListeningQuestion {
  id: number
  question: string
  options: [string, string, string]
  correctIndex: number
}

export interface ListeningPart {
  partNumber: number
  title: string
  audioDescription: string // mock description
  questions: ListeningQuestion[]
}

export interface ListeningAnswers {
  part1: Record<number, number | null>
  part2: Record<number, number | null>
  part3: Record<number, number | null>
  part4: Record<number, number | null>
}

// ─── WRITING ─────────────────────────────────────────────────────────────────

export interface WritingPart1Prompt {
  id: number
  message: string
  context: string
}

export interface WritingPart2Prompt {
  scenario: string
  instruction: string
  minWords: 20
  maxWords: 30
}

export interface WritingPart3Prompt {
  id: number
  question: string
  minWords: 30
  maxWords: 40
}

export interface WritingPart4 {
  informalPrompt: string
  formalPrompt: string
  informalMin: 40
  informalMax: 60
  formalMin: 120
  formalMax: 150
}

export interface WritingAnswers {
  part1: Record<number, string>
  part2: string
  part3: Record<number, string>
  part4Informal: string
  part4Formal: string
}

// ─── SPEAKING ────────────────────────────────────────────────────────────────

export interface SpeakingPart1 {
  questions: string[]
  timePerQuestion: number // seconds
}

export interface SpeakingPart2 {
  imageDescription: string
  imageUrl: string
  photoQuestion: string
  followUpQuestions: string[]
  timeSeconds: number
}

export interface SpeakingPart3 {
  imageAUrl: string
  imageBUrl: string
  imageADescription: string
  imageBDescription: string
  comparisonPrompt: string
  followUpQuestions: string[]
  timeSeconds: number
}

export interface SpeakingPart4 {
  imageUrl: string
  imageDescription: string
  questions: string[]
  timeSeconds: number
}

export interface SpeakingAnswers {
  part1: Record<number, 'recorded' | 'skipped' | null>
  part2: 'recorded' | 'skipped' | null
  part3: 'recorded' | 'skipped' | null
  part4: Record<number, 'recorded' | 'skipped' | null>
}

// ─── RESULTS ─────────────────────────────────────────────────────────────────

export interface WrongAnswer {
  questionId: number
  question: string
  yourAnswer: string
  correctAnswer: string
  explanation?: string
}

export interface ExamResult {
  module: ExamModule
  timestamp: string
  score: number
  level: string
  overallFeedback: string
  strengths: string[]
  improvements: string[]
  partScores?: Record<string, number>
  detailedFeedback?: Record<string, string>
  examinerTip?: string
  wrongAnswers?: WrongAnswer[]
  correctCount?: number
  totalCount?: number
}

// ─── WEBHOOK PAYLOAD ─────────────────────────────────────────────────────────

export interface ExamSubmission {
  examId: string
  module: ExamModule
  candidateName: string
  submittedAt: string
  timeTaken: number
  answers: CoreAnswers | ReadingAnswers | ListeningAnswers | WritingAnswers | SpeakingAnswers
}
