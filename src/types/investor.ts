export type RiskAppetite =
  | 'conservative'
  | 'moderate'
  | 'moderate-aggressive'
  | 'aggressive';

export interface WealthBreakdown {
  mutualFunds: number;
  equityBroker1: number;
  equityBroker2: number;
  fixedDeposits: number;
  realEstate: number;
  bankSavings: number;
  otherInvestments: number;
}

export interface Investor {
  id: string;
  name: string;
  age: number;
  occupation: string;
  riskAppetite: RiskAppetite;
  totalWealth: number;
  wealthBreakdown: WealthBreakdown;
}
