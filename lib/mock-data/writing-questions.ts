import type {
  WritingPart1Prompt,
  WritingPart2Prompt,
  WritingPart3Prompt,
  WritingPart4,
} from '@/lib/types'

export const writingDataSets = [
  {
    title: "Book Club Edition",
    part1Prompts: [
      {
        id: 1,
        context: "Your friend Sarah sends you a message about the book club meeting:",
        message: "Hi! Are you coming to the book club this Thursday? We're discussing 'The Kite Runner'. I think it's the best book we've read all year! Can you bring some snacks?",
      },
      {
        id: 2,
        context: "Sarah asks a follow-up question:",
        message: "Did you finish reading the book? What did you think of the ending? I cried so much! Also, should we invite Tom?",
      },
      {
        id: 3,
        context: "She asks about venue:",
        message: "Should we meet at the usual café or at my house this time? My place is bigger and we could watch the film adaptation afterwards.",
      },
      {
        id: 4,
        context: "She mentions a new book:",
        message: "For next month, the group has suggested 'Educated' by Tara Westover. Have you read it? Is it suitable for our level?",
      },
      {
        id: 5,
        context: "Final message about time:",
        message: "What time works best for everyone? Some people suggested 7pm but others prefer earlier. Can you let me know your preference?",
      },
    ] as WritingPart1Prompt[],

    part2Prompt: {
      scenario: "You are the coordinator of a reading club. A new member, James, has just joined and cannot attend the first session.",
      instruction: "Write a message to James explaining when and where the club meets, and what book you are currently reading.",
      minWords: 20,
      maxWords: 30,
    } as WritingPart2Prompt,

    part3Prompts: [
      {
        id: 1,
        question: "Do you think reading fiction is more beneficial than reading non-fiction? Why or why not?",
        minWords: 30,
        maxWords: 40,
      },
      {
        id: 2,
        question: "Some people prefer e-books while others prefer physical books. What do you prefer and why?",
        minWords: 30,
        maxWords: 40,
      },
      {
        id: 3,
        question: "How has a book you have read recently influenced your thinking or behaviour?",
        minWords: 30,
        maxWords: 40,
      },
    ] as WritingPart3Prompt[],

    part4: {
      informalPrompt: "Your friend Marco from Italy is visiting your city for the first time. He has asked you to recommend a good restaurant for dinner. Write a message to Marco recommending a restaurant and explaining what makes it special.",
      formalPrompt: "You recently attended a public library event about promoting reading in your community. You were impressed by the event but also noticed some areas for improvement. Write an email to the library director expressing your appreciation for the event and suggesting specific improvements for future events.",
      informalMin: 40,
      informalMax: 60,
      formalMin: 120,
      formalMax: 150,
    } as WritingPart4,
  },

  {
    title: "Travel Club Edition",
    part1Prompts: [
      {
        id: 1,
        context: "Your colleague Lisa sends you a message about the upcoming team trip:",
        message: "Hey! Have you booked your flights for the team trip to Lisbon? The company is covering accommodation but we need to sort out transport from the airport ourselves.",
      },
      {
        id: 2,
        context: "Lisa follows up:",
        message: "I found a great travel insurance deal online. Should we get group coverage? It would be cheaper. Also, do you know if David is joining us?",
      },
      {
        id: 3,
        context: "She asks about activities:",
        message: "I'm planning our itinerary. Would you prefer cultural activities like museums and historical sites, or would you rather have free time to explore on your own?",
      },
      {
        id: 4,
        context: "She asks about dietary needs:",
        message: "The hotel restaurant needs to know about any dietary requirements. Are you vegetarian or do you have any food allergies? The local cuisine is quite meat-heavy.",
      },
      {
        id: 5,
        context: "Last message about packing:",
        message: "The forecast says it might rain. Should we bring formal clothes for the conference dinner? How many days are we staying again?",
      },
    ] as WritingPart1Prompt[],

    part2Prompt: {
      scenario: "You work for a travel agency. A customer, Mrs Thompson, has enquired about holiday packages to Japan.",
      instruction: "Write a brief message to Mrs Thompson confirming receipt of her enquiry and letting her know you will send detailed options within two days.",
      minWords: 20,
      maxWords: 30,
    } as WritingPart2Prompt,

    part3Prompts: [
      {
        id: 1,
        question: "Do you think that travelling abroad is the best way to learn about other cultures? Give your opinion with reasons.",
        minWords: 30,
        maxWords: 40,
      },
      {
        id: 2,
        question: "Some people believe that budget airlines have made travel more accessible but at too great an environmental cost. Do you agree?",
        minWords: 30,
        maxWords: 40,
      },
      {
        id: 3,
        question: "Describe a journey that taught you something important about yourself or the world.",
        minWords: 30,
        maxWords: 40,
      },
    ] as WritingPart3Prompt[],

    part4: {
      informalPrompt: "Your friend Elena is planning a trip to your country and has asked you for advice about the best places to visit. Write a message to Elena recommending two places and explaining why you think she would enjoy them.",
      formalPrompt: "You recently travelled with an airline that significantly delayed your flight, causing you to miss an important business meeting. Despite this, some aspects of the service were excellent. Write a formal email to the airline's customer service department describing your experience, explaining the impact of the delay, and requesting appropriate compensation.",
      informalMin: 40,
      informalMax: 60,
      formalMin: 120,
      formalMax: 150,
    } as WritingPart4,
  },
]

export const currentWritingData = writingDataSets[0]
