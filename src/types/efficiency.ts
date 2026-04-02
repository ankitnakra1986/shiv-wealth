export type TrendDirection = 'improving' | 'stable' | 'declining';

export interface EfficiencyFactor {
  id: string;
  name: string;
  /** Current quarter score, 0–100 */
  score: number;
  /** Previous quarter score for trend calculation */
  previousScore: number;
  /** Derived from score delta vs previousScore */
  trend: TrendDirection;
  /** Percentage contribution to overall EfficiencyScore (all weights sum to 100) */
  weight: number;
  /** One-line plain-language explanation of what this factor measures */
  explanation: string;
  /** One-line actionable recommendation for Rahul */
  recommendation: string;
}

export interface EfficiencyScore {
  /** Weighted average of all factor scores */
  overall: number;
  /** Previous quarter weighted average */
  previousOverall: number;
  factors: EfficiencyFactor[];
  lastUpdated: string;
}
