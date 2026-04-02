'use client';

import { useState } from 'react';
import { NewRecommendationModal } from './NewRecommendationModal';

export function RMActionBar({ rmName }: { rmName: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-end gap-0.5">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 bg-elara-navy text-white text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-elara-navy/90 transition-colors"
        >
          <span className="text-elara-gold text-sm leading-none">+</span>
          New Recommendation
        </button>
        <p className="text-[9px] text-gray-400">Draft → Review → Client acts in 1 tap</p>
      </div>
      <NewRecommendationModal open={open} onClose={() => setOpen(false)} rmName={rmName} />
    </>
  );
}
