import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import type { WritingAnswers } from '@/lib/types'
import { currentWritingData } from '@/lib/mock-data/writing-questions'

export async function POST(request: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const body = await request.json()
  const { answers } = body as { answers: WritingAnswers }

  const { part1Prompts, part2Prompt, part3Prompts, part4 } = currentWritingData

  const part1Block = part1Prompts
    .map(p => `  Message ${p.id}: "${p.message}"\n  Reply: "${answers.part1[p.id] ?? '(no answer)'}"`)
    .join('\n')

  const part3Block = part3Prompts
    .map(p => `  Q${p.id}: "${p.question}"\n  Answer (${p.minWords}-${p.maxWords} words): "${answers.part3[p.id] ?? '(no answer)'}"`)
    .join('\n\n')

  const prompt = `You are a certified CEFR Aptis B2 examiner. Evaluate the following Writing test.

APTIS B2 WRITING CRITERIA:
- Task Achievement: correct word counts, appropriate register, all parts answered
- Coherence & Cohesion: logical organisation, correct linking devices
- Lexical Resource: varied, accurate, B2-level vocabulary
- Grammatical Range & Accuracy: variety of structures, accuracy

--- CANDIDATE RESPONSES ---

PART 1 – Short replies (max 5 words each):
${part1Block}

PART 2 – Short message (20-30 words) for: "${part2Prompt.scenario}"
"${answers.part2 ?? '(no answer)'}"

PART 3 – Extended answers (30-40 words each):
${part3Block}

PART 4 – Informal email (40-60 words) for: "${part4.informalPrompt.slice(0, 120)}..."
"${answers.part4Informal ?? '(no answer)'}"

PART 4 – Formal email (120-150 words) for: "${part4.formalPrompt.slice(0, 120)}..."
"${answers.part4Formal ?? '(no answer)'}"

--- OUTPUT INSTRUCTIONS ---
Respond ONLY with valid JSON. Be critical and honest. Use British English. Do not invent content the candidate didn't write.

{
  "overallScore": <integer 0-100>,
  "level": "<one of: A1, A2, B1, B1-B2, B2, B2-C1, C1>",
  "overallFeedback": "<honest 2-3 sentence summary of performance>",
  "strengths": ["<specific strength with quote from text>", "<strength 2>", "<strength 3>"],
  "improvements": ["<specific error or weakness with quote and correction>", "<improvement 2>", "<improvement 3>"],
  "partScores": {
    "part1": <0-100>,
    "part2": <0-100>,
    "part3": <0-100>,
    "part4Informal": <0-100>,
    "part4Formal": <0-100>
  },
  "detailedFeedback": {
    "part1": "<one sentence>",
    "part2": "<one sentence>",
    "part3": "<one sentence>",
    "part4": "<one sentence>"
  },
  "examinerTip": "<one actionable tip the candidate should practise before the real exam>"
}`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    })

    const raw = completion.choices[0].message.content ?? '{}'
    const result = JSON.parse(raw)
    return NextResponse.json(result)
  } catch (err) {
    console.error('OpenAI evaluate error:', err)
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 })
  }
}
