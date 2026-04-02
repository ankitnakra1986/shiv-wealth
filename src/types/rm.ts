export type RecommendationUrgency = 'low' | 'medium' | 'high';

export type RecommendationCategory =
  | 'rebalancing'
  | 'tax-saving'
  | 'goal-alignment'
  | 'insurance'
  | 'new-opportunity';

export type RecommendationStatus = 'pending' | 'approved' | 'discussed' | 'rejected';

export interface RelationshipManager {
  id: string;
  name: string;
  designation: string;
  /** e.g. "9 years" */
  experience: string;
  certification: string;
  firm: string;
  photoUrl: string;
  email: string;
  phone: string;
}

export interface RMRecommendation {
  id: string;
  rmId: string;
  investorId: string;
  title: string;
  /** Short summary shown on the card */
  summary: string;
  /** Longer rationale shown on expand/discuss */
  rationale: string;
  urgency: RecommendationUrgency;
  category: RecommendationCategory;
  status: RecommendationStatus;
  createdAt: string;
  expiresAt?: string;
  /** Estimated INR impact of acting on this recommendation */
  impactAmount?: number;
}
