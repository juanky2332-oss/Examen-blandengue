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
  imageDescription: "A busy open-plan office with several employees working at desks. Some people are having a standing meeting near a whiteboard. Natural light comes through large windows.",
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
  imageADescription: "A crowded underground station with commuters during rush hour.",
  imageBDescription: "A person working comfortably from a home office with a cup of coffee.",
  comparisonPrompt: "Compare these two images and say which lifestyle you think is better and why.",
  followUpQuestions: [
    "How has technology changed the way people work in recent years?",
    "Do you think the traditional 9-to-5 working day will still exist in 20 years?",
  ],
  timeSeconds: 45,
}

export const speakingPart4: SpeakingPart4 = {
  imageUrl: "/images/speaking/climate-protest.jpg",
  imageDescription: "A large group of young people participating in a climate change demonstration in a city centre, holding signs and banners.",
  questions: [
    "What issue do you think is being highlighted in this photograph?",
    "How important do you think it is for young people to be involved in environmental activism?",
    "What actions do you think governments should take to address climate change more effectively?",
  ],
  timeSeconds: 120,
}
