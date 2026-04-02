import type { Goal } from '@/types/goal';

export const mockGoals: Goal[] = [
  {
    id: 'goal-001',
    name: 'Child Education',
    category: 'education',
    description: "Undergraduate education abroad for Arjun (currently age 6)",
    targetAmount:  3200000, // ₹32 lakh
    currentAmount: 1984000, // ₹19.84 lakh
    progressPercent: 62,
    gapAmount: 1216000,     // ₹12.16 lakh (3200000 - 1984000; displayed as ~₹12L in UI)
    targetYear: 2028,
    status: 'needs-attention',
    colorCue: 'amber',
  },
  {
    id: 'goal-002',
    name: 'Retirement',
    category: 'retirement',
    description: 'Sustain ₹60L/year lifestyle post-retirement — corpus at age 60',
    targetAmount:  120000000, // ₹12 crore (₹60L/yr at 4% withdrawal rate for 25+ years)
    currentAmount:  48000000, // ₹4.8 crore (40% progress)
    progressPercent: 40,
    gapAmount: 72000000,      // ₹7.2 crore — meaningful, creates real urgency
    targetAge: 60,
    status: 'needs-attention',
    colorCue: 'amber',
  },
  {
    id: 'goal-003',
    name: 'Lifestyle Fund',
    category: 'lifestyle',
    description: 'Travel and experiences fund for family — annual international holiday',
    targetAmount:  1800000, // ₹18 lakh
    currentAmount:  810000, // ₹8.1 lakh
    progressPercent: 45,
    gapAmount: 990000,      // ₹9.9 lakh (1800000 - 810000; user spec said ~₹8L, actual is ₹9.9L)
    targetYear: 2027,
    status: 'needs-attention',
    colorCue: 'amber',
  },
];
