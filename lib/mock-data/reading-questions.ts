import type {
  ReadingPart1Question,
  ReadingPart2Paragraph,
  ReadingPart3Person,
  ReadingPart3Statement,
  ReadingPart4Paragraph,
} from '@/lib/types'

// correctIndex distributed across 0,1,2,3 — not all the same position
export const readingPart1Questions: ReadingPart1Question[] = [
  {
    id: 1,
    text: "Please [BLANK] your application form and submit it before the closing date.",
    options: ["completing", "complete", "completed", "completes"],
    correctIndex: 1, // modal verb + base infinitive
  },
  {
    id: 2,
    text: "The seminar has been [BLANK] due to low enrolment numbers.",
    options: ["cancelling", "cancelled", "cancel", "cancellation"],
    correctIndex: 1, // passive: has been + past participle
  },
  {
    id: 3,
    text: "All participants must [BLANK] a valid ID at the entrance.",
    options: ["shown", "showing", "shows", "show"],
    correctIndex: 3, // modal + bare infinitive
  },
  {
    id: 4,
    text: "The new policy will [BLANK] effect from the first of next month.",
    options: ["have", "make", "take", "put"],
    correctIndex: 2, // fixed phrase: take effect
  },
  {
    id: 5,
    text: "We would like to [BLANK] you for your continued support of our organisation.",
    options: ["thanks", "thankful", "thank", "thanking"],
    correctIndex: 2, // would like to + bare infinitive
  },
  {
    id: 6,
    text: "Please [BLANK] to our newsletter to receive the latest updates.",
    options: ["subscription", "subscribed", "subscribing", "subscribe"],
    correctIndex: 3, // imperative form
  },
  {
    id: 7,
    text: "The annual conference will [BLANK] place in Edinburgh this year.",
    options: ["hold", "have", "take", "make"],
    correctIndex: 2, // fixed phrase: take place
  },
]

export const readingPart2Paragraphs: ReadingPart2Paragraph[] = [
  {
    id: 1,
    text: "Maria had always dreamed of opening her own bakery. After years of working in corporate finance, she finally decided to take the leap and pursue her passion.",
  },
  {
    id: 2,
    text: "The first challenge was finding a suitable location. She spent months visiting different neighbourhoods before discovering a charming space in the old town district.",
  },
  {
    id: 3,
    text: "Next came the renovation. The building required extensive structural work, and Maria personally supervised every detail to ensure the décor matched her vision perfectly.",
  },
  {
    id: 4,
    text: "Once the bakery opened, word spread quickly through the community. Locals were drawn in by the aroma of freshly baked bread and the warm atmosphere Maria had created.",
  },
  {
    id: 5,
    text: "Within six months, 'Maria's Artisan Bakery' had become a beloved community institution, winning a regional award for the best patisserie in the county.",
  },
]

export const readingPart3Persons: ReadingPart3Person[] = [
  {
    name: "Alice",
    opinion: "Remote working has fundamentally transformed our relationship with the office. Employees no longer need to be physically present to be productive, and companies that resist this change will struggle to attract talented people in a competitive market.",
  },
  {
    name: "Ben",
    opinion: "While remote work offers flexibility, I think it comes at a significant cost to team cohesion. The informal conversations and spontaneous collaboration you get in an office are simply impossible to replicate online, however good the technology becomes.",
  },
  {
    name: "Carol",
    opinion: "The key is balance. A hybrid model that combines the best of both worlds seems to be what most workers actually want. Neither extreme — fully remote nor fully in-office — suits everyone, and a one-size-fits-all approach is counterproductive.",
  },
  {
    name: "David",
    opinion: "From an environmental perspective, reducing commuting has had an undeniably positive impact on emissions. Companies should embrace remote work as part of their sustainability commitments, not merely as an employee benefit or a cost-cutting measure.",
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
    text: "This person believes that neither extreme approach is ideal for workers.",
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
    text: "This person links remote work to corporate social and environmental responsibility.",
    correctPerson: "David",
  },
]

export const readingPart4Paragraphs: ReadingPart4Paragraph[] = [
  {
    id: 1,
    text: "Artificial intelligence is no longer a futuristic concept confined to science fiction. Today, AI systems are being deployed in hospitals to detect cancer in medical scans with accuracy that rivals experienced radiologists. These tools analyse thousands of images in minutes, identifying subtle patterns that human eyes might miss. However, medical professionals stress that AI remains a tool to assist, not replace, human judgement.",
    correctTitle: "AI in Healthcare: Promise and Caution",
  },
  {
    id: 2,
    text: "The fashion industry is undergoing a radical transformation, driven largely by consumer demand for transparency and sustainability. Brands are under growing pressure to disclose their supply chains, reduce water usage, and eliminate harmful chemicals from manufacturing processes. Several luxury brands have already announced binding pledges to become carbon neutral by 2030, recognising that environmental responsibility is no longer optional.",
    correctTitle: "Fashion's Green Revolution",
  },
  {
    id: 3,
    text: "Urban farming — growing food in cities rather than on traditional rural farmland — is gaining popularity worldwide. From rooftop gardens in New York to vertical farms in Singapore, innovative entrepreneurs are finding ways to produce fresh, local food with a fraction of the land and water required by conventional agriculture. Critics, however, question whether urban farming can ever produce food at the scale needed to feed large urban populations.",
    correctTitle: "Growing Food in the City",
  },
  {
    id: 4,
    text: "Languages are disappearing at an alarming rate. Linguists estimate that half of the world's roughly 7,000 languages could become extinct by the end of this century. When a language dies, it takes with it unique ways of understanding the world, accumulated cultural knowledge, and oral traditions passed down over generations. Efforts to document and revitalise endangered languages are now considered a matter of genuine cultural urgency.",
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
