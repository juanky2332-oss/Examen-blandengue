import type { SpeakingPart1, SpeakingPart2, SpeakingPart3, SpeakingPart4 } from '@/lib/types'

export const speakingPart1: SpeakingPart1 = {
  questions: [
    "Tell me about a hobby or activity you enjoy doing in your free time and explain why you find it fulfilling.",
    "Describe the area where you grew up. What did you like most about living there?",
    "What kind of work or studies are you currently involved in? What do you enjoy most about it?",
  ],
  timePerQuestion: 45,
}

export const speakingPart2: SpeakingPart2 = {
  imageDescription: "A modern open-plan office. Several employees work at desks with dual monitors. In the background, a small group holds an informal standing meeting near a whiteboard covered in diagrams. Floor-to-ceiling windows let in natural light. The atmosphere is collaborative and professional.",
  imageUrl: "/images/speaking/office-scene.jpg",
  photoQuestion: "Please describe what you can see in this photograph.",
  followUpQuestions: [
    "What do you think the people in this image are working on?",
    "Would you prefer to work in an environment like this? Why or why not?",
  ],
  timeSeconds: 45,
}

export const speakingPart3: SpeakingPart3 = {
  imageAUrl: "/images/speaking/city-commute.jpg",
  imageBUrl: "/images/speaking/remote-work.jpg",
  imageADescription: "A packed underground station during morning rush hour. Commuters stand shoulder to shoulder on a crowded platform. People look tired and stressed. Digital display boards show train delays.",
  imageBDescription: "A person working from a comfortable home office. They sit at a neat desk with a laptop, a plant nearby, and a cup of coffee. Natural light streams through a window. The atmosphere is calm and relaxed.",
  comparisonPrompt: "Compare these two images. What are the main differences between these two ways of working? Which lifestyle do you think suits most people better, and why?",
  followUpQuestions: [
    "How has technology changed the way people work in recent years?",
    "Do you think the traditional 9-to-5 working day will still exist in 20 years?",
  ],
  timeSeconds: 45,
}

export const speakingPart4: SpeakingPart4 = {
  imageUrl: "/images/speaking/climate-protest.jpg",
  imageDescription: "A large group of young people marching through a city centre. They hold colourful banners and signs with environmental slogans. Some wear face paint in green and blue. The march is peaceful and energetic. Television cameras are visible in the crowd.",
  questions: [
    "What issue do you think is being highlighted in this photograph?",
    "How important do you think it is for young people to be involved in environmental activism?",
    "What actions do you think governments should take to address climate change more effectively?",
  ],
  timeSeconds: 120,
}

// Model answers for self-assessment review
export const speakingModelAnswers = {
  part1: [
    "I've always been passionate about photography, particularly street photography. What I find most fulfilling is the way it challenges me to observe the world more carefully and capture fleeting moments that would otherwise be forgotten. It's also given me a completely new perspective on everyday life — I find beauty in ordinary things I would previously have walked past without noticing.",
    "I grew up in a small coastal town in the north of the country. What I loved most was the strong sense of community — everyone knew each other, which made it feel very safe and welcoming. The natural surroundings were stunning as well; we had rolling hills on one side and the sea on the other. What I miss most now that I live in the city is the slower pace of life.",
    "I'm currently working as a project coordinator for a communications agency. What I enjoy most is the problem-solving aspect — no two days are alike, and I often have to think on my feet when unexpected challenges arise. I also appreciate the collaborative environment; working closely with people from different departments means I'm constantly learning something new.",
  ],
  part2: "In this photograph I can see a busy, modern open-plan office. Several people are seated at their desks, apparently working on their computers, while a small group of colleagues seems to be having an informal standing meeting near a whiteboard in the background. The office is well-lit with large windows, which creates a professional yet pleasant atmosphere. As for whether I'd enjoy working in an environment like this — I think I would. I tend to be more productive when I'm around other people, and the informal interactions make collaboration much easier and more natural.",
  part3: "These two images present a very striking contrast between two different approaches to work. The first shows the reality of the daily commute — a crowded underground station during rush hour, which looks stressful and exhausting. The second, by contrast, shows someone working from home in what appears to be a calm, well-organised home office. In my view, the second lifestyle is preferable for most people because it offers a significantly better work-life balance and eliminates the stress of commuting. However, I do think some in-person contact is valuable for maintaining team cohesion, so an ideal arrangement would probably be a hybrid model — a few days in the office, the rest at home.",
  part4: [
    "This photograph shows what appears to be a large-scale climate demonstration taking place in a city centre. There's a crowd of mostly young people holding signs and banners, which suggests they're actively protesting about climate change or related environmental issues such as pollution or government inaction on emissions.",
    "I think it's absolutely crucial for young people to be engaged in environmental activism. After all, it's their generation that will experience the full consequences of the decisions being made today. They have both the motivation and the organisational tools to put real pressure on governments and corporations to act more responsibly. Demonstrations like this raise public awareness and send a clear message that inaction is no longer acceptable.",
    "I think governments need to move beyond voluntary commitments and implement legally binding, measurable policies. This should include massive investment in renewable energy infrastructure, a clear timeline for phasing out fossil fuels, and meaningful carbon pricing mechanisms. International cooperation is also essential — climate change is a global problem that no single country can solve alone.",
  ],
}

export const speakingKeyPhrases = {
  describing: [
    "In this photograph I can see...",
    "What immediately strikes me is...",
    "In the background / foreground...",
    "It appears to be... / It looks as if...",
    "The atmosphere seems...",
  ],
  comparing: [
    "These two images present a very contrasting...",
    "Whereas the first image shows..., the second depicts...",
    "The key difference between them is...",
    "Both images deal with the theme of...",
    "By contrast / On the other hand...",
  ],
  opinions: [
    "In my view / From my perspective...",
    "I'm firmly convinced that...",
    "I'd argue that...",
    "On balance, I think...",
    "Having said that...",
    "It's worth pointing out that...",
  ],
  elaborating: [
    "What's more / Furthermore...",
    "This is particularly relevant because...",
    "To give you an example...",
    "As a consequence / As a result...",
    "It's entirely logical that...",
    "After all...",
  ],
}
