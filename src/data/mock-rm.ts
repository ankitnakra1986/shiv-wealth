import type { RelationshipManager, RMRecommendation } from '@/types/rm';

export const mockRM: RelationshipManager = {
  id: 'rm-001',
  name: 'Priya Mehta',
  designation: 'Senior Wealth Advisor',
  experience: '9 years',
  certification: 'CFA Level II',
  firm: 'Shiv Wealth',
  photoUrl: '/priya-mehta.jpg',
  email: 'priya.mehta@shivwealth.in',
  phone: '+91 98100 55321',
};

export const mockRecommendations: RMRecommendation[] = [
  {
    id: 'rec-001',
    rmId: 'rm-001',
    investorId: 'inv-001',
    title: 'Rebalance Equity Allocation',
    summary:
      'Your equity exposure has drifted to 43% — above your target of 35%. I recommend booking partial profits and moving ₹12L into short-duration debt funds.',
    rationale:
      'Market valuations are stretched in mid-cap. With your retirement horizon at 12 years, locking in gains now and rebuilding a debt buffer protects against a 15–20% correction. This also improves your Liquidity score by ~8 points.',
    urgency: 'high',
    category: 'rebalancing',
    status: 'pending',
    createdAt: '2026-03-28T10:30:00.000Z',
    expiresAt: '2026-04-07T23:59:00.000Z',
    impactAmount: 1200000, // ₹12 lakh move
  },
  {
    id: 'rec-002',
    rmId: 'rm-001',
    investorId: 'inv-001',
    title: 'Increase Child Education SIP',
    summary:
      'Arjun\'s education goal is at 62% with a ₹12L gap and only 2 years to target. Increasing SIP by ₹15,000/month closes this gap by mid-2027.',
    rationale:
      'Current SIP of ₹25,000/month into an equity hybrid fund is insufficient given the 2028 deadline. Switching to a target-maturity debt fund and increasing contribution captures stable returns without equity volatility risk over a short horizon.',
    urgency: 'medium',
    category: 'goal-alignment',
    status: 'pending',
    createdAt: '2026-03-29T14:00:00.000Z',
    expiresAt: '2026-04-15T23:59:00.000Z',
    impactAmount: 1200000,
  },
  {
    id: 'rec-003',
    rmId: 'rm-001',
    investorId: 'inv-001',
    title: 'Enhance Term Insurance Cover',
    summary:
      'Your current term cover of ₹1 crore is significantly under-insured relative to ₹15.3 crore in wealth and family liabilities. Recommended cover: ₹4 crore.',
    rationale:
      'Standard practice for HNIs is to cover 10x annual income or 30–40% of net worth for dependents. With a 6-year-old son and spouse, a ₹4 crore term plan adds ₹18,000/year in premium — negligible relative to the protection it provides.',
    urgency: 'medium',
    category: 'insurance',
    status: 'pending',
    createdAt: '2026-03-30T09:15:00.000Z',
    impactAmount: undefined,
  },
];
