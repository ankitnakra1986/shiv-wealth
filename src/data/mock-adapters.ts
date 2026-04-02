import type { MFCentralHolding, CIBILData, AAData } from '@/types/adapters';

// ---------------------------------------------------------------------------
// MF Central — mock holdings (fictional AMC names)
// ---------------------------------------------------------------------------

export const mockMFHoldings: MFCentralHolding[] = [
  {
    folioNumber: 'PIN-2019-0042',
    schemeName: 'Pinnacle Flexi Cap Fund — Direct Growth',
    amcName: 'Pinnacle Asset Management',
    nav: 87.42,
    units: 42180,
    currentValue: 16200000, // ₹1.62 Cr
    investedValue: 12000000,
    returns: 35.0,
    returnsAmount: 4200000,
    category: 'equity',
  },
  {
    folioNumber: 'HOR-2021-1198',
    schemeName: 'Horizon Mid Cap Opportunities — Direct Growth',
    amcName: 'Horizon Mutual Fund',
    nav: 134.76,
    units: 18600,
    currentValue: 9000000, // ₹90 lakh
    investedValue: 7200000,
    returns: 25.0,
    returnsAmount: 1800000,
    category: 'equity',
  },
  {
    folioNumber: 'CRS-2020-0771',
    schemeName: 'Crest Capital ELSS Tax Saver — Direct Growth',
    amcName: 'Crest Capital',
    nav: 56.30,
    units: 26640,
    currentValue: 6000000, // ₹60 lakh — ELSS, 3-yr lock-in
    investedValue: 4800000,
    returns: 25.0,
    returnsAmount: 1200000,
    category: 'elss',
  },
  {
    folioNumber: 'HOR-2022-3341',
    schemeName: 'Horizon Short Duration Debt Fund — Direct Growth',
    amcName: 'Horizon Mutual Fund',
    nav: 18.92,
    units: 318710,
    currentValue: 6000000, // ₹60 lakh
    investedValue: 5760000,
    returns: 4.2,
    returnsAmount: 240000,
    category: 'debt',
  },
  {
    folioNumber: 'PIN-2023-4482',
    schemeName: 'Pinnacle Balanced Advantage Fund — Direct Growth',
    amcName: 'Pinnacle Asset Management',
    nav: 42.15,
    units: 118630,
    currentValue: 4800000, // ₹48 lakh
    investedValue: 4200000,
    returns: 14.3,
    returnsAmount: 600000,
    category: 'hybrid',
  },
];

// ---------------------------------------------------------------------------
// CIBIL — mock credit data
// ---------------------------------------------------------------------------

export const mockCIBILData: CIBILData = {
  score: 812,
  totalLoans: 3,
  activeLoans: 1, // one home loan outstanding
  creditUtilization: 12,
  paymentHistory: 'excellent',
  lastUpdated: '2026-03-01T00:00:00.000Z',
};

// ---------------------------------------------------------------------------
// Account Aggregator — mock bank and FD accounts (fictional institution names)
// ---------------------------------------------------------------------------

export const mockAAData: AAData = {
  accounts: [
    {
      accountId: 'aa-sav-001',
      institution: 'Indivus Bank',
      accountType: 'savings',
      balance: 2400000, // ₹24 lakh
      lastUpdated: '2026-03-29T00:00:00.000Z',
    },
    {
      accountId: 'aa-sav-002',
      institution: 'Meridian Bank',
      accountType: 'savings',
      balance: 1800000, // ₹18 lakh
      lastUpdated: '2026-03-29T00:00:00.000Z',
    },
    {
      accountId: 'aa-sav-003',
      institution: 'Northstar Bank',
      accountType: 'savings',
      balance: 1800000, // ₹18 lakh
      lastUpdated: '2026-03-29T00:00:00.000Z',
    },
    {
      accountId: 'aa-fd-001',
      institution: 'Indivus Bank',
      accountType: 'fd',
      balance: 10000000, // ₹1 Cr — 12-month FD
      lastUpdated: '2026-02-15T00:00:00.000Z',
    },
    {
      accountId: 'aa-fd-002',
      institution: 'Meridian Bank',
      accountType: 'fd',
      balance: 7500000, // ₹75 lakh — 24-month FD
      lastUpdated: '2026-01-10T00:00:00.000Z',
    },
    {
      accountId: 'aa-fd-003',
      institution: 'Northstar Bank',
      accountType: 'fd',
      balance: 3500000, // ₹35 lakh — 6-month FD
      lastUpdated: '2026-03-01T00:00:00.000Z',
    },
    {
      accountId: 'aa-ppf-001',
      institution: 'Indivus Bank',
      accountType: 'ppf',
      balance: 1800000, // ₹18 lakh PPF
      lastUpdated: '2026-03-31T00:00:00.000Z',
    },
    {
      accountId: 'aa-nps-001',
      institution: 'Shiv Wealth NPS',
      accountType: 'nps',
      balance: 1200000, // ₹12 lakh NPS
      lastUpdated: '2026-03-31T00:00:00.000Z',
    },
  ],
  totalBankBalance: 6000000,  // ₹60 lakh (savings only)
  totalFDs: 21000000,          // ₹2.1 Cr
};
