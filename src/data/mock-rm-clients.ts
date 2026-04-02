export type ClientStatus = 'healthy' | 'attention' | 'critical';
export type AIPriority = 'urgent' | 'high' | 'medium' | 'low';

export interface RMClientSummary {
  id: string;
  name: string;
  occupation: string;
  age: number;
  totalWealth: number;        // in INR
  efficiencyScore: number;    // 0–100
  goalsOnTrack: number;
  goalsAtRisk: number;
  pendingRecommendations: number;
  status: ClientStatus;
  aiPriority: AIPriority;     // AI-generated attention signal
  aiPriorityReason: string;   // one-line explanation of why AI flagged this priority
  lastReviewed: string;       // ISO date string
  /** If set, clicking the card navigates here */
  href?: string;
}

export const mockRMClients: RMClientSummary[] = [
  {
    id: 'inv-001',
    name: 'Rahul Sharma',
    occupation: 'CFO',
    age: 48,
    totalWealth: 153000000,   // ₹15.3 Cr
    efficiencyScore: 72,
    goalsOnTrack: 1,
    goalsAtRisk: 2,
    pendingRecommendations: 3,
    status: 'attention',
    aiPriority: 'high',
    aiPriorityReason: '3 pending approvals · 2 goals behind target · Retirement gap growing',
    lastReviewed: '2026-03-28T10:30:00.000Z',
    href: '/',                // links to investor dashboard
  },
  {
    id: 'inv-002',
    name: 'Deepika Rao',
    occupation: 'CTO',
    age: 44,
    totalWealth: 82000000,    // ₹8.2 Cr
    efficiencyScore: 85,
    goalsOnTrack: 3,
    goalsAtRisk: 0,
    pendingRecommendations: 1,
    status: 'healthy',
    aiPriority: 'low',
    aiPriorityReason: 'Portfolio healthy · Score 85 · All goals on track',
    lastReviewed: '2026-03-25T14:00:00.000Z',
  },
  {
    id: 'inv-003',
    name: 'Arun Joshi',
    occupation: 'Entrepreneur',
    age: 52,
    totalWealth: 220000000,   // ₹22 Cr
    efficiencyScore: 58,
    goalsOnTrack: 1,
    goalsAtRisk: 3,
    pendingRecommendations: 4,
    status: 'critical',
    aiPriority: 'urgent',
    aiPriorityReason: '4 unactioned recommendations · Score 58 · 3 goals at risk · Not reviewed in 10 days',
    lastReviewed: '2026-03-20T09:00:00.000Z',
  },
];

/** Derived portfolio stats for the RM header */
export const rmPortfolioStats = {
  totalClients: mockRMClients.length,
  totalAUM: mockRMClients.reduce((sum, c) => sum + c.totalWealth, 0), // ₹45.5 Cr
  totalPending: mockRMClients.reduce((sum, c) => sum + c.pendingRecommendations, 0),
  avgEfficiency: Math.round(
    mockRMClients.reduce((sum, c) => sum + c.efficiencyScore, 0) / mockRMClients.length
  ),
};
