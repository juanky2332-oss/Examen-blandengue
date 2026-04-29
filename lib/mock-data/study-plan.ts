export interface GrammarExercise {
  focus: string
  explanation: string
  tip: string
  questions: Array<{
    sentence: string
    options: [string, string, string]
    correctIndex: number
    explanation: string
  }>
}

export interface WritingExercise {
  part: string
  prompt: string
  wordLimit: string
  template: string
  modelAnswer: string
  examinertip: string
}

export interface SpeakingExercise {
  part: string
  prompt: string
  preparationTime: string
  responseTime: string
  keyPhrases: string[]
  modelAnswer: string
  commonMistakes: string[]
}

export interface StrategyCard {
  title: string
  content: string
  tip: string
}

export interface VocabularySet {
  topic: string
  words: Array<{ word: string; definition: string; example: string }>
}

export interface DayPlan {
  day: number
  date: string
  title: string
  focus: string
  totalMinutes: number
  grammar: GrammarExercise
  writing: WritingExercise
  speaking: SpeakingExercise
  strategy: StrategyCard
  vocabulary: VocabularySet
}

export const studyPlan: DayPlan[] = [
  {
    day: 1,
    date: '29 April',
    title: 'Diagnostic & Grammar Foundation',
    focus: 'Tenses · Conditionals · Self-assessment',
    totalMinutes: 120,
    vocabulary: {
      topic: 'Workplace & Professional Life',
      words: [
        { word: 'meticulous', definition: 'showing great attention to detail', example: 'She was meticulous in her preparation for the exam.' },
        { word: 'collaborate', definition: 'to work jointly with others', example: 'The teams collaborated to finish the project on time.' },
        { word: 'initiative', definition: 'the ability to act independently without being told', example: 'She showed great initiative by solving the problem before anyone noticed.' },
        { word: 'implement', definition: 'to put a plan into action', example: 'The company implemented a new remote working policy.' },
        { word: 'inevitably', definition: 'as is certain to happen', example: 'Inevitably, the deadline was moved forward.' },
      ],
    },
    grammar: {
      focus: 'Past & Perfect Tenses — the most tested area in Aptis Core',
      explanation: 'Aptis tests your ability to distinguish between Past Simple, Past Continuous, Past Perfect, and Present Perfect. A common B1→B2 gap is misusing "had done" vs "did" and forgetting "by the time" triggers Past Perfect.',
      tip: 'Remember: "By the time X happened, Y had already happened." The EARLIER action = Past Perfect.',
      questions: [
        {
          sentence: 'By the time I arrived at the cinema, the film _____ already _____.',
          options: ['had / started', 'has / started', 'was / starting'],
          correctIndex: 0,
          explanation: '"By the time" signals the Past Perfect. The film started before I arrived, so "had already started" is correct.',
        },
        {
          sentence: 'I _____ in London for three years when the company decided to relocate.',
          options: ['had been living', 'have been living', 'was living'],
          correctIndex: 0,
          explanation: 'Use Past Perfect Continuous to show an ongoing action before another past event. "had been living" is correct.',
        },
        {
          sentence: 'She _____ the report twice before she finally sent it to the manager.',
          options: ['checked', 'had checked', 'has checked'],
          correctIndex: 1,
          explanation: '"Before she sent it" tells us the checking happened first. Past Perfect = had checked.',
        },
        {
          sentence: 'This is the first time I _____ such an impressive presentation.',
          options: ['have seen', 'saw', 'had seen'],
          correctIndex: 0,
          explanation: '"This is the first time" always triggers Present Perfect. "have seen" is correct.',
        },
        {
          sentence: 'When we reached the hotel, we realised we _____ our passports at home.',
          options: ['have left', 'left', 'had left'],
          correctIndex: 2,
          explanation: 'Leaving passports happened BEFORE realising it. Past Perfect = "had left".',
        },
      ],
    },
    writing: {
      part: 'Part 2 — Short Message (20–30 words)',
      prompt: 'You work in a company. Your colleague Marco has just emailed asking if the team meeting tomorrow has been moved. Write a reply confirming the time and room.',
      wordLimit: '20–30 words',
      template: `Hi [Name],

[Confirm/deny + key information].
[One extra relevant detail].

[Sign-off],
[Your name]`,
      modelAnswer: `Hi Marco,

The team meeting is confirmed for tomorrow at 10 AM in Meeting Room B on the third floor. Please bring your project notes.

Best,
[Your name]`,
      examinertip: 'Part 2 is marked on task completion and word count. Answer EVERY piece of information in the prompt. Going under 20 words = automatic score reduction.',
    },
    speaking: {
      part: 'Part 1 — Personal Questions (3 questions, 45 seconds each)',
      prompt: 'Tell me about a memorable journey you have taken. Where did you go, and what made it special?',
      preparationTime: '5 seconds',
      responseTime: '45 seconds',
      keyPhrases: [
        'I would say that...',
        'What made it particularly special was...',
        'Looking back on it, I realise...',
        'One thing that really stood out was...',
        'It was an experience that...',
      ],
      modelAnswer: `I'd say one of the most memorable trips I've ever taken was a weekend in Porto, Portugal, about two years ago. What made it particularly special was the combination of stunning architecture and incredible food. I visited the famous Livraria Lello bookshop, which was absolutely breathtaking. Looking back, it was the kind of trip that reminds you why travelling is so valuable — you come back with a completely different perspective. I'd highly recommend it to anyone who hasn't been.`,
      commonMistakes: [
        'Saying "It was very good" — too vague. Use: "It was an extraordinarily rewarding experience."',
        'Starting with "I think..." every sentence. Vary: "In my view", "To my mind", "From my perspective."',
        'Speaking too fast and running out of ideas. Use filler phrases: "That\'s an interesting question. Let me think about that for a moment."',
      ],
    },
    strategy: {
      title: 'The B1→B2 Gap: What Examiners Are Looking For',
      content: 'The key difference between B1 and B2 is not "knowing more words" — it is RANGE and ACCURACY used together. A B2 candidate uses complex structures correctly, not just simple ones. In every part of Aptis, examiners look for: (1) Appropriate register, (2) Accurate grammar with variety, (3) Cohesive text that flows naturally.',
      tip: 'Aim for at least one complex sentence per paragraph in writing, and at least one B2 structure per speaking answer (e.g., a passive, a conditional, a cleft sentence).',
    },
  },

  {
    day: 2,
    date: '30 April',
    title: 'Reading Strategies + Advanced Vocabulary',
    focus: 'Skimming · Scanning · B2 Connectors',
    totalMinutes: 150,
    vocabulary: {
      topic: 'Society & Environment',
      words: [
        { word: 'sustainable', definition: 'able to be maintained without harming the environment', example: 'We need to develop more sustainable energy sources.' },
        { word: 'exacerbate', definition: 'to make a problem worse', example: 'The drought was exacerbated by deforestation.' },
        { word: 'advocate', definition: 'to publicly recommend or support', example: 'Environmental groups advocate for stricter pollution controls.' },
        { word: 'mitigate', definition: 'to reduce the severity of something', example: 'Tree planting can help mitigate the effects of climate change.' },
        { word: 'deteriorate', definition: 'to become progressively worse', example: 'Air quality in the city has deteriorated significantly.' },
      ],
    },
    grammar: {
      focus: 'Relative Clauses & Cleft Sentences — key B2 complexity markers',
      explanation: 'Aptis rewards grammatical RANGE. Relative clauses (defining vs non-defining) and cleft sentences ("It was X that...") immediately signal B2 level. Examiners love seeing these in writing and speaking.',
      tip: 'Non-defining relative clauses (with commas) add detail without changing meaning. Use them in formal writing: "The report, which was published last year, highlighted..."',
      questions: [
        {
          sentence: 'The scientist _____ discovered penicillin was Alexander Fleming.',
          options: ['who', 'which', 'whom'],
          correctIndex: 0,
          explanation: 'Use "who" for people in defining relative clauses. "The scientist who discovered..."',
        },
        {
          sentence: 'It was the lack of preparation _____ caused the project to fail.',
          options: ['that', 'which', 'what'],
          correctIndex: 0,
          explanation: 'Cleft sentences use "It was + X + THAT". Never "what" in this structure.',
        },
        {
          sentence: 'The new policy, _____ was introduced last month, has been widely criticised.',
          options: ['which', 'that', 'who'],
          correctIndex: 0,
          explanation: 'Non-defining relative clauses use "which" (not "that") for things/ideas. The commas are essential.',
        },
        {
          sentence: 'The woman _____ bag was stolen immediately reported it to the police.',
          options: ['whose', 'who', 'which'],
          correctIndex: 0,
          explanation: '"Whose" shows possession in relative clauses. "The woman whose bag..." = her bag.',
        },
        {
          sentence: 'What I find most challenging _____ the time pressure in the listening section.',
          options: ['is', 'are', 'was'],
          correctIndex: 0,
          explanation: '"What I find..." is a nominal clause acting as the subject. The verb agrees with the complement: "is the time pressure."',
        },
      ],
    },
    writing: {
      part: 'Part 3 — Extended Answer (30–40 words)',
      prompt: 'Do you think social media has had a more positive or negative impact on society? Give your opinion with a reason.',
      wordLimit: '30–40 words',
      template: `[Clear opinion statement].
[Reason + example or consequence].
[Optional: contrasting idea/nuance].`,
      modelAnswer: `In my view, social media has had an overwhelmingly negative impact on society overall. While it does connect people globally, the damage caused by misinformation, cyberbullying, and reduced attention spans significantly outweighs these benefits.`,
      examinertip: 'In Part 3, examiners check: (1) Is your opinion clear? (2) Is there at least one developed reason? (3) Is it within the word limit? Do not write essays — one clear argument is better than three undeveloped ones.',
    },
    speaking: {
      part: 'Part 2 — Photo Description (45 seconds)',
      prompt: 'You see a photograph of a crowded city market. People of various ages are shopping, talking, and moving between stalls selling fruit, clothing, and handmade goods. Describe what you can see.',
      preparationTime: '10 seconds',
      responseTime: '45 seconds',
      keyPhrases: [
        'In the foreground/background, I can see...',
        'What strikes me most is...',
        'The atmosphere seems to be...',
        'This looks like it could be...',
        'I would imagine that...',
      ],
      modelAnswer: `In the photograph, I can see a very busy outdoor market that appears to be located in a city centre. In the foreground, there are stalls selling fresh fruit and vegetables, and people of different ages are browsing and shopping. What strikes me most is the lively, vibrant atmosphere — the market seems to be a real community hub. In the background, I can make out some clothing stalls. The scene looks like it could be a weekend market, possibly in Southern Europe or Latin America, judging by the style of the stalls.`,
      commonMistakes: [
        'Describing only what you see without speculating. Say: "This could be...", "I imagine...", "It seems like..."',
        'Saying "There is a man" repeatedly. Use: "I can see", "In the background there appears to be", "What catches the eye is..."',
        'Finishing before 45 seconds. Fill time with: atmosphere, possible location, how people seem to feel.',
      ],
    },
    strategy: {
      title: 'Reading Strategy: The 3-Pass Method',
      content: 'Pass 1 (30 sec): Read the questions FIRST — know what you are looking for. Pass 2 (skim): Read the whole text quickly for the main idea — do not stop at unknown words. Pass 3 (scan): Go back to find specific answers to questions. In Aptis Reading Part 4 (long text), paragraphs often contain one main idea — identify it and match to the heading.',
      tip: 'Underline key words in questions. Then scan for synonyms in the text — Aptis rarely uses the same word as the text. It paraphrases.',
    },
  },

  {
    day: 3,
    date: '1 May',
    title: 'Writing Masterclass — Email Structures',
    focus: 'Informal vs Formal · Openings · Closings · Register',
    totalMinutes: 140,
    vocabulary: {
      topic: 'Communication & Media',
      words: [
        { word: 'elaborate', definition: 'to explain in more detail', example: 'Could you elaborate on your reasons for the decision?' },
        { word: 'clarify', definition: 'to make something less confusing', example: 'The manager sent an email to clarify the new procedure.' },
        { word: 'convey', definition: 'to communicate or express something', example: 'It is difficult to convey emotion through written text alone.' },
        { word: 'concise', definition: 'giving a lot of information clearly in few words', example: 'Your formal email should be concise and professional.' },
        { word: 'correspondence', definition: 'letters or emails exchanged between people', example: 'Please keep a record of all correspondence with the client.' },
      ],
    },
    grammar: {
      focus: 'Modal Verbs for Formal Register — critical for Writing Part 4',
      explanation: 'Modals change everything in register. "I want" = informal, "I would like" = neutral, "I would be grateful if you could" = formal. Aptis formal emails MUST use formal modals. Passive constructions ("It has been decided that...") are also expected at B2.',
      tip: 'Learn these formal upgrades: want → would appreciate / would be grateful for; tell you → inform you; need → require; can → would be able to; sorry → I apologise for.',
      questions: [
        {
          sentence: 'I am writing to _____ you that your application has been successful.',
          options: ['inform', 'tell', 'say'],
          correctIndex: 0,
          explanation: '"Inform" is the formal register equivalent of "tell". Always use "inform" in formal emails.',
        },
        {
          sentence: '_____ you be available for a meeting on Thursday at 10 AM?',
          options: ['Would', 'Will', 'Can'],
          correctIndex: 0,
          explanation: '"Would you be available" is formal. "Will you" and "Can you" are too direct/informal for professional emails.',
        },
        {
          sentence: 'I _____ be most grateful if you could respond at your earliest convenience.',
          options: ['would', 'will', 'should'],
          correctIndex: 0,
          explanation: '"I would be most grateful" is a classic formal expression. Essential for Aptis Part 4 formal emails.',
        },
        {
          sentence: 'Please do not hesitate to _____ me if you require any further information.',
          options: ['contact', 'call', 'ring'],
          correctIndex: 0,
          explanation: '"Contact me" is the standard formal email closing phrase. "Call" or "ring" are too informal.',
        },
        {
          sentence: 'I am writing _____ to the advertisement posted on your website last week.',
          options: ['with regard', 'about', 'because of'],
          correctIndex: 0,
          explanation: '"With regard to" is a formal linking phrase that signals the purpose of the email. Always useful in the opening sentence.',
        },
      ],
    },
    writing: {
      part: 'Part 4 — Formal Email (120–150 words)',
      prompt: 'You attended a local council meeting about plans to close the only public library in your town. You are against the closure. Write a formal email to your local councillor expressing your concerns, explaining why the library is important, and suggesting an alternative solution.',
      wordLimit: '120–150 words',
      template: `Dear [Title Surname],

I am writing with regard to [topic/reason for writing].

[Paragraph 1: State your main concern clearly]
[Sentence 1: describe the situation]
[Sentence 2: why it matters]

[Paragraph 2: Develop your argument / provide evidence]
[Sentence 1-2: specific reasons or examples]

[Paragraph 3: Suggest alternative / make a request]
[Sentence 1: your proposed solution]
[Sentence 2: what you want the reader to do]

I would be most grateful if you could [action].
Please do not hesitate to contact me if you require any further information.

Yours sincerely,
[Your name]`,
      modelAnswer: `Dear Councillor Jenkins,

I am writing with regard to the proposed closure of Westfield Public Library, which I understand was discussed at last Thursday's council meeting. I am deeply concerned about this decision and would like to express my strong opposition.

The library serves as an essential community resource for residents of all ages. It provides free access to books, computers, and learning programmes that many local families simply cannot afford privately. Its closure would disproportionately affect elderly residents and those on lower incomes.

I would strongly urge the council to consider alternative measures to reduce costs, such as reducing opening hours or seeking partnership funding from local businesses, before taking the irreversible step of permanent closure.

I would be most grateful if you could reconsider this decision. Please do not hesitate to contact me should you require further information.

Yours sincerely,
A. Resident`,
      examinertip: 'Formal email checklist: ✓ Dear + Title + Surname, ✓ "I am writing with regard to / in response to", ✓ No contractions, ✓ Passive voice used at least once, ✓ "Yours sincerely" if you know the name, "Yours faithfully" if you wrote "Dear Sir/Madam". Word count between 120-150.',
    },
    speaking: {
      part: 'Part 4 — Extended Discussion (2 minutes)',
      prompt: 'Look at the image of a library. Why do you think libraries are still important in the age of the internet? What problems might communities face if libraries were closed?',
      preparationTime: '10 seconds',
      responseTime: '2 minutes',
      keyPhrases: [
        'Despite the rise of digital technology, libraries remain vital because...',
        'One often overlooked aspect is...',
        'From a social equality perspective...',
        'In addition to this, it is worth considering...',
        'The consequences of closing libraries could be far-reaching...',
      ],
      modelAnswer: `Despite the rise of digital technology, I believe libraries remain absolutely vital for several reasons. First, from a social equality perspective, not everyone has reliable internet access at home — libraries provide free, equal access to information for people of all socioeconomic backgrounds. One often overlooked aspect is the human element: librarians are trained information professionals who help people navigate complex research, which an algorithm cannot fully replace. In addition, libraries serve as safe community spaces, particularly for young people, the elderly, and those experiencing social isolation. The consequences of closing libraries could be far-reaching — we might see increased educational inequality and a further erosion of community cohesion. While I acknowledge that libraries must adapt to the digital age, eliminating them altogether would be both short-sighted and socially damaging.`,
      commonMistakes: [
        'Running out of content after 40 seconds. Prepare 3 distinct points before you speak.',
        'Not signposting: use "First...", "In addition...", "Finally..." to structure 2-minute answers.',
        'Repeating the same idea in different words. Each sentence should add new information.',
      ],
    },
    strategy: {
      title: 'Writing Part 4: The Hidden Scoring Criteria',
      content: 'Most students focus on vocabulary and grammar. But Aptis also marks: (1) TASK ACHIEVEMENT — did you cover all points in the prompt? Many students miss one point and lose marks. (2) REGISTER CONSISTENCY — one casual phrase in a formal email drops your score. (3) COHERENCE — does your email flow? Use one linking phrase per paragraph minimum.',
      tip: 'Before writing your formal email, underline every instruction in the prompt. Tick each one as you write it. Missing even one point is the most common reason for B1 instead of B2 in Writing.',
    },
  },

  {
    day: 4,
    date: '2 May',
    title: 'Passive Voice & Listening Intensive',
    focus: 'Passive structures · Listening for gist & detail · Note-taking',
    totalMinutes: 150,
    vocabulary: {
      topic: 'Science & Technology',
      words: [
        { word: 'breakthrough', definition: 'a sudden important discovery or development', example: 'The new vaccine represents a major breakthrough in medicine.' },
        { word: 'implement', definition: 'to put a plan or system into action', example: 'The new technology was implemented across all departments.' },
        { word: 'unprecedented', definition: 'never done or known before', example: 'The speed of technological change is unprecedented in human history.' },
        { word: 'impact', definition: 'a strong effect or influence', example: 'Artificial intelligence will have a profound impact on the job market.' },
        { word: 'revolutionise', definition: 'to completely change something', example: 'Smartphones have revolutionised the way we communicate.' },
      ],
    },
    grammar: {
      focus: 'Passive Voice — expected in all formal Aptis writing',
      explanation: 'Aptis markers expect passive voice in formal writing and Core grammar questions regularly test complex passive forms: Perfect Passive ("has been done"), Continuous Passive ("is being done"), and Modal Passive ("should be done"). Using passive shows B2 grammatical range.',
      tip: 'Turn active to passive: Active: "The government introduced the law." → Passive: "The law was introduced by the government." In formal writing, drop "by...": "The law was introduced in 2022."',
      questions: [
        {
          sentence: 'The new hospital _____ by the Prime Minister next Tuesday.',
          options: ['will be opened', 'will open', 'is opening'],
          correctIndex: 0,
          explanation: 'Passive future: "will be + past participle". The hospital is the object of opening, not the subject.',
        },
        {
          sentence: 'The results of the investigation _____ to the public yet.',
          options: ['have not been released', 'have not released', 'were not released'],
          correctIndex: 0,
          explanation: 'Present Perfect Passive: "have been + past participle". "Yet" signals Present Perfect.',
        },
        {
          sentence: 'The bridge _____ at the moment due to flooding.',
          options: ['is being repaired', 'is repairing', 'has been repaired'],
          correctIndex: 0,
          explanation: 'Present Continuous Passive: "is being + past participle". "At the moment" signals continuous.',
        },
        {
          sentence: 'All applications _____ by 5 PM on Friday.',
          options: ['must be submitted', 'must submit', 'should submit'],
          correctIndex: 0,
          explanation: 'Modal Passive: "must/should/can + be + past participle". Common in formal notices and instructions.',
        },
        {
          sentence: 'Apparently, a solution _____ already _____ by the research team.',
          options: ['had / been found', 'has / been finding', 'was / found'],
          correctIndex: 0,
          explanation: 'Past Perfect Passive: "had been + past participle". "Already" and narrative context signal Past Perfect.',
        },
      ],
    },
    writing: {
      part: 'Part 4 — Informal Email (40–60 words)',
      prompt: 'Your friend Sam is thinking about moving to a new city for work. He has asked for your advice about whether it is a good idea. Write an email to Sam giving your opinion and one specific piece of advice.',
      wordLimit: '40–60 words',
      template: `Hi [Name]!

[Respond to situation + give clear opinion].
[Specific advice/reason].
[Friendly closing].

[Sign-off],
[Name]`,
      modelAnswer: `Hi Sam!

Moving for work sounds like an exciting opportunity! I'd say go for it — career growth is definitely worth stepping out of your comfort zone. My main advice would be to visit the city first and check out the neighbourhoods before you commit to anything. You won't regret it!

Take care,
[Your name]`,
      examinertip: 'Informal email checklist: ✓ "Hi + first name!" with exclamation mark, ✓ Contractions (I\'d, you\'re, it\'s), ✓ Casual phrases ("sounds like", "go for it"), ✓ "Take care / Speak soon / Best" as sign-off. Never "Yours sincerely" in informal emails.',
    },
    speaking: {
      part: 'Part 3 — Comparing Two Photos (45 seconds)',
      prompt: 'Photo A shows a student studying alone in a silent library. Photo B shows a group of students studying together in a noisy common room. Compare the two situations and say which environment you think is more effective for learning.',
      preparationTime: '10 seconds',
      responseTime: '45 seconds',
      keyPhrases: [
        'While both images show students studying, they differ significantly in...',
        'In contrast to Photo A, Photo B depicts...',
        'Personally, I think... because...',
        'On the one hand... on the other...',
        'It seems to me that...',
      ],
      modelAnswer: `While both photographs show students studying, they differ significantly in terms of environment and approach. In Photo A, the student is working alone in a quiet library, which appears very focused and free from distraction. In contrast, Photo B shows a group working collaboratively in what seems to be a noisier, more social setting. Personally, I think the library environment is more effective for deep concentration — tasks that require memorisation or complex reading benefit from silence. That said, group study in Photo B could work well for discussion-based subjects or exam review.`,
      commonMistakes: [
        'Describing photos separately without COMPARING. Use: "Unlike Photo A, Photo B shows..."',
        'Not giving a clear opinion. Say: "Personally, I believe..." — examiners want your view.',
        'Only talking for 20 seconds. Keep comparing: environment, mood, effectiveness, who benefits.',
      ],
    },
    strategy: {
      title: 'Listening: How to Handle Unknown Words',
      content: 'In the Aptis Listening, you WILL hear words you do not know. This is normal — even at C1 level. The key is: (1) Never panic — it wastes focus. (2) Use context: what is the topic? What kind of word is it (noun/verb/adjective)? (3) In multiple-choice, eliminate wrong options — you do not need to understand every word to know A is wrong. (4) The question always paraphrases the audio — the exact words from the audio are rarely the same as the answer options.',
      tip: 'In Aptis Listening Part 3 (interview/monologue), the questions follow the ORDER of the audio. If you miss Q7, move on to Q8 — do not dwell on it.',
    },
  },

  {
    day: 5,
    date: '3 May',
    title: 'Speaking Confidence — Structure & Fluency',
    focus: 'B2 discourse markers · Filler strategies · Intonation tips',
    totalMinutes: 130,
    vocabulary: {
      topic: 'Health & Lifestyle',
      words: [
        { word: 'sedentary', definition: 'tending to spend much time seated, with little physical activity', example: 'A sedentary lifestyle increases the risk of heart disease.' },
        { word: 'wellbeing', definition: 'the state of being comfortable, healthy, or happy', example: 'Many companies now invest in employee wellbeing programmes.' },
        { word: 'detrimental', definition: 'harmful or damaging', example: 'Excessive screen time can be detrimental to mental health.' },
        { word: 'moderate', definition: 'average in amount; not extreme', example: 'Moderate exercise, such as walking, benefits most people.' },
        { word: 'prevalent', definition: 'widespread in a particular area at a particular time', example: 'Anxiety disorders are increasingly prevalent among young people.' },
      ],
    },
    grammar: {
      focus: 'Conditionals — all types tested in Aptis Core',
      explanation: 'Aptis Core tests all four conditional types. The most common error is mixing types (e.g., "If I would have..." is ALWAYS wrong). Type 3 (unreal past) is the most common B2 marker in speaking and writing.',
      tip: 'Type 3 formula: "If + had done... would have done." NEVER "would have" in the IF clause. "If I had studied harder, I would have passed" ✓ | "If I would have studied..." ✗',
      questions: [
        {
          sentence: 'If you _____ me earlier, I would have helped you.',
          options: ['had told', 'told', 'would tell'],
          correctIndex: 0,
          explanation: 'Third conditional: "If + Past Perfect, would have + past participle." Both the condition and result are impossible — it\'s in the past.',
        },
        {
          sentence: 'Unless you study regularly, you _____ make much progress.',
          options: ["won't", "wouldn't", "don't"],
          correctIndex: 0,
          explanation: '"Unless" = "If not". This is First Conditional (real possibility): "unless you study" = "if you don\'t study", so result is "won\'t".',
        },
        {
          sentence: 'If I _____ you, I would accept the job offer immediately.',
          options: ['were', 'was', 'am'],
          correctIndex: 0,
          explanation: 'Second conditional: "If I were you" (NOT "was"). "Were" is used with all subjects in hypothetical conditionals — this is a common B2 exam point.',
        },
        {
          sentence: 'She _____ the project on time if the team had been more organised.',
          options: ['would have completed', 'would complete', 'had completed'],
          correctIndex: 0,
          explanation: 'Third conditional result clause: "would have + past participle". The condition (if the team had been organised) uses Past Perfect.',
        },
        {
          sentence: 'If water _____ to 100°C, it boils.',
          options: ['is heated', 'was heated', 'would be heated'],
          correctIndex: 0,
          explanation: 'Zero conditional (scientific/general truth): "If + Present Simple, Present Simple." Used for facts that are always true.',
        },
      ],
    },
    writing: {
      part: 'Part 3 — Extended Answer (30–40 words)',
      prompt: 'Some people believe that working from home is more productive than working in an office. Do you agree? Give your opinion with a reason.',
      wordLimit: '30–40 words',
      template: `[Agree/Disagree + nuance if possible].
[Main reason].
[Brief example or consequence].`,
      modelAnswer: `I partially agree with this view. Working from home can boost productivity by eliminating commuting and office distractions, particularly for tasks requiring deep focus. However, it can also blur work-life boundaries, which may actually reduce output for some individuals.`,
      examinertip: 'Partial agreement is excellent at B2 level. It shows critical thinking: "I agree to some extent, but...", "While this is true in some cases...". Avoid extremes — examiners reward nuanced views.',
    },
    speaking: {
      part: 'Part 1 — Three Personal Questions',
      prompt: 'Q1: What do you enjoy doing to relax after a long day? Q2: How has technology changed the way you communicate with people? Q3: Is it more important to have a job you love or a job that pays well? Why?',
      preparationTime: '5 seconds per question',
      responseTime: '45 seconds per question',
      keyPhrases: [
        'When it comes to relaxing, I tend to...',
        'Technology has transformed the way I... in that...',
        'That\'s a thought-provoking question. In my view...',
        'I\'d argue that... although I recognise that...',
        'From a personal perspective...',
      ],
      modelAnswer: `Q3 Model: That's a genuinely thought-provoking question. Personally, I'd argue that job satisfaction is more important than salary, although I recognise that financial security is a fundamental need. From my perspective, spending eight or more hours a day doing something that fulfils you has a direct impact on your mental health and overall quality of life. A high salary might compensate for a while, but over time, a lack of purpose at work inevitably leads to burnout. I'd rather earn less doing something meaningful.`,
      commonMistakes: [
        'Answering in 10 seconds. Use "That\'s an interesting question. Let me think about that..." to buy time.',
        'Not using examples. Always add "For instance..." or "I remember once when..."',
        'Forgetting to give a reason. The structure is: Opinion → Reason → Example/Development.',
      ],
    },
    strategy: {
      title: 'Speaking: The OREO Framework for B2 Answers',
      content: 'Every 45-second Aptis speaking answer should follow OREO: O = Opinion ("I strongly believe that..."), R = Reason ("This is because..."), E = Example/Evidence ("For instance, studies have shown..." or "I personally experienced..."), O = Outcome/Conclusion ("As a result..." or "This is why I think..."). This gives you structure, fills the time, and shows range.',
      tip: 'Practise OREO answers for 20 different questions before exam day. After 20, it becomes automatic. Write them down and then say them aloud — speaking practice must be SPOKEN, not just thought.',
    },
  },

  {
    day: 6,
    date: '4 May',
    title: 'Advanced Grammar — Inversion & Reported Speech',
    focus: 'Inversion for emphasis · Reporting structures · Aptis Core patterns',
    totalMinutes: 140,
    vocabulary: {
      topic: 'Education & Learning',
      words: [
        { word: 'assess', definition: 'to evaluate or estimate the quality of something', example: 'Teachers use various methods to assess student progress.' },
        { word: 'criterion', definition: 'a standard by which something is judged (plural: criteria)', example: 'The main criterion for admission is academic performance.' },
        { word: 'curriculum', definition: 'the subjects studied in a school or college', example: 'The curriculum has been updated to include digital literacy.' },
        { word: 'facilitate', definition: 'to make an action or process easier', example: 'Technology can facilitate learning in remote areas.' },
        { word: 'proficiency', definition: 'a high degree of skill or competence', example: 'Language proficiency is tested in all four skills.' },
      ],
    },
    grammar: {
      focus: 'Inversion — the #1 C-level structure that B2 students can learn quickly',
      explanation: 'Inversion (putting the auxiliary before the subject) is rarely expected at B1 but is common in written B2 English, especially after "Not only", "Rarely", "Never", "Hardly", "No sooner", "Little", "Only". Using ONE inversion correctly in writing instantly signals upper-B2.',
      tip: 'Formula: Negative/limiting adverb + auxiliary + subject + main verb. "Not only DID she study hard, but she also..." (Note: use did for Past Simple inversions.)',
      questions: [
        {
          sentence: 'Rarely _____ such a talented student in all my years of teaching.',
          options: ['have I encountered', 'I have encountered', 'I encountered'],
          correctIndex: 0,
          explanation: 'After "Rarely", invert auxiliary and subject: "have I encountered". This is a classic B2+ grammar structure.',
        },
        {
          sentence: 'Not only _____ the project on time, but she also exceeded all expectations.',
          options: ['did she deliver', 'she delivered', 'she did deliver'],
          correctIndex: 0,
          explanation: 'After "Not only", invert: did + subject + infinitive. "did she deliver" is correct.',
        },
        {
          sentence: 'The teacher told the students that they _____ allowed to use dictionaries.',
          options: ['were not', 'are not', 'would not'],
          correctIndex: 0,
          explanation: 'Reported speech: backshift from "are not allowed" → "were not allowed". The reporting verb "told" is Past Simple.',
        },
        {
          sentence: 'She asked me _____ I had finished my homework yet.',
          options: ['whether', 'that', 'what'],
          correctIndex: 0,
          explanation: 'Reported yes/no questions use "whether" (or "if"). Not "that" (statements) or "what" (wh- questions).',
        },
        {
          sentence: 'Little _____ that his invention would change the world.',
          options: ['did he realise', 'he realised', 'has he realised'],
          correctIndex: 0,
          explanation: '"Little" as a negative limiter triggers inversion: "did he realise". Tense context is Past Simple.',
        },
      ],
    },
    writing: {
      part: 'Part 2 — Short Message (20–30 words)',
      prompt: 'You are the organiser of an English conversation club. A new member, Daniel, cannot attend the first session but wants information. Write a message explaining when the club meets and what participants do.',
      wordLimit: '20–30 words',
      template: `Hi [Name],

[When] + [Where]. [What participants do].
[Any additional key detail].

[Sign-off]`,
      modelAnswer: `Hi Daniel,

The conversation club meets every Tuesday at 7 PM at the City Library. We practise speaking through themed discussions and role-plays. We look forward to having you!

[Your name]`,
      examinertip: 'Even in Part 2, you must cover ALL information points in the prompt. Here: WHEN the club meets + WHAT participants do. Missing either = task not achieved = lower score.',
    },
    speaking: {
      part: 'Part 2 — Photo Description + Follow-up Questions',
      prompt: 'In the photo, you see a school classroom. Children aged around 10 are working in small groups. The teacher is walking around and assisting different groups. Describe the photo, then answer: (1) What do you think the children are learning? (2) Do you think this type of group work is effective?',
      preparationTime: '10 seconds',
      responseTime: '45 seconds total',
      keyPhrases: [
        'The photograph shows...',
        'I can see what appears to be...',
        'Judging by the way...',
        'I would guess that...',
        'In terms of effectiveness...',
      ],
      modelAnswer: `The photograph shows what appears to be a primary school classroom where children are working collaboratively in small groups. The teacher is actively moving around the room, which suggests a hands-on, student-centred lesson. Judging by the materials on the tables, I would guess the children are working on a science or art project. In terms of effectiveness, I personally think group work is excellent for developing communication skills and collaborative thinking — both of which are essential at that age. However, it does require a skilled teacher to manage effectively.`,
      commonMistakes: [
        'Not answering the follow-up questions! They are worth marks. Listen for them carefully.',
        'Saying "I think the children are learning maths" without evidence. Say: "Judging by the materials, I would guess..."',
        'Stopping after the description and forgetting the follow-ups.',
      ],
    },
    strategy: {
      title: 'Core Grammar: The 10 Most Tested Structures',
      content: '1. Past Perfect (had done) 2. Reported Speech (she said that she had...) 3. Passive (is being done / was done / has been done) 4. Conditionals Type 2 & 3 5. Modal Perfect (should have done, must have been) 6. Relative Clauses (who/which/whose) 7. Inversion (Rarely did he...) 8. Gerund vs Infinitive (suggest doing, decide to do) 9. Subjunctive (It is essential that he be...) 10. Cleft sentences (It was her who...)',
      tip: 'Learn 2 sentences by heart for each of the 10 structures. Seeing the pattern makes answering multiple-choice 40% faster.',
    },
  },

  {
    day: 7,
    date: '5 May',
    title: 'Mid-Programme Review + Weak Area Focus',
    focus: 'Error analysis · Consolidation · Strategy review',
    totalMinutes: 120,
    vocabulary: {
      topic: 'Business & Economy',
      words: [
        { word: 'revenue', definition: 'income generated by a business', example: 'The company\'s annual revenue grew by 12% last year.' },
        { word: 'negotiate', definition: 'to discuss and reach an agreement', example: 'Both parties agreed to negotiate the terms of the contract.' },
        { word: 'competitive', definition: 'relating to competition; as good as others', example: 'The job market is extremely competitive for graduates.' },
        { word: 'fluctuate', definition: 'to rise and fall irregularly', example: 'Prices tend to fluctuate depending on supply and demand.' },
        { word: 'entrepreneur', definition: 'a person who sets up a business', example: 'She became a successful entrepreneur after leaving her corporate job.' },
      ],
    },
    grammar: {
      focus: 'Gerund vs Infinitive — causes the most errors in Aptis Core',
      explanation: 'The choice between gerund (-ing) and infinitive (to do) is tested every exam. Key rule: verbs of PREFERENCE/ATTITUDE take gerunds (enjoy, suggest, avoid, consider, deny, practise, risk). Verbs of DECISION/INTENTION take infinitives (decide, agree, promise, refuse, manage, fail, hope).',
      tip: 'Suggest NEVER takes infinitive: "I suggest going" ✓ | "I suggest to go" ✗. Recommend follows the same rule. This mistake alone drops from B2 to B1.',
      questions: [
        {
          sentence: 'I really enjoy _____ new languages in my spare time.',
          options: ['learning', 'to learn', 'learn'],
          correctIndex: 0,
          explanation: '"Enjoy" is always followed by a gerund (-ing). "I enjoy learning" ✓',
        },
        {
          sentence: 'She decided _____ the job offer after a week of consideration.',
          options: ['to accept', 'accepting', 'accept'],
          correctIndex: 0,
          explanation: '"Decide" is always followed by infinitive (to + verb). "decided to accept" ✓',
        },
        {
          sentence: 'Have you considered _____ to a different department?',
          options: ['transferring', 'to transfer', 'transfer'],
          correctIndex: 0,
          explanation: '"Consider" takes a gerund. "considered transferring" ✓',
        },
        {
          sentence: 'The manager suggested _____ the meeting until next week.',
          options: ['postponing', 'to postpone', 'postpone'],
          correctIndex: 0,
          explanation: '"Suggest" ALWAYS takes gerund. A very common Aptis error. "suggested postponing" ✓',
        },
        {
          sentence: 'I remember _____ this film before, but I cannot recall where.',
          options: ['seeing', 'to see', 'seen'],
          correctIndex: 0,
          explanation: '"Remember + gerund" = a past memory. "Remember + infinitive" = remembering to do something in the future. Here, it\'s a past memory, so gerund.',
        },
      ],
    },
    writing: {
      part: 'Part 4 — Formal Email (120–150 words)',
      prompt: 'You recently stayed at a hotel that you had booked online. The room was nothing like the description on the website — it was much smaller, the air conditioning was broken, and there was building noise throughout your stay. Write a formal email of complaint to the hotel manager. Describe what went wrong and request appropriate compensation.',
      wordLimit: '120–150 words',
      template: `Dear [Manager / Sir/Madam],

I am writing to express my dissatisfaction regarding my recent stay at [hotel] from [date].

[Paragraph 1: State what was promised vs reality]

[Paragraph 2: Describe specific problems in detail]

[Paragraph 3: State what you expect / request compensation]

I would be grateful if you could [action].
I look forward to hearing from you.

Yours sincerely/faithfully,
[Name]`,
      modelAnswer: `Dear Sir or Madam,

I am writing to express my serious dissatisfaction regarding my stay at your hotel from 25th to 28th April. I am afraid the experience fell significantly short of the standard advertised on your website.

Firstly, the room provided was considerably smaller than described online and lacked the sea view that had been clearly stated. Furthermore, the air conditioning unit was completely non-functional throughout my entire stay, which made sleeping almost impossible during warm evenings. To compound matters, disruptive building work began at 7 AM each morning, which was not disclosed at the time of booking.

In light of these issues, I would like to request a partial refund of at least 50% of the total booking cost. I trust you will investigate this matter promptly and look forward to your response.

Yours faithfully,
A. Customer`,
      examinertip: 'Complaint email power phrases: "I am afraid that...", "This falls significantly short of...", "To compound matters...", "In light of the above...", "I trust you will...". Use at least 3 of these.',
    },
    speaking: {
      part: 'Review: All 4 Parts — Speed Practice',
      prompt: 'Quick-fire round: Answer each prompt in the correct time. Q1 (45s): What is your greatest achievement so far in life? Q2 (45s): Describe this scene — a busy airport departure lounge with travellers waiting. Q3 (45s): Compare two people: one who works for a big corporation vs one who runs their own small business. Q4 (2min): Looking at an image of polluted city streets, discuss the causes and possible solutions to urban air pollution.',
      preparationTime: '5–10 seconds each',
      responseTime: '45s / 45s / 45s / 2 min',
      keyPhrases: [
        'I would say my greatest achievement is...',
        'The scene depicts a...',
        'While the corporate employee has..., the entrepreneur...',
        'Urban air pollution stems from a variety of sources, including...',
      ],
      modelAnswer: `Q4 Model (2 minutes): Urban air pollution is a complex issue stemming from a variety of sources including vehicle emissions, industrial activity, and the widespread use of fossil fuels in energy production. In cities like London and Paris, traffic alone accounts for a significant proportion of harmful particulate matter. The consequences are severe — respiratory diseases, reduced life expectancy, and environmental damage to buildings and ecosystems. However, there are effective solutions. First, governments could accelerate the transition to electric vehicles by expanding charging infrastructure and offering financial incentives. Second, investing in efficient public transport reduces the number of private cars on the road. Finally, stricter regulations on industrial emissions, backed by meaningful penalties, would discourage the worst polluters. In my view, a combination of government policy and individual behaviour change is essential — neither alone is sufficient.`,
      commonMistakes: [
        'In Part 4, not using "First... Second... Finally..." means your 2-minute answer has no structure — it sounds like rambling.',
        'Confusing Part 2 (one photo) with Part 3 (two photos). In Part 2, go DEEP into one image. In Part 3, COMPARE two.',
        'Speaking too quietly. Aptis Speaking is recorded — speak clearly and at a moderate pace.',
      ],
    },
    strategy: {
      title: 'Week 1 Review: Where Are You?',
      content: 'After 6 days, you should assess yourself honestly: (1) Grammar — are you getting 80%+ on the daily exercises? If not, focus on the patterns you are getting wrong. (2) Writing — are you hitting the word counts every time? If not, practise daily with a timer. (3) Speaking — are you filling the full 45 seconds? If not, the OREO framework is your priority. (4) Vocabulary — are you using the new words? Write 3 sentences with each new word.',
      tip: 'The Aptis test rewards consistency over brilliance. A candidate who correctly uses 10 B2 structures reliably will score higher than one who attempts C1 and makes errors.',
    },
  },

  {
    day: 8,
    date: '6 May',
    title: 'Advanced Vocabulary & Collocations',
    focus: 'B2 collocations · Phrasal verbs · Register upgrade',
    totalMinutes: 140,
    vocabulary: {
      topic: 'Culture & Arts',
      words: [
        { word: 'depict', definition: 'to show or represent in a picture or story', example: 'The painting depicts a scene from rural life in the 19th century.' },
        { word: 'critique', definition: 'a detailed analysis and assessment', example: 'The professor gave a thorough critique of the student\'s essay.' },
        { word: 'aesthetic', definition: 'concerned with beauty or the appreciation of beauty', example: 'The architect had a strong aesthetic sense for natural materials.' },
        { word: 'contemporary', definition: 'living or occurring at the same time; modern', example: 'Contemporary art often challenges traditional ideas of beauty.' },
        { word: 'perspective', definition: 'a particular way of thinking about something', example: 'Travelling abroad gives you a new perspective on your own culture.' },
      ],
    },
    grammar: {
      focus: 'Subjunctive and Formal Suggestions — often tested in Aptis Core',
      explanation: 'The subjunctive is used in formal writing after: "It is essential/vital/important/necessary that + subject + BARE INFINITIVE (no -s, no to)". This sounds very formal and B2+. Example: "It is essential that every candidate ARRIVE on time" (not "arrives").',
      tip: '"I suggest that he APPLY for the position" (not "applies"). The subjunctive uses the same form as the infinitive without "to". Also used in conditional: "If I were you" (not "was").',
      questions: [
        {
          sentence: 'It is vital that every participant _____ the safety guidelines carefully.',
          options: ['read', 'reads', 'to read'],
          correctIndex: 0,
          explanation: 'Subjunctive: "It is vital that + subject + bare infinitive." No -s ending, no "to". "read" is correct.',
        },
        {
          sentence: 'The committee recommended that the policy _____ immediately.',
          options: ['be changed', 'is changed', 'should be changed'],
          correctIndex: 0,
          explanation: 'Formal subjunctive after "recommend that": bare infinitive form. "be changed" (passive subjunctive) is correct.',
        },
        {
          sentence: 'She _____ the problem as soon as she noticed it.',
          options: ['should have reported', 'should report', 'had to report'],
          correctIndex: 0,
          explanation: '"Should have + past participle" expresses criticism of a past action not done. She didn\'t report it = "should have reported".',
        },
        {
          sentence: 'I wish I _____ more time to prepare for the presentation.',
          options: ['had had', 'have had', 'had'],
          correctIndex: 0,
          explanation: '"I wish" about the past uses Past Perfect: "I wish I had had more time." (the double "had" is correct and common).',
        },
        {
          sentence: 'He talks to his manager _____ if he has a problem at work.',
          options: ['as though', 'like', 'as'],
          correctIndex: 0,
          explanation: '"As though / as if" introduces a clause comparing to an imaginary situation. In formal writing: "as though" > "like".',
        },
      ],
    },
    writing: {
      part: 'Part 3 — Extended Answer (30–40 words)',
      prompt: 'Many young people today prefer streaming music and films rather than going to live concerts or the cinema. Do you think this is a positive or negative trend? Give your view.',
      wordLimit: '30–40 words',
      template: `[Your view — positive/negative/mixed].
[Reason 1 — strongest point].
[Brief acknowledgement of other side or consequence].`,
      modelAnswer: `In my view, this is predominantly a negative trend. While streaming offers undeniable convenience, it cannot replicate the shared social experience of attending live events, which I believe is irreplaceable. The risk is that live arts and cinema industries become financially unviable.`,
      examinertip: 'Notice the structure: Opinion → "While..." (concession) → Main reason → Consequence. This is a B2 template. Memorise it. "While X may be true, Y is more significant because..."',
    },
    speaking: {
      part: 'Part 4 — Extended Discussion (2 minutes)',
      prompt: 'The photograph shows a crowded shopping centre during a sale. Discuss: Why do you think consumerism has increased so much in recent decades? What are the potential consequences of excessive consumerism for individuals and society?',
      preparationTime: '10 seconds',
      responseTime: '2 minutes',
      keyPhrases: [
        'The rise of consumerism can be attributed to...',
        'A particularly concerning consequence is...',
        'From an environmental standpoint...',
        'At an individual level, excessive consumption can lead to...',
        'On balance, I would argue that...',
      ],
      modelAnswer: `The rise of consumerism over recent decades can be attributed to several interconnected factors. Firstly, the explosion of digital advertising and social media has created unprecedented pressure to purchase in order to signal social status. Additionally, the availability of cheap credit has made it easier than ever to spend beyond one's means. From an individual perspective, this can lead to financial stress, debt, and a paradoxical sense of dissatisfaction — research consistently shows that beyond a basic level of material comfort, additional possessions do not increase happiness. At a societal level, excessive consumption is having a devastating environmental impact through increased waste and carbon emissions. On balance, I would argue that while economic growth is important, we urgently need to redefine what constitutes a successful and fulfilling life beyond material acquisition.`,
      commonMistakes: [
        'Not linking causes to consequences. Use: "This leads to...", "As a result...", "A consequence of this is..."',
        'Speaking about only ONE consequence. B2 requires range — mention at least 2-3 different consequences.',
        'Using simple vocabulary throughout. Upgrade: "people buy more" → "consumption has escalated", "bad for environment" → "environmentally detrimental".',
      ],
    },
    strategy: {
      title: 'Vocabulary: The B1→B2 Upgrade List',
      content: 'Replace these B1 words with B2 equivalents in speaking and writing: good → beneficial/advantageous | bad → detrimental/counterproductive | big → significant/substantial | show → demonstrate/illustrate | use → utilise/employ | help → facilitate/enable | change → transform/alter | think → consider/reflect on | say → suggest/indicate | make worse → exacerbate.',
      tip: 'In speaking, use ONE upgraded word per answer. Do not overdo it — "I utilise my beneficial methodology to facilitate learning" sounds unnatural. One or two B2 words in a natural sentence is enough.',
    },
  },

  {
    day: 9,
    date: '7 May',
    title: 'Reading Deep Dive — Parts 3 & 4',
    focus: 'Opinion matching · Long text · Distractor training',
    totalMinutes: 150,
    vocabulary: {
      topic: 'Urban Life & Transport',
      words: [
        { word: 'infrastructure', definition: 'basic systems needed for a society to function', example: 'The city\'s transport infrastructure needs urgent investment.' },
        { word: 'commute', definition: 'travel regularly between home and work', example: 'Millions of people commute into the city each weekday.' },
        { word: 'congestion', definition: 'overcrowding or blockage, especially of traffic', example: 'Road congestion is causing billions in economic losses annually.' },
        { word: 'pedestrianise', definition: 'to convert a street so it is only for pedestrians', example: 'The town centre was pedestrianised to reduce pollution.' },
        { word: 'viable', definition: 'capable of working successfully; feasible', example: 'Electric buses are now a commercially viable alternative.' },
      ],
    },
    grammar: {
      focus: 'Concession & Contrast Connectors — essential for Writing Parts 3&4',
      explanation: 'Aptis Writing rewards complex sentences with concession (showing two sides). Key connectors: Although/Even though/Despite/In spite of/Whereas/While/However/Nevertheless/That said/Admittedly. Each has different grammar rules — mixing them up costs marks.',
      tip: '"Despite" and "In spite of" are ALWAYS followed by a noun/gerund, NEVER a clause. "Despite the rain" ✓ | "Despite it rained" ✗. "Although" is followed by a CLAUSE. "Although it rained" ✓.',
      questions: [
        {
          sentence: '_____ the poor weather, the outdoor concert was a great success.',
          options: ['Despite', 'Although', 'Even though'],
          correctIndex: 0,
          explanation: '"Despite" + noun/gerund phrase. "Despite the poor weather" ✓. "Although/Even though" need a subject + verb.',
        },
        {
          sentence: 'The project was completed on time _____ several unexpected setbacks.',
          options: ['in spite of', 'despite of', 'although'],
          correctIndex: 0,
          explanation: '"In spite of" + noun. Note: "despite of" does NOT exist — a very common error. "In spite of" and "despite" are equivalent.',
        },
        {
          sentence: 'ith the proposal. _____, most members agreed to proceed.',
          options: ['Nevertheless', 'Despite', 'Although'],
          correctIndex: 0,
          explanation: '"Nevertheless" = "however/in spite of this" — used to connect TWO SENTENCES. It is placed at the start of the second sentence.',
        },
        {
          sentence: '_____ working full-time, she managed to complete her degree.',
          options: ['Despite', 'Although', 'However'],
          correctIndex: 0,
          explanation: '"Despite + gerund (-ing)": "Despite working..." ✓. This is a very common and elegant B2 structure.',
        },
        {
          sentence: 'Online shopping is more convenient. _____, it raises serious concerns about the future of high streets.',
          options: ['That said,', 'Despite this,', 'In spite of this,'],
          correctIndex: 0,
          explanation: '"That said" = "however, acknowledging the previous point." It connects sentences and is stylistically sophisticated at B2.',
        },
      ],
    },
    writing: {
      part: 'Part 4 — Informal Email (40–60 words)',
      prompt: 'Your friend Alex is planning to visit your city for the first time next month. He has asked you to recommend one must-see attraction and explain why. Write a reply.',
      wordLimit: '40–60 words',
      template: `Hi [Name]!

[Express enthusiasm].
[Recommend attraction + what it is].
[Why it\'s unmissable — one or two specific reasons].
[Friendly sign-off or invitation].

[Your name]`,
      modelAnswer: `Hi Alex!

So excited you're finally coming! You absolutely have to visit the Old Town — it's stunning, especially in the evening when all the historical buildings are lit up. The street food market there every Friday is incredible too. Let me know your dates and I'll come with you!

[Your name]`,
      examinertip: 'Informal emails should feel genuine and enthusiastic. Use exclamation marks (but not excessively), contractions, and casual connectors: "So...", "actually", "honestly", "I have to say...". Avoid "I hope this email finds you well" — it\'s too formal.',
    },
    speaking: {
      part: 'Part 3 — Comparing Two Photos + Opinion (45 seconds)',
      prompt: 'Photo A: A person cycling to work through a city. Photo B: A person driving alone in a car in heavy traffic. Compare the situations and say which form of transport you think is better for modern city life and why.',
      preparationTime: '10 seconds',
      responseTime: '45 seconds',
      keyPhrases: [
        'Both images illustrate different approaches to urban commuting...',
        'In contrast to the cyclist, the driver appears...',
        'From both an environmental and health perspective...',
        'Although cycling is not always practical...',
        'On balance, I would say...',
      ],
      modelAnswer: `Both images illustrate very different approaches to urban commuting. In Photo A, the cyclist appears to be moving freely and efficiently through the city, whereas in Photo B, the driver is stuck in heavy traffic, looking stressed. From both an environmental and personal health perspective, cycling is clearly superior — it produces no emissions and provides daily exercise. Although cycling is not always practical in bad weather or over long distances, on balance I would say it is the better option for modern city life, and cities should invest more in cycling infrastructure to make it safer and more accessible.`,
      commonMistakes: [
        'Saying "Photo A is better" without explaining WHY in terms of environment, health, time, etc.',
        'Not comparing — describing each photo separately. Always use contrast language: "whereas", "unlike", "in contrast to".',
        'Ending at 25 seconds. Add: "This is why I believe cities should..." to develop your conclusion.',
      ],
    },
    strategy: {
      title: 'Reading Part 3: How to Match Opinions Without Being Tricked',
      content: 'Aptis Reading Part 3 (opinion matching) is designed to trick you. Every person mentions every topic — the difference is in their ATTITUDE. Steps: (1) Read each person\'s opinion carefully and note their POSITION (positive/negative/neutral/conditional). (2) Read each statement and decide what position it expresses. (3) Match by attitude, not by topic. Wrong: "Alice mentions climate too, so it must be Alice." Right: "The statement is CRITICAL of policy, and only Ben has a critical view."',
      tip: 'Underline attitude words: "enthusiastic about", "concerned that", "disagrees with", "argues that despite X, Y". These are your matching clues, not the topic words.',
    },
  },

  {
    day: 10,
    date: '8 May',
    title: 'Full Writing Simulation + Model Answer Study',
    focus: 'Timed writing · All 4 parts · Self-correction',
    totalMinutes: 120,
    vocabulary: {
      topic: 'Travel & Tourism',
      words: [
        { word: 'itinerary', definition: 'a planned route or journey', example: 'Please send me the full itinerary for the business trip.' },
        { word: 'heritage', definition: 'valued things from the past handed down through generations', example: 'The old city is a UNESCO World Heritage site.' },
        { word: 'destination', definition: 'the place where someone is going', example: 'Barcelona is one of Europe\'s most popular tourist destinations.' },
        { word: 'immerse', definition: 'to involve oneself deeply in an activity', example: 'Travelling abroad allows you to immerse yourself in local culture.' },
        { word: 'accommodation', definition: 'a place to stay', example: 'The accommodation included breakfast and free Wi-Fi.' },
      ],
    },
    grammar: {
      focus: 'Modal Perfect Forms — showing range in speaking and writing',
      explanation: 'Modal Perfects (could have, should have, must have, might have, would have) are tested in Core and signal B2 level in writing and speaking. They refer to past possibilities, criticisms, and deductions. Aptis Core frequently tests: "She should have told us" (criticism) vs "She must have been tired" (deduction).',
      tip: '"Must have + past participle" = strong deduction about the past. "He must have left early — his car is gone." NOT "He must have left early — he is lazy." (The second is a reason, not a deduction.)',
      questions: [
        {
          sentence: 'You _____ the meeting — it was really important for your promotion.',
          options: ['should have attended', 'must have attended', 'could have attended'],
          correctIndex: 0,
          explanation: '"Should have + past participle" = criticism or regret about a past action not taken. You didn\'t attend, and that was wrong.',
        },
        {
          sentence: 'She isn\'t answering her phone. She _____ asleep by now.',
          options: ['must be', 'should be', 'might be'],
          correctIndex: 0,
          explanation: '"Must be" = strong deduction/logical conclusion about the present. Not answering phone → strong reason to think she\'s asleep.',
        },
        {
          sentence: 'He looks exhausted. He _____ travelling all night.',
          options: ['must have been', 'should have been', 'could have been'],
          correctIndex: 0,
          explanation: '"Must have been + -ing" = strong deduction about a past action in progress. He looks exhausted → we conclude he was travelling all night.',
        },
        {
          sentence: 'I _____ the exam if I had revised more thoroughly.',
          options: ['could have passed', 'should have passed', 'must have passed'],
          correctIndex: 0,
          explanation: '"Could have + past participle" = past possibility that did not happen. I had the potential to pass but I didn\'t.',
        },
        {
          sentence: 'She _____ the documents last night — they were due this morning.',
          options: ['should have prepared', 'must have prepared', 'could have prepared'],
          correctIndex: 0,
          explanation: '"Should have prepared" = criticism. She had an obligation to prepare them but didn\'t.',
        },
      ],
    },
    writing: {
      part: 'Full Simulation — Part 4 Formal Email (timed: 25 minutes for both)',
      prompt: 'You recently completed an online English course with a language school. The course was not as described: lessons were cancelled without notice, the teacher frequently arrived late, and the course materials were significantly below the promised level. Write a formal email of complaint to the school director, describing the problems clearly and requesting an appropriate remedy.',
      wordLimit: '120–150 words',
      template: `Dear [Director / Mr/Ms Surname],

I am writing to express my profound dissatisfaction with the [course name] course, which I completed between [dates].

[Para 1: Overview of the problem]
[Para 2: Specific issues — at least 3]
[Para 3: What you want — refund/compensation/apology]

I would be grateful if you could [specific action].
I trust this matter will be resolved promptly.

Yours sincerely/faithfully,
[Full Name]`,
      modelAnswer: `Dear Director,

I am writing to express my profound dissatisfaction with the B2 Online English Course I recently completed at your institution. I am afraid the experience fell considerably short of the standard your prospectus advertised.

On three separate occasions, scheduled lessons were cancelled without prior notice or any explanation, which significantly disrupted my preparation. Furthermore, the course tutor frequently joined sessions several minutes late, reducing the already limited contact time. Perhaps most concerning, the learning materials provided were of a noticeably lower level than those described at the point of enrolment.

In light of these shortcomings, I would request a partial refund of no less than 50% of the course fee, along with a formal written apology. I would be grateful if you could respond within seven working days.

Yours faithfully,
A. Learner`,
      examinertip: 'Power phrases for formal complaints: "I am afraid that...", "This fell considerably short of...", "On [number] separate occasions...", "Noticeable discrepancy between what was promised and what was delivered", "In light of the above", "I would expect this matter to be resolved within..."',
    },
    speaking: {
      part: 'Part 1 — Three Questions (Speed Drill)',
      prompt: 'Time yourself strictly. Q1 (45s): Do you prefer to travel alone or with others? Why? Q2 (45s): Describe a place in your home country that you think every visitor should see. Q3 (45s): How important is learning a foreign language in today\'s world? Give reasons.',
      preparationTime: '5 seconds per question',
      responseTime: '45 seconds per question — TIME YOURSELF',
      keyPhrases: [
        'Personally, I tend to prefer... because...',
        'One place I would strongly recommend is...',
        'In today\'s increasingly globalised world...',
        'What makes it particularly special is...',
        'I firmly believe that...',
      ],
      modelAnswer: `Q3 Model: In today's increasingly globalised world, I firmly believe that learning a foreign language is more important than ever. Not only does it open professional doors — with bilingual candidates often earning significantly more — but it also provides genuine insight into other cultures and ways of thinking, which fosters empathy and mutual understanding. From a personal perspective, learning a second language has dramatically expanded my opportunities both socially and professionally. That said, I do think the specific language matters — learning a widely spoken language like English, Mandarin, or Spanish is strategically more beneficial than learning a language with a smaller global presence.`,
      commonMistakes: [
        'Stopping at exactly 45 seconds mid-sentence. Speak slightly faster near the end rather than abruptly stopping.',
        'Q1: Just saying "I prefer travelling alone because it\'s free." Add: "I value the independence it gives me to spontaneously change my plans."',
        'Q2: Don\'t just describe. Speculate on WHY visitors should go: "It\'s unmissable because it gives you a genuine understanding of our culture."',
      ],
    },
    strategy: {
      title: 'Time Management in the Real Exam',
      content: 'Core (25 min / 50 Qs): 30 seconds per question max. If stuck, mark and move on — return at the end. Reading (35 min / 4 tasks): Spend 5 min on Part 1, 8 min on Part 2, 8 min on Part 3, 14 min on Part 4. Writing (50 min / 4 parts): Part 1: 8 min | Part 2: 7 min | Part 3: 12 min | Part 4: 20 min (both emails). Speaking (12 min): You cannot control time — the examiner moves you on. Practise being cut off mid-sentence — learn to conclude quickly.',
      tip: 'In Writing, always write Part 4 LAST even if it is hardest — it carries the most marks. Do not spend 30 minutes on Part 4 and rush Parts 1-3.',
    },
  },

  {
    day: 11,
    date: '9 May',
    title: 'Mock Core Test + Error Analysis',
    focus: 'Exam conditions · Speed · Accuracy',
    totalMinutes: 130,
    vocabulary: {
      topic: 'Politics & Society',
      words: [
        { word: 'legislation', definition: 'laws collectively', example: 'New legislation was passed to protect workers\' rights.' },
        { word: 'scrutinise', definition: 'examine carefully and critically', example: 'The new budget was scrutinised by both economists and politicians.' },
        { word: 'consensus', definition: 'general agreement', example: 'There is a growing consensus that action on climate change is urgent.' },
        { word: 'reform', definition: 'make changes to improve something', example: 'The government announced plans to reform the tax system.' },
        { word: 'transparent', definition: 'open and honest; not secretive', example: 'Citizens expect their government to be transparent about spending.' },
      ],
    },
    grammar: {
      focus: 'Prepositions in Context — common source of errors in Core',
      explanation: 'Prepositions at B2 are not just "in/on/at" — they appear in fixed expressions and collocations. Aptis Core tests: "at the expense of", "in spite of", "with regard to", "on behalf of", "in accordance with". These must be memorised as units.',
      tip: 'The most tested fixed prepositions: responsible FOR, aware OF, different FROM (NOT to in formal English), capable OF, successful IN (achieving), interested IN, depend ON, rely ON, based ON.',
      questions: [
        {
          sentence: 'The success of the project depends largely _____ effective communication.',
          options: ['on', 'in', 'of'],
          correctIndex: 0,
          explanation: '"Depend on" is a fixed collocation. Never "depend in" or "depend of".',
        },
        {
          sentence: 'The new policy was introduced _____ accordance with EU regulations.',
          options: ['in', 'on', 'at'],
          correctIndex: 0,
          explanation: '"In accordance with" = following the rules of. Fixed expression: always "in".',
        },
        {
          sentence: 'The CEO is responsible _____ making all final decisions.',
          options: ['for', 'of', 'to'],
          correctIndex: 0,
          explanation: '"Responsible for" is a fixed collocation. Never "responsible of".',
        },
        {
          sentence: 'This approach is significantly different _____ what we used to do.',
          options: ['from', 'to', 'than'],
          correctIndex: 0,
          explanation: 'In formal/academic English: "different from" is preferred. "Different to" is informal British English. "Different than" is American.',
        },
        {
          sentence: 'The manager spoke _____ behalf of the entire team.',
          options: ['on', 'in', 'at'],
          correctIndex: 0,
          explanation: '"On behalf of" = representing. Fixed expression: always "on".',
        },
      ],
    },
    writing: {
      part: 'Part 1 — Five Short Replies (timed: 8 minutes total)',
      prompt: 'Your friend Jamie has sent you five messages about planning a surprise birthday party for a mutual friend. Reply to each in 1–5 words. Message 1: "Should we do it next Saturday?" Message 2: "Can you bring some snacks?" Message 3: "How many people do you think are coming?" Message 4: "Is the venue booked?" Message 5: "What time should we start?"',
      wordLimit: '1–5 words per reply',
      template: `Reply concisely — the examiner checks:
1. Is it a natural, appropriate response?
2. Is it 1-5 words?
3. Does it actually answer the question?`,
      modelAnswer: `1. "Saturday sounds perfect!"
2. "Of course, no problem!"
3. "Around fifteen, I think."
4. "Yes, all confirmed."
5. "Seven o'clock?"

Note: These are natural, conversational responses that directly answer each question. Avoid: "Yes" alone (too short and no information) or full sentences like "I think we should start at seven o'clock in the evening" (too long).`,
      examinertip: 'Part 1 replies must be relevant AND informative within 5 words. "Yes" = 1 mark. "Yes, absolutely!" = better. "Yes, sounds great!" = best (2 words + tone). Every word counts.',
    },
    speaking: {
      part: 'Part 2 — Photo + 2 Follow-up Questions (Timed)',
      prompt: 'Photo: A group of adults in a community centre are learning to use computers. An instructor is helping an elderly woman with a laptop. Describe the photo (30s), then answer: Q1: What challenges might elderly people face when learning technology? (15s) Q2: How could communities better support digital inclusion for older generations? (30s)',
      preparationTime: '10 seconds',
      responseTime: '45 seconds total',
      keyPhrases: [
        'The photo depicts a...',
        'What is particularly striking is...',
        'In terms of challenges, elderly people might struggle with...',
        'One effective way communities could address this is by...',
        'This kind of initiative is invaluable because...',
      ],
      modelAnswer: `The photo depicts what appears to be a community digital literacy class, where an instructor is providing one-to-one support to an elderly participant. What is particularly striking is the patient, personalised approach being taken. In terms of challenges, elderly people might struggle with unfamiliar interfaces and the pace of technological change, having not grown up with digital devices. One highly effective way communities could address this is by offering free, regular drop-in sessions with trained volunteers — exactly what this photo seems to illustrate. This kind of initiative is invaluable because digital exclusion increasingly means social exclusion in today's world.`,
      commonMistakes: [
        'Spending all 45 seconds on description and leaving no time for the follow-up questions.',
        'Giving a one-word answer to follow-up questions: "Challenges? They forget things." Develop: "One significant challenge is the unfamiliarity with interface design..."',
        'Not connecting your answer back to the photo: "As we can see in the image, this type of support is clearly valued by participants."',
      ],
    },
    strategy: {
      title: 'Core Grammar: How to Eliminate Wrong Answers',
      content: 'In Aptis Core (multiple choice, 3 options), use these elimination strategies: (1) If two options differ only in tense, identify what tense the sentence requires and eliminate the wrong ones. (2) If the options are different words (verb/noun/adjective), check collocation — does the word fit naturally after the key word? (3) Read the WHOLE sentence before deciding — the end of the sentence often determines the grammar at the beginning. (4) Trust your instinct for the first elimination — it is usually correct at B2 level.',
      tip: 'In grammar questions, if you cannot decide between two options, look for agreement issues (subject-verb, noun-pronoun), tense consistency, and fixed expressions. Often one option violates a basic rule.',
    },
  },

  {
    day: 12,
    date: '10 May',
    title: 'Full Mock Speaking — All 4 Parts',
    focus: 'Timed simulation · Fluency · Confidence',
    totalMinutes: 140,
    vocabulary: {
      topic: 'Environment & Sustainability',
      words: [
        { word: 'biodiversity', definition: 'variety of plant and animal life in a habitat', example: 'Deforestation is the leading cause of biodiversity loss.' },
        { word: 'renewable', definition: 'energy from a naturally replenished source', example: 'The country aims to run entirely on renewable energy by 2035.' },
        { word: 'emissions', definition: 'substances (especially gases) released into the air', example: 'Transport accounts for 27% of total carbon emissions.' },
        { word: 'conservation', definition: 'the protection of the natural environment', example: 'Wildlife conservation efforts have helped several endangered species recover.' },
        { word: 'deforestation', definition: 'the clearing of forests on a large scale', example: 'Deforestation in the Amazon is accelerating despite international pressure.' },
      ],
    },
    grammar: {
      focus: 'Mixed Conditionals — the most complex structure tested at B2',
      explanation: 'Mixed conditionals combine elements of Type 2 and Type 3. They express: a past condition with a present result, or a present condition with a past result. Example: "If I had studied medicine (past condition), I would be a doctor now (present result)." This is very impressive in speaking and writing.',
      tip: 'Formula: "If + Past Perfect (past condition), would + infinitive (present result)." | "If + Past Simple (present condition), would have + past participle (past result)." The tense mixing is what makes them "mixed".',
      questions: [
        {
          sentence: 'If she _____ harder at university, she would have a better career now.',
          options: ['had studied', 'studied', 'would study'],
          correctIndex: 0,
          explanation: 'Mixed conditional: past action (studying) → present result (career). If clause = Past Perfect "had studied".',
        },
        {
          sentence: 'If he weren\'t so stubborn, he _____ accepted the help when it was offered.',
          options: ['would have', 'will have', 'would'],
          correctIndex: 0,
          explanation: 'Mixed conditional: present characteristic (stubborn) → past result (not accepting help). Result clause = "would have + past participle".',
        },
        {
          sentence: 'I _____ speak better Spanish now if I had practised more as a child.',
          options: ['would', 'would have', 'could have'],
          correctIndex: 0,
          explanation: 'Past condition → present result. Result clause = "would + infinitive" (present tense). "would speak" is correct.',
        },
        {
          sentence: 'If they had built the dam in the right location, we _____ the flooding now.',
          options: ["wouldn't be experiencing", "wouldn't have experienced", "won't experience"],
          correctIndex: 0,
          explanation: 'Past decision → present ongoing consequence. Result clause = "wouldn\'t be experiencing" (continuous to show ongoing present situation).',
        },
        {
          sentence: 'She _____ so well in the interview if she weren\'t such a confident person.',
          options: ["wouldn't have done", "wouldn't do", "didn't do"],
          correctIndex: 0,
          explanation: 'Present trait → past result. Result clause = "wouldn\'t have done" (past result of her present personality trait).',
        },
      ],
    },
    writing: {
      part: 'Part 3 — Two Extended Answers (30–40 words each)',
      prompt: 'Q1: Some people think that protecting the environment is the responsibility of governments, not individuals. Do you agree? Q2: How do you think transport will change in the next 20 years?',
      wordLimit: '30–40 words each',
      template: `Q1: [Position + "although"] [Main reason] [Consequence/nuance]
Q2: [Prediction + "I believe"] [Supporting reason] [Second prediction or contrasting view]`,
      modelAnswer: `Q1: While governments undoubtedly bear the primary responsibility for environmental legislation, I believe individuals also play a crucial role. Collective behavioural change — in consumption, transport, and diet — is essential and cannot be achieved through policy alone.

Q2: I believe that within 20 years, electric and autonomous vehicles will dominate urban transport, significantly reducing emissions. Additionally, the growth of high-speed rail networks will likely make short-haul flights largely obsolete for intercity travel.`,
      examinertip: 'Two Part 3 questions in a row (common in the real exam): Do NOT write the same structure for both. Use different opinion phrases and different grammatical structures to show range.',
    },
    speaking: {
      part: 'Full Mock Speaking Test — All 4 Parts in Sequence',
      prompt: 'Set a timer. Complete all 4 parts without stopping. Part 1 (3x 45s): Q1: What do you enjoy most about learning English? Q2: How has your neighbourhood changed in the past ten years? Q3: What is the most important skill a person needs in the modern world? — Part 2 (45s): A photo shows tourists queuing outside a famous museum in a busy European city. — Part 3 (45s): Photo A: Solo backpacker in a remote mountain landscape. Photo B: A family on a guided tour bus in a city. — Part 4 (2 min): An image shows a large fast food restaurant packed with customers. Discuss eating habits and public health.',
      preparationTime: 'As per real exam',
      responseTime: 'Full exam timing',
      keyPhrases: [
        'OREO: Opinion → Reason → Example → Outcome',
        '3-Point Plan for Part 4: Cause → Effect → Solution',
        'Filler phrases: "That\'s a thought-provoking question...", "I\'d have to say that..."',
        'Contrast phrases for Part 3: "While Photo A depicts..., Photo B, on the other hand..."',
        'Conclusion phrases: "On balance...", "All things considered...", "Ultimately..."',
      ],
      modelAnswer: `Part 4 Model: This photograph of a busy fast food restaurant reflects a significant and concerning shift in eating habits over recent decades. The rise of ultra-processed food consumption can be attributed to several factors: busy modern lifestyles that leave little time for cooking, aggressive marketing particularly targeted at children, and the relatively low cost of fast food compared to fresh ingredients. The consequences for public health are well documented — rising rates of obesity, type 2 diabetes, and cardiovascular disease place enormous strain on healthcare systems. However, I think there are practical solutions. Governments could introduce clearer food labelling, tax high-sugar and high-fat products, and subsidise fresh produce to make healthy eating more accessible and affordable. At an individual level, greater nutritional education — particularly in schools — could help shift cultural attitudes towards food. Ultimately, this is an issue that requires coordinated action at every level of society.`,
      commonMistakes: [
        'Part 1 Q3 ("most important skill"): Do NOT say "communication" and stop. Develop WHY: "In an era of information overload, critical thinking enables people to distinguish reliable information from misinformation, which has never been more vital."',
        'Part 4: Not giving solutions. The examiner expects: Problem + Cause + Effect + SOLUTION. Without a solution, your answer seems incomplete.',
        'Speaking without pausing at all. Short, natural pauses show you are thinking, not reading. They make your speech sound more native.',
      ],
    },
    strategy: {
      title: 'Day Before the Exam: The Final 24 Hours',
      content: 'DO: Read 30 minutes of English (newspaper, magazine). Review your 10 B2 grammar structures. Practise ONE speaking answer aloud. Check your test centre location and arrival time. Prepare your ID. Sleep at least 7 hours. DO NOT: Study new material. Attempt a full mock exam — it will drain your energy. Cram vocabulary lists. Stay up past midnight.',
      tip: 'Your performance on exam day will depend 30% on what you know and 70% on how clear your mind is. Anxiety management is part of exam technique at B2 level.',
    },
  },

  {
    day: 13,
    date: '11 May',
    title: 'Final Grammar Sprint + Writing Review',
    focus: 'Error correction · Speed drills · High-value patterns',
    totalMinutes: 150,
    vocabulary: {
      topic: 'Globalisation & International Relations',
      words: [
        { word: 'globalisation', definition: 'the process of international integration', example: 'Globalisation has both accelerated economic growth and increased inequality.' },
        { word: 'multilateral', definition: 'involving more than two nations', example: 'Climate change requires a multilateral response.' },
        { word: 'disparity', definition: 'a great difference', example: 'The disparity in wealth between countries is growing.' },
        { word: 'bilateral', definition: 'involving two groups or countries', example: 'The two nations signed a bilateral trade agreement.' },
        { word: 'diplomacy', definition: 'the profession of managing international relations', example: 'Skilled diplomacy averted a potentially serious conflict.' },
      ],
    },
    grammar: {
      focus: 'Error Correction Sprint — 5 sentences with typical B1→B2 errors',
      explanation: 'These errors are the most common in Aptis Core for students at B1 level moving to B2. Each one represents a pattern, not just a single mistake. Identifying the pattern is more valuable than memorising the answer.',
      tip: 'In multiple-choice, always ask: "Is this grammatically possible in English?" If you are unsure, say the sentence aloud — your language instinct at B2 will often tell you if something sounds wrong.',
      questions: [
        {
          sentence: 'I am looking forward to _____ you at the conference next month.',
          options: ['seeing', 'see', 'have seen'],
          correctIndex: 0,
          explanation: '"Look forward to + gerund (-ing)." The "to" here is a preposition, NOT part of an infinitive. A very common B1 error: "look forward to see" ✗.',
        },
        {
          sentence: 'It was such _____ interesting film that we watched it twice.',
          options: ['an', 'a', 'the'],
          correctIndex: 0,
          explanation: '"Such + a/an + adjective + noun." "Such an interesting film." (NOT "such a interesting" — use "an" before vowel sounds). "So" takes an adjective without a noun: "so interesting".',
        },
        {
          sentence: 'The more you practise speaking, _____ you become.',
          options: ['the more confident', 'more confident', 'the confident'],
          correctIndex: 0,
          explanation: 'Double comparative: "the more..., the more/better/faster..." Both parts need "the". "The more you practise, the more confident you become."',
        },
        {
          sentence: 'Despite _____ tired, she continued working until midnight.',
          options: ['being', 'be', 'to be'],
          correctIndex: 0,
          explanation: '"Despite" is ALWAYS followed by a noun or gerund (-ing). "Despite being tired" ✓. Never "Despite be/to be".',
        },
        {
          sentence: 'By this time next year, I _____ here for exactly a decade.',
          options: ['will have been working', 'will be working', 'have been working'],
          correctIndex: 0,
          explanation: '"By this time next year" triggers Future Perfect (or Future Perfect Continuous for ongoing duration). "will have been working" emphasises the duration up to that point.',
        },
      ],
    },
    writing: {
      part: 'Part 4 — Both Emails (Timed Simulation: 20 minutes total)',
      prompt: 'Informal (40-60w): Your friend has just started a new job and is feeling nervous. Write a message offering encouragement and a practical tip. | Formal (120-150w): You have seen a job advertisement for an English teacher at a language school. Write a formal email of application explaining why you are suitable for the position.',
      wordLimit: '40–60 + 120–150 words',
      template: `INFORMAL: Hi [Name]! [Empathy]. [Encouragement]. [Practical tip]. [Positive close]. Sign-off.

FORMAL: Dear [Name/Title],
I am writing to apply for the position of [role] as advertised on [where].
Para 1: Why you are applying + enthusiasm.
Para 2: Relevant experience/skills.
Para 3: What you offer + call to action.
Yours sincerely/faithfully, [Name]`,
      modelAnswer: `INFORMAL: Hi Sofia! Starting a new job is nerve-wracking for everyone, but you're incredibly capable and will settle in quickly. My top tip: ask lots of questions in the first week — it shows enthusiasm, not weakness. You've totally got this! Good luck!

FORMAL: Dear Ms Henderson,

I am writing to apply for the position of English Teacher as advertised on your school's website last week. Having read the job description carefully, I am confident that my background and experience make me a strong candidate for this role.

I hold a B2 English qualification and have three years of experience tutoring adult learners in both group and one-to-one settings. During this time, I developed and delivered structured learning programmes tailored to individual needs, which consistently resulted in measurable improvements in my students' exam performance.

I am enthusiastic about the opportunity to contribute to your school's excellent reputation and would welcome the chance to discuss my application further. I have attached my CV for your consideration.

Yours sincerely,
A. Applicant`,
      examinertip: 'Application letter power phrases: "I am confident that my experience makes me a strong candidate", "Having carefully read the job description...", "I would welcome the opportunity to discuss...", "I have attached my CV for your consideration", "I look forward to hearing from you at your earliest convenience."',
    },
    speaking: {
      part: 'Part 4 — High-Pressure Drill (2 minutes, complex topic)',
      prompt: 'Image: A split image showing a wealthy city skyline on one side and a poverty-stricken urban area on the other. Discuss: What are the main causes of economic inequality within cities? What steps could governments take to address this? Is complete economic equality possible or desirable?',
      preparationTime: '10 seconds',
      responseTime: '2 minutes',
      keyPhrases: [
        'Economic inequality within cities arises from a complex interplay of factors...',
        'Perhaps the most fundamental cause is...',
        'In terms of government intervention...',
        'Regarding the question of whether equality is desirable...',
        'I would argue that while perfect equality is neither achievable nor perhaps even beneficial...',
      ],
      modelAnswer: `Economic inequality within cities arises from a complex interplay of historical, structural, and policy factors. Perhaps the most fundamental cause is the concentration of high-skilled, high-wage jobs in certain sectors and locations, which benefits those with access to quality education while excluding those without. Inherited wealth compounds this further — the gap between those who inherit property and those who do not is widening in most major cities. In terms of government intervention, affordable housing programmes, progressive taxation, and investment in public education and transport in underserved areas are among the most evidence-based approaches. Regarding the final question — whether complete equality is possible or desirable — I would argue that while perfect equality is neither achievable nor perhaps even beneficial to economic dynamism, extreme inequality is socially corrosive and demonstrably linked to higher crime rates, lower social mobility, and worse public health outcomes. The goal should be equity of opportunity, not equality of outcome.`,
      commonMistakes: [
        'Only discussing causes without addressing solutions and the final philosophical question. All THREE parts of a multi-question prompt must be addressed.',
        'Using "poor people" — upgrade to "those on lower incomes", "economically disadvantaged communities", "people experiencing financial hardship".',
        'Running out of content at 1 minute 20. Have a contingency: "It\'s also worth considering the role of... / One often-overlooked factor is..."',
      ],
    },
    strategy: {
      title: 'Exam Day Morning Routine',
      content: 'Wake up 2.5 hours before your exam. Eat a proper meal — your brain needs fuel. Read something in English for 20 minutes (activates your language processing). Review 5 vocabulary words and 3 grammar structures (not new ones — revision only). Arrive at the test centre 20 minutes early. Take ID, water, and a pen. In the waiting room: breathe slowly, do not discuss the exam with other candidates (it increases anxiety).',
      tip: 'Before each section of the exam, take one slow breath and say to yourself: "I know this material. I have prepared. I am ready." Anxiety comes from feeling unprepared — remind yourself that you are not unprepared.',
    },
  },

  {
    day: 14,
    date: '12 May',
    title: 'Final Day — Confidence & Strategy',
    focus: 'Exam technique · Mindset · Review key patterns',
    totalMinutes: 90,
    vocabulary: {
      topic: 'Essential B2 Academic Vocabulary',
      words: [
        { word: 'substantiate', definition: 'to provide evidence to support a claim', example: 'The researcher needed to substantiate her findings with data.' },
        { word: 'incorporate', definition: 'to include something as part of a whole', example: 'Try to incorporate at least one B2 structure in each speaking answer.' },
        { word: 'coherent', definition: 'logical and consistent', example: 'Your essay must present a coherent argument from start to finish.' },
        { word: 'articulate', definition: 'to express clearly in words', example: 'At B2 level, you should be able to articulate complex ideas with accuracy.' },
        { word: 'demonstrate', definition: 'clearly show or prove', example: 'Use the exam to demonstrate your full range of English.' },
      ],
    },
    grammar: {
      focus: 'Final Review — 5 Mixed High-Value Questions',
      explanation: 'One final grammar sprint covering the 5 most impactful patterns. These represent the difference between B1+ and B2. Get all 5 right and you are ready.',
      tip: 'Last reminder: in Aptis Core, there are no penalties for wrong answers. If you do not know — guess. Never leave a question blank.',
      questions: [
        {
          sentence: 'Had I known about the changes, I _____ the meeting differently.',
          options: ['would have prepared', 'had prepared', 'would prepare'],
          correctIndex: 0,
          explanation: 'Inverted Third Conditional: "Had I known..." = "If I had known...". Result = "would have prepared". This inverted form is formal and B2+.',
        },
        {
          sentence: 'It is high time the government _____ action on housing costs.',
          options: ['took', 'takes', 'would take'],
          correctIndex: 0,
          explanation: '"It is high time + Past Simple." This is a fixed expression meaning the action is overdue. "took" is correct — not "takes" or "to take".',
        },
        {
          sentence: 'The report was _____ to help policymakers make better-informed decisions.',
          options: ['commissioned', 'committing', 'complied'],
          correctIndex: 0,
          explanation: '"Commission a report" = to officially order someone to produce it. "Commissioned" is correct in this passive context.',
        },
        {
          sentence: 'Not until she retired _____ how much her work had meant to her colleagues.',
          options: ['did she realise', 'she realised', 'she had realised'],
          correctIndex: 0,
          explanation: 'Inversion after "Not until...": auxiliary "did" + subject "she" + verb. "did she realise" ✓',
        },
        {
          sentence: 'The scheme _____ out to be far more costly than originally anticipated.',
          options: ['turned', 'proved', 'came'],
          correctIndex: 0,
          explanation: '"Turn out to be" = to have a result that was not expected. A key phrasal verb for Writing and Speaking at B2.',
        },
      ],
    },
    writing: {
      part: 'Final Polish — Model Review & Self-Assessment',
      prompt: 'Re-read your best formal email from this programme. Identify: (1) One grammar structure you are proud of. (2) One vocabulary upgrade you used. (3) One area that could still be improved. This metacognitive exercise trains the examiner\'s eye within yourself.',
      wordLimit: 'Reflection exercise — no word count',
      template: `WHAT B2 FORMAL EMAILS MUST HAVE:
✓ Dear + Title + Surname (or Dear Sir/Madam)
✓ Opening: "I am writing with regard to / in response to / to enquire about"
✓ No contractions whatsoever
✓ At least one passive voice construction
✓ At least one formal modal: "I would be grateful if...", "I would appreciate..."
✓ One complex sentence with a subordinate clause
✓ Closing: "I look forward to hearing from you"
✓ Yours sincerely (named recipient) / Yours faithfully (Dear Sir/Madam)
✓ 120–150 words EXACTLY`,
      modelAnswer: `WHAT SEPARATES A B2 FROM A B1 FORMAL EMAIL:

B1 email: "I am writing because I have a complaint. The hotel was bad. The room was small. The AC didn't work. I want my money back. Please reply."

B2 email: "I am writing to express my considerable dissatisfaction regarding my recent stay at your establishment. I am afraid the standard of accommodation fell significantly short of what was advertised. Specifically, the room provided was noticeably smaller than depicted on your website, and the air conditioning unit was entirely non-functional throughout my stay. In light of these shortcomings, I would be grateful if you could consider a partial refund of no less than 40%. I look forward to receiving your response at your earliest convenience."

The B2 email has: formal vocabulary, passive voice, specific details, polite but firm tone, and correct formal register throughout.`,
      examinertip: 'On exam day, write your formal email draft for 3 minutes before writing the final version. It seems to waste time but actually saves it — you will not need to cross things out or restructure mid-email.',
    },
    speaking: {
      part: 'Final Speaking Checklist — 10 Questions in 10 Minutes',
      prompt: 'Answer each question in exactly 20–30 seconds as a quick-fire drill. Focus on starting strong and ending clean. 1) What motivates you to learn English? 2) Describe your ideal workplace. 3) Compare studying at home vs in a library. 4) Is social media doing more harm than good? 5) What makes a good leader? 6) Describe a photo of people volunteering in a park. 7) Compare two photos: one person cooking at home, one eating at a restaurant. 8) Should university education be free? 9) How is technology changing education? 10) What would you do if you had unlimited free time?',
      preparationTime: '5 seconds per question',
      responseTime: '25–30 seconds per question',
      keyPhrases: [
        'Opening strong: "That\'s a great question. Personally, I believe..."',
        'Buying time: "Let me think about that for a moment..."',
        'Developing: "What\'s more...", "Furthermore...", "In addition to this..."',
        'Concluding clean: "...which is why I think X is essential/preferable/beneficial."',
        'Speculating: "I would imagine that...", "It seems to me that...", "I\'d guess that..."',
      ],
      modelAnswer: `Q4 Model (20-30s): Social media is without doubt doing more harm than good overall. While it connects people across the world, the damage to mental health — particularly among teenagers — and the spread of dangerous misinformation are, in my view, far more significant consequences. We urgently need stronger regulation.

Q8 Model (20-30s): I strongly believe university education should be free or heavily subsidised. Charging high fees effectively penalises students from lower-income backgrounds for pursuing knowledge, which is both socially unjust and economically counterproductive — society needs educated graduates across all income levels.`,
      commonMistakes: [
        'FINAL REMINDER: Never start an answer with "I think that..." alone. Upgrade: "I strongly believe...", "From my perspective...", "In my view..."',
        'FINAL REMINDER: In Part 4, always give at least 2 causes OR 2 effects OR 1 cause + 1 solution.',
        'FINAL REMINDER: Word count in Writing is checked by the examiner. Under the minimum = marks deducted. Over the maximum = marks deducted. Stay within the range.',
      ],
    },
    strategy: {
      title: 'Your B2 Exam Day Checklist',
      content: '✓ Bring: Passport or national ID (accepted by British Council), water, pen (for notes in Reading/Listening). ✓ Core: 30 seconds max per question. Flag and return. Trust your instinct. ✓ Reading: Questions first, then skim, then scan for answers. ✓ Listening: Read options before audio plays. Note key words. Do not re-check — move forward. ✓ Writing: Time allocation — Part 1: 8 min, Part 2: 7 min, Part 3: 12 min, Part 4: 20 min. Draft first, then write final version. ✓ Speaking: OREO for Parts 1 & 4. Compare + opinion for Part 3. Describe + speculate for Part 2. Smile — you are more fluent when relaxed.',
      tip: 'You have done 14 days of intensive preparation. Trust your preparation. The exam is not harder than what you have been practising — it just feels that way because of the pressure. Take a breath. You are ready.',
    },
  },
]
