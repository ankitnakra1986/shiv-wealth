import type { EfficiencyScore, EfficiencyFactor, TrendDirection } from '@/types/efficiency';

function deriveTrend(current: number, previous: number): TrendDirection {
  const delta = current - previous;
  if (delta >= 3) return 'improving';
  if (delta <= -3) return 'declining';
  return 'stable';
}

const factors: EfficiencyFactor[] = [
  {
    id: 'factor-asset-allocation',
    name: 'Asset Allocation',
    score: 74,
    previousScore: 68,
    trend: deriveTrend(74, 68),
    weight: 20,
    explanation: 'How well your portfolio is diversified across asset classes relative to your risk profile.',
    recommendation: 'Reduce real estate concentration — currently 25% of wealth. Target under 20%.',
  },
  {
    id: 'factor-insurance-coverage',
    name: 'Insurance Coverage',
    score: 55,
    previousScore: 55,
    trend: deriveTrend(55, 55),
    weight: 15,
    explanation: 'Whether your life and health cover adequately protects your family\'s financial position.',
    recommendation: 'Your term cover of ₹1 crore is under-insured. Recommended: ₹3–4 crore given wealth and dependents.',
  },
  {
    id: 'factor-tax-efficiency',
    name: 'Tax Efficiency',
    score: 80,
    previousScore: 75,
    trend: deriveTrend(80, 75),
    weight: 18,
    explanation: 'How effectively your investments are structured to minimise tax drag on returns.',
    recommendation: 'ELSS allocation is optimised. Consider harvesting long-term losses in equity before March 31.',
  },
  {
    id: 'factor-liquidity',
    name: 'Liquidity',
    score: 62,
    previousScore: 70,
    trend: deriveTrend(62, 70),
    weight: 17,
    explanation: 'The proportion of your wealth accessible within 30 days without penalty or loss.',
    recommendation: 'FD lock-ins reduced liquid buffer this quarter. Maintain at least ₹80L in liquid instruments.',
  },
  {
    id: 'factor-debt-management',
    name: 'Debt Management',
    score: 88,
    previousScore: 85,
    trend: deriveTrend(88, 85),
    weight: 15,
    explanation: 'Your credit health, loan-to-asset ratio, and repayment discipline.',
    recommendation: 'Excellent CIBIL score of 812. No action needed — continue current repayment pattern.',
  },
  {
    id: 'factor-goal-alignment',
    name: 'Goal Alignment',
    score: 71,
    previousScore: 68,
    trend: deriveTrend(71, 68),
    weight: 15,
    explanation: 'How closely your current investment strategy maps to your stated financial goals.',
    recommendation: 'Retirement SIP is well-aligned. Increase Child Education SIP by ₹15,000/month to close the 2028 gap.',
  },
];

function computeOverall(fs: EfficiencyFactor[]): number {
  const weighted = fs.reduce((sum, f) => sum + f.score * (f.weight / 100), 0);
  return Math.round(weighted);
}

function computePreviousOverall(fs: EfficiencyFactor[]): number {
  const weighted = fs.reduce((sum, f) => sum + f.previousScore * (f.weight / 100), 0);
  return Math.round(weighted);
}

export const mockEfficiencyScore: EfficiencyScore = {
  overall: computeOverall(factors),           // 72
  previousOverall: computePreviousOverall(factors), // 70
  factors,
  lastUpdated: '2026-03-30T09:00:00.000Z',
};
