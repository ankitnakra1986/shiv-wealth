import type { AdapterResponse, MFCentralHolding } from '@/types/adapters';
import { mockMFHoldings } from '@/data/mock-adapters';

/**
 * Simulates a call to MF Central to fetch all mutual fund holdings for an investor.
 * In production this would call the MF Central API using the investor's PAN.
 */
export async function fetchMFHoldings(
  investorId: string
): Promise<AdapterResponse<MFCentralHolding[]>> {
  await simulateNetworkDelay(300);

  if (investorId !== 'inv-001') {
    return {
      source: 'mf-central',
      fetchedAt: new Date().toISOString(),
      status: 'error',
      data: [],
      errorMessage: `No MF Central data found for investor ${investorId}`,
    };
  }

  return {
    source: 'mf-central',
    fetchedAt: new Date().toISOString(),
    status: 'success',
    data: mockMFHoldings,
  };
}

/** Returns total current value across all MF holdings */
export function computeMFTotalValue(holdings: MFCentralHolding[]): number {
  return holdings.reduce((sum, h) => sum + h.currentValue, 0);
}

/** Returns total returns amount across all MF holdings */
export function computeMFTotalReturns(holdings: MFCentralHolding[]): number {
  return holdings.reduce((sum, h) => sum + h.returnsAmount, 0);
}

function simulateNetworkDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
