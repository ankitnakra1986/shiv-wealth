export type IPSQuestionCategory =
  | 'goals'
  | 'risk'
  | 'liquidity'
  | 'values'
  | 'behavior'
  | 'anxiety';

export interface IPSQuestion {
  id: number;
  question: string;
  category: IPSQuestionCategory;
}

export interface IPSAnswer {
  questionId: number;
  answer: string;
  timestamp: string;
}

export interface IPSSummary {
  investorId: string;
  completedAt: string;
  answers: IPSAnswer[];
  /** e.g. "Moderate-Aggressive" */
  derivedRiskProfile: string;
  /** Ordered list of goals by priority derived from answers */
  derivedGoalPriority: string[];
  /** Key values surfaced from answers, e.g. ["Family security", "Legacy building"] */
  derivedValues: string[];
  /** Optional note added by Priya after reviewing the IPS */
  advisorNote?: string;
}
