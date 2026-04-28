import type { ListeningPart } from '@/lib/types'

export const listeningParts: ListeningPart[] = [
  {
    partNumber: 1,
    title: "Short Exchanges",
    audioDescription: "You will hear five short conversations between two people. For each conversation, answer the question by selecting the correct option.",
    questions: [
      {
        id: 1,
        question: "Where does the woman suggest having the meeting?",
        options: ["The conference room", "The café downstairs", "Her office"],
        correctIndex: 1,
      },
      {
        id: 2,
        question: "What does the man say about the project deadline?",
        options: ["It has been extended", "It has been moved forward", "It remains unchanged"],
        correctIndex: 0,
      },
      {
        id: 3,
        question: "Why can't the woman attend the workshop?",
        options: ["She has a doctor's appointment", "She is travelling abroad", "She has another commitment"],
        correctIndex: 2,
      },
      {
        id: 4,
        question: "What does the man recommend doing first?",
        options: ["Contacting the supplier", "Reviewing the budget", "Speaking to the manager"],
        correctIndex: 0,
      },
      {
        id: 5,
        question: "How does the woman feel about the new office layout?",
        options: ["Very enthusiastic", "Somewhat concerned", "Completely indifferent"],
        correctIndex: 1,
      },
    ],
  },
  {
    partNumber: 2,
    title: "Identifying Information",
    audioDescription: "You will hear a radio programme about urban gardening projects across Europe. Listen and match the speakers to the information.",
    questions: [
      {
        id: 6,
        question: "The speaker describes a project that converts abandoned car parks into green spaces.",
        options: ["Speaker in Berlin", "Speaker in Amsterdam", "Speaker in Barcelona"],
        correctIndex: 0,
      },
      {
        id: 7,
        question: "Which project focuses specifically on growing food for local food banks?",
        options: ["The Rotterdam Rooftop Project", "The London Community Garden", "The Milan Green Corridor"],
        correctIndex: 1,
      },
      {
        id: 8,
        question: "Which speaker mentions funding difficulties as a major challenge?",
        options: ["First speaker", "Second speaker", "Third speaker"],
        correctIndex: 2,
      },
      {
        id: 9,
        question: "The programme concludes that urban farming is most successful when...",
        options: ["run by private companies", "supported by local government", "managed by volunteers alone"],
        correctIndex: 1,
      },
    ],
  },
  {
    partNumber: 3,
    title: "Extended Monologue – Interview",
    audioDescription: "You will hear an interview with Dr Sarah Chen, a psychologist specialising in workplace stress. Listen and answer the questions.",
    questions: [
      {
        id: 10,
        question: "According to Dr Chen, what is the primary cause of workplace burnout?",
        options: ["Working too many hours", "Lack of autonomy and control", "Difficult relationships with colleagues"],
        correctIndex: 1,
      },
      {
        id: 11,
        question: "What does Dr Chen say about 'quiet quitting'?",
        options: ["It is a new phenomenon unique to Generation Z", "It has always existed but has been recently named", "It is a sign of poor work ethic"],
        correctIndex: 1,
      },
      {
        id: 12,
        question: "Which strategy does Dr Chen recommend for managing stress?",
        options: ["Taking more annual leave", "Setting clear boundaries between work and personal time", "Changing jobs regularly"],
        correctIndex: 1,
      },
      {
        id: 13,
        question: "What example does Dr Chen give of a company that successfully improved employee wellbeing?",
        options: ["A tech startup that introduced a four-day week", "A law firm that banned after-hours emails", "A hospital that restructured shift patterns"],
        correctIndex: 0,
      },
    ],
  },
  {
    partNumber: 4,
    title: "Extended Monologue – Documentary",
    audioDescription: "You will hear part of a documentary about the history of photography. Listen and answer the questions.",
    questions: [
      {
        id: 14,
        question: "When was the daguerreotype process introduced, according to the narrator?",
        options: ["1826", "1839", "1851"],
        correctIndex: 1,
      },
      {
        id: 15,
        question: "What does the narrator say was revolutionary about the Kodak Brownie camera?",
        options: ["It was the first colour camera", "It made photography accessible to ordinary people", "It was small enough to fit in a pocket"],
        correctIndex: 1,
      },
      {
        id: 16,
        question: "According to the documentary, how did digital photography initially affect professional photographers?",
        options: ["It immediately improved their work quality", "It threatened their livelihoods", "It had no significant impact"],
        correctIndex: 1,
      },
      {
        id: 17,
        question: "What does the narrator suggest is the greatest challenge facing photography today?",
        options: ["The cost of equipment", "Distinguishing authentic images from AI-generated ones", "The decline in printed photographs"],
        correctIndex: 1,
      },
    ],
  },
]
