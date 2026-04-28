import type {
  ReadingPart1Question,
  ReadingPart2Paragraph,
  ReadingPart3Person,
  ReadingPart3Statement,
  ReadingPart4Paragraph,
} from '@/lib/types'

export const readingPart1Questions: ReadingPart1Question[] = [
  {
    id: 1,
    text: "Please [BLANK] your application form and submit it before the closing date.",
    options: ["complete", "completing", "completed", "completes"],
    correctIndex: 0,
  },
  {
    id: 2,
    text: "The seminar has been [BLANK] due to low enrolment numbers.",
    options: ["cancelled", "cancelling", "cancel", "cancellation"],
    correctIndex: 0,
  },
  {
    id: 3,
    text: "All participants must [BLANK] a valid ID at the entrance.",
    options: ["show", "shown", "showing", "shows"],
    correctIndex: 0,
  },
  {
    id: 4,
    text: "The new policy will [BLANK] effect from the first of next month.",
    options: ["take", "have", "make", "put"],
    correctIndex: 0,
  },
  {
    id: 5,
    text: "We would like to [BLANK] you for your continued support of our organisation.",
    options: ["thank", "thanks", "thanking", "thankful"],
    correctIndex: 0,
  },
  {
    id: 6,
    text: "Please [BLANK] to our newsletter to receive the latest updates.",
    options: ["subscribe", "subscription", "subscribed", "subscribing"],
    correctIndex: 0,
  },
  {
    id: 7,
    text: "The annual conference will [BLANK] place in Edinburgh this year.",
    options: ["take", "have", "make", "hold"],
    correctIndex: 0,
  },
]

export const readingPart2Paragraphs: ReadingPart2Paragraph[] = [
  {
    id: 1,
    text: "Maria had always dreamed of opening her own bakery. After years of working in corporate finance, she finally decided to take the leap.",
  },
  {
    id: 2,
    text: "The first challenge was finding a suitable location. She spent months visiting different neighbourhoods before discovering a charming space in the old town.",
  },
  {
    id: 3,
    text: "Next came the renovation. The building required extensive work, and Maria personally supervised every detail to ensure the décor matched her vision.",
  },
  {
    id: 4,
    text: "Once the bakery opened, word spread quickly. Locals were drawn in by the smell of freshly baked bread and the warm atmosphere Maria had created.",
  },
  {
    id: 5,
    text: "Within six months, 'Maria's Artisan Bakery' had become a beloved community institution, winning a regional award for the best patisserie in the county.",
  },
]

export const readingPart3Persons: ReadingPart3Person[] = [
  {
    name: "Alice",
    opinion: "I believe that remote working has transformed our relationship with the office. Employees no longer need to be physically present to be productive, and companies that resist this change will struggle to attract talent.",
  },
  {
    name: "Ben",
    opinion: "While remote work offers flexibility, I think it comes at a significant cost to team cohesion. The informal conversations and spontaneous collaboration you get in an office are impossible to replicate online.",
  },
  {
    name: "Carol",
    opinion: "The key is balance. A hybrid model that combines the best of both worlds seems to be what most workers actually want. Neither extreme — fully remote nor fully in-office — suits everyone.",
  },
  {
    name: "David",
    opinion: "From an environmental perspective, reducing commuting has had an undeniably positive impact. Companies should embrace remote work as part of their sustainability commitments, not just as an employee benefit.",
  },
]

export const readingPart3Statements: ReadingPart3Statement[] = [
  {
    id: 1,
    text: "This person emphasises the environmental advantages of working from home.",
    correctPerson: "David",
  },
  {
    id: 2,
    text: "This person believes that neither extreme approach is ideal.",
    correctPerson: "Carol",
  },
  {
    id: 3,
    text: "This person argues that workplace interactions cannot be replicated virtually.",
    correctPerson: "Ben",
  },
  {
    id: 4,
    text: "This person suggests that companies unwilling to adapt will face recruitment difficulties.",
    correctPerson: "Alice",
  },
  {
    id: 5,
    text: "This person thinks that a combination of home and office working is preferable.",
    correctPerson: "Carol",
  },
  {
    id: 6,
    text: "This person links remote work to corporate social responsibility.",
    correctPerson: "David",
  },
]

export const readingPart4Paragraphs: ReadingPart4Paragraph[] = [
  {
    id: 1,
    text: "Artificial intelligence is no longer a futuristic concept confined to science fiction. Today, AI systems are being used in hospitals to detect cancer in medical scans with greater accuracy than experienced radiologists. These tools analyse thousands of images in minutes, identifying subtle patterns that human eyes might miss. However, medical professionals stress that AI is a tool to assist, not replace, human judgement.",
    correctTitle: "AI in Healthcare: Promise and Caution",
  },
  {
    id: 2,
    text: "The fashion industry is undergoing a radical transformation, driven largely by consumer demand for transparency and sustainability. Brands are increasingly under pressure to disclose their supply chains, reduce water usage, and eliminate harmful chemicals from their manufacturing processes. Several luxury brands have already announced pledges to become carbon neutral by 2030.",
    correctTitle: "Fashion's Green Revolution",
  },
  {
    id: 3,
    text: "Urban farming — growing food in cities rather than on traditional rural farmland — is gaining popularity worldwide. From rooftop gardens in New York to vertical farms in Singapore, innovative entrepreneurs are finding ways to produce fresh, local food with a fraction of the land and water required by conventional agriculture. Critics, however, question whether urban farming can ever produce food at the scale required to feed large populations.",
    correctTitle: "Growing Food in the City",
  },
  {
    id: 4,
    text: "Languages are disappearing at an alarming rate. Linguists estimate that half of the world's 7,000 languages could become extinct by the end of this century. When a language dies, it takes with it unique ways of understanding the world, cultural knowledge, and oral traditions accumulated over generations. Efforts to document and revitalise endangered languages are now considered a matter of cultural urgency.",
    correctTitle: "The Crisis of Dying Languages",
  },
]

export const readingPart4Titles = [
  "AI in Healthcare: Promise and Caution",
  "Fashion's Green Revolution",
  "Growing Food in the City",
  "The Crisis of Dying Languages",
  "The Future of Urban Transport",
]
