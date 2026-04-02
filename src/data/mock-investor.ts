import type { Investor } from '@/types/investor';

export const mockInvestor: Investor = {
  id: 'inv-001',
  name: 'Rahul Sharma',
  age: 48,
  occupation: 'CFO',
  riskAppetite: 'moderate-aggressive',
  totalWealth: 153000000, // ₹15.3 crore
  wealthBreakdown: {
    mutualFunds:       42000000, // ₹4.2 Cr
    equityBroker1:     28000000, // ₹2.8 Cr — Broker A (TrustEquity)
    equityBroker2:     15000000, // ₹1.5 Cr — Broker B (CapitalPath)
    fixedDeposits:     21000000, // ₹2.1 Cr
    realEstate:        38000000, // ₹3.8 Cr — Flat in Gurgaon
    bankSavings:        6000000, // ₹0.6 Cr — across 3 banks
    otherInvestments:   3000000, // ₹0.3 Cr
  },
};
