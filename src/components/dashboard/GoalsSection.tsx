import type { Goal } from '@/types/goal';
import { GoalCard } from './GoalCard';

interface Props {
  goals: Goal[];
  investorAge: number;
}

export function GoalsSection({ goals, investorAge }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 px-1">
        Your Goals · {goals.length} active
      </p>
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} investorAge={investorAge} />
      ))}
    </div>
  );
}
