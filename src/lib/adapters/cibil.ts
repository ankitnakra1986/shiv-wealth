import type { AdapterResponse, CIBILData } from '@/types/adapters';
import { mockCIBILData } from '@/data/mock-adapters';

/**
 * Simulates a CIBIL bureau pull for an investor.
 * In production this would use a bureau API with consent from the investor.
 */
export async function fetchCIBILData(
  investorId: string
): Promise<AdapterResponse<CIBILData>> {
  await simulateNetworkDelay(500);

  if (investorId !== 'inv-001') {
    return {
      source: 'cibil',
      fetchedAt: new Date().toISOString(),
      status: 'error',
      data: mockCIBILData,
      errorMessage: `No CIBIL record found for investor ${investorId}`,
    };
  }

  return {
    source: 'cibil',
    fetchedAt: new Date().toISOString(),
    status: 'success',
    data: mockCIBILData,
  };
}

/** Derives a human-readable credit health label from CIBIL score */
export function getCreditHealthLabel(score: number): string {
  if (score >= 800) return 'Excellent';
  if (score >= 750) return 'Very Good';
  if (score >= 700) return 'Good';
  if (score >= 650) return 'Fair';
  return 'Needs Attention';
}

function simulateNetworkDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
