export type MFCategory = 'equity' | 'debt' | 'hybrid' | 'elss' | 'liquid';

export interface MFCentralHolding {
  folioNumber: string;
  schemeName: string;
  amcName: string;
  nav: number;
  units: number;
  currentValue: number;
  investedValue: number;
  /** Absolute return percentage */
  returns: number;
  returnsAmount: number;
  category: MFCategory;
}

export interface CIBILData {
  /** CIBIL score range: 300–900 */
  score: number;
  totalLoans: number;
  activeLoans: number;
  /** Credit utilization as percentage */
  creditUtilization: number;
  paymentHistory: 'excellent' | 'good' | 'fair' | 'poor';
  lastUpdated: string;
}

export type AAAccountType =
  | 'savings'
  | 'current'
  | 'fd'
  | 'rd'
  | 'ppf'
  | 'nps';

export interface AAAccount {
  accountId: string;
  /** Fictional institution name */
  institution: string;
  accountType: AAAccountType;
  balance: number;
  lastUpdated: string;
}

export interface AAData {
  accounts: AAAccount[];
  totalBankBalance: number;
  totalFDs: number;
}

export type AdapterSource = 'mf-central' | 'cibil' | 'account-aggregator';
export type AdapterStatus = 'success' | 'partial' | 'error';

/** Generic wrapper that simulates what a real adapter response looks like */
export interface AdapterResponse<T> {
  source: AdapterSource;
  fetchedAt: string;
  status: AdapterStatus;
  data: T;
  errorMessage?: string;
}
