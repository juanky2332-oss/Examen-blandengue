import type { ListeningPart } from '@/lib/types'

export const listeningParts: ListeningPart[] = [
  {
    partNumber: 1,
    title: "Short Exchanges",
    audioDescription: "You will hear five short conversations between two people. For each conversation, answer the question by selecting the correct option.",
    transcript: `Conversation 1
Man: "We need to find somewhere to discuss the Henderson report before the afternoon session."
Woman: "Well, the conference room's booked all morning. What about the café downstairs? It's usually quiet at this time."
Man: "Works for me. Shall we say eleven?"

Conversation 2
Woman: "Did you get the email about the Henshaw project?"
Man: "Yes, apparently the client has pushed the deadline back by two weeks. We've got more time than we thought."
Woman: "That's actually a relief. I was worried we weren't going to make it."

Conversation 3
Man: "Are you coming to the digital marketing workshop on Thursday?"
Woman: "I'd love to, but I've already committed to running the product launch meeting that morning. I simply can't be in two places at once."
Man: "Fair enough. I'll pass on the notes afterwards."

Conversation 4
Woman: "The quality issues keep coming up. Where do we even start?"
Man: "In my experience, the first step should be getting the supplier on the phone. Until we've spoken to them directly, we won't know if the problem is at their end or ours."

Conversation 5
Man: "So what do you think of the new open-plan office layout?"
Woman: "Honestly? I have my reservations. The noise levels are a real problem — it's hard to concentrate when there are conversations happening all around you all day."`,
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
    transcript: `Radio Presenter: "Today on Green Futures, we're speaking to three urban farming pioneers from across Europe.

Our first guest comes from Berlin, where she has transformed a series of disused car parks into thriving community gardens — complete with raised beds, composting facilities, and even beehives on the rooftops.

In London, our second speaker tells us about a remarkable project that supplies fresh vegetables exclusively to local food banks, providing nutritious produce to families who might otherwise go without. The garden produces over two tonnes of food per year.

Finally, a voice from Copenhagen shares the challenges facing urban farming — particularly the serious difficulties in securing long-term funding from both public and private sources. Our third guest describes how promising projects often collapse within their second or third year simply because the money runs out, despite initial enthusiasm.

The programme concludes that while passion and innovation are abundant in this sector, urban farming achieves its greatest and most lasting impact when it receives sustained, ongoing support from local councils and municipal governments."`,
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
    transcript: `Interviewer: "Today I'm speaking with Dr Sarah Chen, a psychologist who has spent the past decade researching workplace wellbeing. Dr Chen, what is the primary driver of burnout in modern workplaces?"

Dr Chen: "Well, contrary to what many people assume, it's not simply about working too many hours — though that certainly plays a role. The research consistently points to a lack of autonomy as the main culprit. When employees feel they have no control over their workload, their methods, or even their schedule, stress accumulates rapidly and systematically."

Interviewer: "The phrase 'quiet quitting' has become ubiquitous. Is this a new phenomenon?"

Dr Chen: "Not at all. The behaviour itself has always existed — employees doing exactly what their job description requires, nothing more. What's new is that we've given it a name. In previous decades, the same behaviour might have been called 'disengagement'. The label has changed; the underlying human experience has not."

Interviewer: "What do you recommend for managing workplace stress?"

Dr Chen: "The single most effective intervention I've observed is establishing clear, non-negotiable boundaries between work time and personal time. That means no checking emails after a certain hour, protecting weekends as genuinely work-free, and communicating those boundaries explicitly to management."

Interviewer: "Can you give an example of a company that has successfully improved employee wellbeing?"

Dr Chen: "Certainly. I worked with a technology startup that introduced a four-day working week as an experiment. What was remarkable was that productivity did not fall — in some teams it actually increased noticeably. The key finding was that people became far more focused and significantly less likely to waste time during the hours they were actually working."`,
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
    transcript: `Narrator: "The story of photography is really the story of how humanity learned to freeze time. The first successful permanent photograph was taken by Joseph Nicéphore Niépce in 1826, but it was the daguerreotype process, unveiled to the world in 1839, that truly launched photography as a practical medium. Suddenly, it was possible to capture a faithful image of reality in minutes rather than hours or days.

For decades, however, photography remained the domain of professionals and wealthy enthusiasts. The equipment was expensive, bulky, and required considerable technical knowledge to operate. That all changed with the introduction of the Kodak Brownie camera at the turn of the twentieth century. For the first time in history, ordinary people — not just trained professionals — could take their own photographs. The democratisation of photography had truly begun.

The digital revolution of the 1990s and early 2000s brought the next seismic shift. Many professional photographers initially feared that digital technology threatened their livelihoods, and some traditional studios did indeed close. But many others adapted, discovering new revenue streams in commercial photography, stock imagery, and digital retouching services.

Today, the greatest challenge confronting photographers — amateur and professional alike — is perhaps the most profound yet: how do we determine whether an image is actually authentic? With artificial intelligence now capable of generating photorealistic images from a simple text description, the line between the real and the fabricated has never been more difficult to identify. The photograph, once considered the most trustworthy witness to reality, must now carry an asterisk."`,
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
