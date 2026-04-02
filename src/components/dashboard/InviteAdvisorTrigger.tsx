'use client';

import { useState } from 'react';
import { InviteAdvisorModal } from './InviteAdvisorModal';

export function InviteAdvisorTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg hover:bg-white/20 transition-colors"
      >
        <span className="text-elara-gold text-xs">+</span>
        Invite your CA or advisor
      </button>
      <InviteAdvisorModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
