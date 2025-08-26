import { QuizAnswers, PlanDay, UserPlan } from '../../types';

const SCRIPTURES = [
  'Psalm 23:1-3 (ESV)',
  'Matthew 6:9-13 (ESV)',
  'John 3:16-17 (ESV)',
  'Romans 8:28-30 (ESV)',
  'Philippians 4:6-7 (ESV)',
  'Colossians 3:23-24 (ESV)',
  '1 John 4:7-8 (ESV)'
];

const HABITS = [
  'Prayer',
  'Scripture Reading',
  'Sabbath Rest',
  'Silence & Solitude',
  'Fasting',
  'Community',
  'Generosity',
  'Service',
  'Witness'
];

const OBSERVE_PROMPTS = {
  beginner: [
    'What words or phrases stand out to you?',
    'What emotions do you feel as you read this?'
  ],
  intermediate: [
    'What patterns or themes do you notice?',
    'How does this connect to other parts of Scripture?',
    'What questions does this raise for you?'
  ],
  advanced: [
    'What literary devices or structures do you see?',
    'How does this passage fit into the broader biblical narrative?',
    'What cultural or historical context is important here?',
    'How does this passage point to Christ?'
  ]
};

const INTERPRET_PROMPTS = {
  beginner: [
    'What do you think this passage means?',
    'What is God trying to tell us here?'
  ],
  intermediate: [
    'What is the main message or truth being communicated?',
    'How does this passage reveal God\'s character?',
    'What does this teach us about human nature?'
  ],
  advanced: [
    'What theological themes are present in this passage?',
    'How does this passage contribute to the overall biblical story?',
    'What does this reveal about God\'s redemptive plan?',
    'How does this passage challenge or affirm your understanding?'
  ]
};

const APPLY_PROMPTS = {
  beginner: [
    'How can you apply this truth to your life today?',
    'What would it look like to live this out?'
  ],
  intermediate: [
    'What specific actions can you take based on this passage?',
    'How does this change your perspective or priorities?',
    'What areas of your life need to be transformed by this truth?'
  ],
  advanced: [
    'How can you share this truth with others?',
    'What does this call you to sacrifice or change?',
    'How does this passage inform your role in God\'s mission?',
    'What does this reveal about your need for God\'s grace?'
  ]
};

const PRAYER_PROMPTS = [
  'Thank God for His presence and guidance in your life.',
  'Ask God to help you understand and apply His Word today.',
  'Pray for strength to live out the truth you\'ve learned.',
  'Ask God to reveal areas where you need His transformation.',
  'Thank God for His grace and mercy in your journey.',
  'Pray for opportunities to share God\'s love with others.',
  'Ask God to help you find rest and renewal in Him.'
];

const JOURNAL_HINTS = [
  'Reflect on today\'s scripture and your response.',
  'Write about how God is working in your life.',
  'Note any insights or questions from today\'s reading.',
  'Record your prayers and God\'s answers.',
  'Reflect on your spiritual growth journey.',
  'Write about challenges and victories in your faith.',
  'Document moments of God\'s presence and guidance.'
];

function getMaturityLevel(answers: QuizAnswers): 'beginner' | 'intermediate' | 'advanced' {
  if (answers.spiritualJourney === 'just_starting' || answers.spiritualJourney === '1_year') {
    return 'beginner';
  } else if (answers.spiritualJourney === '2_5_years') {
    return 'intermediate';
  } else {
    return 'advanced';
  }
}

function getHabitIntensity(answers: QuizAnswers): number {
  const habitCount = Object.values(answers.currentHabits).filter(
    freq => freq === 'daily' || freq === 'several_week'
  ).length;
  
  if (habitCount >= 5) return 3; // High intensity
  if (habitCount >= 2) return 2; // Medium intensity
  return 1; // Low intensity
}

function generateHabitTask(habit: string, intensity: number, dayNumber: number): string {
  const tasks = {
    'Prayer': [
      'Spend 5 minutes in quiet prayer, focusing on gratitude',
      'Pray through the Lord\'s Prayer slowly and thoughtfully',
      'Set aside 15 minutes for intercessory prayer for others'
    ],
    'Scripture Reading': [
      'Read today\'s passage slowly, highlighting key verses',
      'Read the passage multiple times, noting different insights',
      'Study the context and background of today\'s scripture'
    ],
    'Sabbath Rest': [
      'Take a 30-minute break from all screens and devices',
      'Spend time in nature or doing something that brings you joy',
      'Reflect on God\'s goodness and rest in His presence'
    ],
    'Silence & Solitude': [
      'Find a quiet place and sit in silence for 5 minutes',
      'Practice listening prayer for 10 minutes',
      'Spend 20 minutes in solitude, focusing on God\'s presence'
    ],
    'Fasting': [
      'Skip one meal and use that time to pray',
      'Fast from social media for the day',
      'Choose to fast from something meaningful to you today'
    ],
    'Community': [
      'Reach out to a friend or family member with encouragement',
      'Attend a small group or Bible study',
      'Share what you\'re learning with someone else'
    ],
    'Generosity': [
      'Give a small gift or act of kindness to someone',
      'Donate to a cause that matters to you',
      'Look for opportunities to be generous with your time'
    ],
    'Service': [
      'Help someone with a practical need today',
      'Volunteer for a service opportunity',
      'Look for ways to serve in your community'
    ],
    'Witness': [
      'Pray for opportunities to share your faith',
      'Be ready to share what God is doing in your life',
      'Look for natural ways to mention Jesus in conversations'
    ]
  };

  const habitTasks = tasks[habit as keyof typeof tasks] || ['Reflect on this habit and how to grow in it'];
  return habitTasks[Math.min(intensity - 1, habitTasks.length - 1)];
}

export function generatePlan(answers: QuizAnswers): UserPlan {
  const maturity = getMaturityLevel(answers);
  const intensity = getHabitIntensity(answers);
  const days: PlanDay[] = [];
  
  // Ensure Sabbath appears only once per week
  const habitsWithoutSabbath = HABITS.filter(h => h !== 'Sabbath Rest');
  const sabbathDay = Math.floor(Math.random() * 7) + 1;
  
  for (let day = 1; day <= 7; day++) {
    const isSabbathDay = day === sabbathDay;
    const availableHabits = isSabbathDay ? ['Sabbath Rest'] : habitsWithoutSabbath;
    const selectedHabit = availableHabits[Math.floor(Math.random() * availableHabits.length)];
    
    const dayPlan: PlanDay = {
      dayNumber: day as 1 | 2 | 3 | 4 | 5 | 6 | 7,
      scriptureRef: SCRIPTURES[day - 1],
      observePrompts: OBSERVE_PROMPTS[maturity].slice(0, maturity === 'beginner' ? 1 : maturity === 'intermediate' ? 2 : 3),
      interpretPrompts: INTERPRET_PROMPTS[maturity].slice(0, maturity === 'beginner' ? 1 : maturity === 'intermediate' ? 2 : 3),
      applyPrompts: APPLY_PROMPTS[maturity].slice(0, maturity === 'beginner' ? 1 : maturity === 'intermediate' ? 2 : 3),
      prayerPrompt: PRAYER_PROMPTS[day - 1],
      habitTask: generateHabitTask(selectedHabit, intensity, day),
      estimatedMinutes: answers.dailyMinutes,
      journalHint: JOURNAL_HINTS[day - 1]
    };
    
    days.push(dayPlan);
  }
  
  return {
    id: `plan_${Date.now()}`,
    createdAt: new Date(),
    quizAnswers: answers,
    days
  };
}





