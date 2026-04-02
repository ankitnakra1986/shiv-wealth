import type { AdapterResponse, AAData } from '@/types/adapters';
import { mockAAData } from '@/data/mock-adapters';

/**
 * Simulates an Account Aggregator (AA) framework pull for an investor.
 * In production this uses the RBI AA framework — investor grants consent
 * per FIP (Financial Information Provider) and data flows via the AA.
 */
export async function fetchAAData(
  investorId: string
): Promise<AdapterResponse<AAData>> {
  await simulateNetworkDelay(400);

  if (investorId !== 'inv-001') {
    return {
      source: 'account-aggregator',
      fetchedAt: new Date().toISOString(),
      status: 'error',
      data: { accounts: [], totalBankBalance: 0, totalFDs: 0 },
      errorMessage: `No AA consent found for investor ${investorId}`,
    };
  }

  return {
    source: 'account-aggregator',
    fetchedAt: new Date().toISOString(),
    status: 'success',
    data: mockAAData,
  };
}

/** Returns liquid balance — savings accounts only */
export function computeLiquidBalance(data: AAData): number {
  return data.accounts
    .filter((a) => a.accountType === 'savings' || a.accountType === 'current')
    .reduce((sum, a) => sum + a.balance, 0);
}

/** Returns total FD balance */
export function computeFDTotal(data: AAData): number {
  return data.accounts
    .filter((a) => a.accountType === 'fd' || a.accountType === 'rd')
    .reduce((sum, a) => sum + a.balance, 0);
}

function simulateNetworkDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
