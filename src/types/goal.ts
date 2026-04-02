export type GoalStatus = 'on-track' | 'needs-attention' | 'at-risk';
export type GoalColorCue = 'green' | 'amber' | 'red';
export type GoalCategory =
  | 'education'
  | 'retirement'
  | 'lifestyle'
  | 'property'
  | 'emergency';

export interface Goal {
  id: string;
  name: string;
  category: GoalCategory;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  progressPercent: number;
  /** null when fully on-track with no gap */
  gapAmount: number | null;
  /** present for time-bound goals */
  targetYear?: number;
  /** present for retirement-style goals */
  targetAge?: number;
  status: GoalStatus;
  colorCue: GoalColorCue;
}
