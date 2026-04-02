import type { Investor } from '@/types/investor';
import type { Goal } from '@/types/goal';
import type { EfficiencyScore } from '@/types/efficiency';
import type { RelationshipManager, RMRecommendation } from '@/types/rm';
import type {
  AdapterResponse,
  MFCentralHolding,
  CIBILData,
  AAData,
} from '@/types/adapters';

import { mockInvestor } from '@/data/mock-investor';
import { mockGoals } from '@/data/mock-goals';
import { mockEfficiencyScore } from '@/data/mock-efficiency';
import { mockRM, mockRecommendations } from '@/data/mock-rm';
import { fetchMFHoldings } from '@/lib/adapters/mf-central';
import { fetchCIBILData } from '@/lib/adapters/cibil';
import { fetchAAData } from '@/lib/adapters/account-aggregator';

export interface InvestorSnapshot {
  investor: Investor;
  goals: Goal[];
  efficiencyScore: EfficiencyScore;
  rm: RelationshipManager;
  recommendations: RMRecommendation[];
  mfHoldings: AdapterResponse<MFCentralHolding[]>;
  cibil: AdapterResponse<CIBILData>;
  accounts: AdapterResponse<AAData>;
  fetchedAt: string;
}

// Fallbacks used when an adapter call fails — dashboard still renders
const mfFallback: AdapterResponse<MFCentralHolding[]> = {
  source: 'mf-central',
  fetchedAt: new Date().toISOString(),
  status: 'error',
  data: [],
  errorMessage: 'MF Central unavailable',
};

const cibilFallback: AdapterResponse<CIBILData> = {
  source: 'cibil',
  fetchedAt: new Date().toISOString(),
  status: 'error',
  data: {
    score: 0,
    totalLoans: 0,
    activeLoans: 0,
    creditUtilization: 0,
    paymentHistory: 'poor',
    lastUpdated: '',
  },
  errorMessage: 'CIBIL unavailable',
};

const aaFallback: AdapterResponse<AAData> = {
  source: 'account-aggregator',
  fetchedAt: new Date().toISOString(),
  status: 'error',
  data: { accounts: [], totalBankBalance: 0, totalFDs: 0 },
  errorMessage: 'Account Aggregator unavailable',
};

/**
 * Fetches all data sources in parallel using Promise.allSettled.
 * A failed adapter (e.g. CIBIL) returns a fallback — the dashboard
 * never crashes due to a single source failure.
 */
export async function getInvestorSnapshot(
  investorId: string
): Promise<InvestorSnapshot> {
  const [mfResult, cibilResult, aaResult] = await Promise.allSettled([
    fetchMFHoldings(investorId),
    fetchCIBILData(investorId),
    fetchAAData(investorId),
  ]);

  return {
    investor: mockInvestor,
    goals: mockGoals,
    efficiencyScore: mockEfficiencyScore,
    rm: mockRM,
    recommendations: mockRecommendations,
    mfHoldings:
      mfResult.status === 'fulfilled' ? mfResult.value : mfFallback,
    cibil:
      cibilResult.status === 'fulfilled' ? cibilResult.value : cibilFallback,
    accounts:
      aaResult.status === 'fulfilled' ? aaResult.value : aaFallback,
    fetchedAt: new Date().toISOString(),
  };
}
