import type { IPSQuestion, IPSSummary } from '@/types/ips';

export const ipsQuestions: IPSQuestion[] = [
  {
    id: 1,
    question:
      'Rahul, what does financial freedom look like for you — what does your life look like when money is no longer a constraint?',
    category: 'goals',
  },
  {
    id: 2,
    question:
      'If your portfolio dropped 20% tomorrow, what would your instinct be — sell, hold, or invest more?',
    category: 'risk',
  },
  {
    id: 3,
    question:
      'How long can you comfortably go without accessing this money?',
    category: 'liquidity',
  },
  {
    id: 4,
    question:
      'Which of your goals would you sacrifice last — and why?',
    category: 'goals',
  },
  {
    id: 5,
    question:
      'Do you have enough insurance to protect your family if something happened to you today?',
    category: 'values',
  },
  {
    id: 6,
    question:
      'What does your biggest financial mistake teach you about how you make decisions?',
    category: 'behavior',
  },
  {
    id: 7,
    question:
      'How involved do you want to be — do you want to understand every decision, or do you trust your advisor to act?',
    category: 'behavior',
  },
  {
    id: 8,
    question:
      'Are there any sectors, companies, or types of investments you\'d never put money into — ethical, personal, or otherwise?',
    category: 'values',
  },
  {
    id: 9,
    question:
      'What\'s your single biggest financial anxiety right now?',
    category: 'anxiety',
  },
  {
    id: 10,
    question:
      'In 10 years, what\'s the one number that would make you feel like you\'ve won?',
    category: 'goals',
  },
];

/** Pre-filled summary used for dashboard preview before IPS is completed */
export const mockIPSSummary: IPSSummary = {
  investorId: 'inv-001',
  completedAt: '2026-03-15T11:45:00.000Z',
  answers: [
    {
      questionId: 1,
      answer:
        'Not worrying about school fees, not checking my portfolio every morning. Spending three months abroad with my family.',
      timestamp: '2026-03-15T11:05:00.000Z',
    },
    {
      questionId: 2,
      answer: 'Hold — and probably invest a bit more if the fundamentals haven\'t changed.',
      timestamp: '2026-03-15T11:08:00.000Z',
    },
    {
      questionId: 3,
      answer: 'Honestly, 3–4 years. I have a stable income. I don\'t need to touch investments.',
      timestamp: '2026-03-15T11:11:00.000Z',
    },
    {
      questionId: 4,
      answer: "Arjun's education. That one I won't compromise on.",
      timestamp: '2026-03-15T11:14:00.000Z',
    },
    {
      questionId: 5,
      answer: "Probably not. I know my term plan is old and underpowered. I've been meaning to fix it.",
      timestamp: '2026-03-15T11:17:00.000Z',
    },
    {
      questionId: 6,
      answer: "I over-concentrated in one sector stock in 2018. Lost 40%. Taught me diversification isn't just theory.",
      timestamp: '2026-03-15T11:21:00.000Z',
    },
    {
      questionId: 7,
      answer: 'I want to understand the rationale. I don\'t need to approve every trade, but I want to know why.',
      timestamp: '2026-03-15T11:24:00.000Z',
    },
    {
      questionId: 8,
      answer: 'Nothing in tobacco, defence weapons, or anything I can\'t explain to my son.',
      timestamp: '2026-03-15T11:28:00.000Z',
    },
    {
      questionId: 9,
      answer: "That I'll have built all this wealth and still fall short when it actually matters — Arjun's college, our retirement.",
      timestamp: '2026-03-15T11:32:00.000Z',
    },
    {
      questionId: 10,
      answer: '₹30 crore. Enough that money is a tool, not a worry.',
      timestamp: '2026-03-15T11:35:00.000Z',
    },
  ],
  derivedRiskProfile: 'Moderate-Aggressive',
  derivedGoalPriority: ['Child Education', 'Retirement', 'Lifestyle Fund'],
  derivedValues: ['Family security', 'Education as legacy', 'Ethical investing', 'Informed autonomy'],
  advisorNote:
    "Rahul's primary anxiety is sufficiency — not returns. He is comfortable with long-term equity risk but needs visible progress on his goals. Recommend monthly goal-progress check-ins and proactive alerts when any goal drops below 60%.",
};
