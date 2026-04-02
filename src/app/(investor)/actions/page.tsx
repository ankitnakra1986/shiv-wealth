'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRecommendations } from '@/data/mock-rm';
import { mockRM } from '@/data/mock-rm';
import type { RMRecommendation } from '@/types/rm';
import { formatCompact } from '@/lib/utils/formatters';
import { TrustFooter } from '@/components/layout/TrustFooter';

const urgencyConfig = {
  high:   { label: 'High Priority',   dot: 'bg-status-red',   text: 'text-status-red',   bg: 'bg-status-red-bg'   },
  medium: { label: 'Medium Priority', dot: 'bg-status-amber', text: 'text-status-amber', bg: 'bg-status-amber-bg' },
  low:    { label: 'Low Priority',    dot: 'bg-status-green', text: 'text-status-green', bg: 'bg-status-green-bg' },
};

const categoryLabel: Record<string, string> = {
  rebalancing:       'Portfolio Rebalancing',
  'goal-alignment':  'Goal Alignment',
  insurance:         'Insurance',
  'tax-saving':      'Tax Optimisation',
  'new-opportunity': 'New Opportunity',
};

function ActionItem({ rec, onApprove, onDismiss }: {
  rec: RMRecommendation;
  onApprove: (id: string) => void;
  onDismiss: (id: string) => void;
}) {
  const cfg = urgencyConfig[rec.urgency];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <div className="px-5 py-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${cfg.dot}`} />
            <div>
              <p className="text-sm font-bold text-elara-navy leading-tight">{rec.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{categoryLabel[rec.category] ?? rec.category}</p>
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0 ${cfg.bg} ${cfg.text}`}>
            {cfg.label}
          </span>
        </div>

        {/* Summary */}
        <p className="text-xs text-gray-500 leading-relaxed mt-3">{rec.summary}</p>

        {/* Impact */}
        {rec.impactAmount && (
          <p className="text-[11px] text-elara-navy font-semibold mt-2">
            Impact: {formatCompact(rec.impactAmount)} move
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2.5 mt-4">
          <button
            onClick={() => onApprove(rec.id)}
            className="flex-1 h-9 bg-elara-navy text-white rounded-xl text-xs font-semibold hover:bg-elara-navy-light transition-colors"
          >
            Approve
          </button>
          <button
            onClick={() => onDismiss(rec.id)}
            className="flex-1 h-9 border border-gray-200 text-gray-500 rounded-xl text-xs font-semibold hover:border-elara-navy hover:text-elara-navy transition-colors"
          >
            Discuss
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ActionsPage() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [approved, setApproved] = useState<Set<string>>(new Set());

  const pending = mockRecommendations.filter(
    (r) => !dismissed.has(r.id) && !approved.has(r.id)
  );

  const handleApprove = (id: string) => setApproved((prev) => new Set([...prev, id]));
  const handleDismiss = (id: string) => setDismissed((prev) => new Set([...prev, id]));

  return (
    <div className="flex flex-col min-h-screen bg-elara-surface">
      <header className="bg-elara-navy px-5 pt-12 pb-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-elara-gold text-[11px] font-semibold tracking-[0.18em] uppercase">
            Shiv Wealth
          </p>
          <h1 className="text-white text-[22px] font-semibold mt-2">Actions</h1>
          <p className="text-white/50 text-sm mt-0.5">
            {pending.length > 0
              ? `${pending.length} recommendation${pending.length > 1 ? 's' : ''} from ${mockRM.name}`
              : `All caught up`}
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-5 py-5">
        <AnimatePresence mode="popLayout">
          {pending.length > 0 ? (
            <motion.div key="list" className="space-y-4">
              {pending.map((rec) => (
                <ActionItem
                  key={rec.id}
                  rec={rec}
                  onApprove={handleApprove}
                  onDismiss={handleDismiss}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-status-green-bg flex items-center justify-center mx-auto mb-4">
                <span className="text-status-green text-2xl font-bold">✓</span>
              </div>
              <p className="text-elara-navy font-bold text-lg">All caught up</p>
              <p className="text-gray-400 text-sm mt-1.5 max-w-xs">
                No pending actions from Priya. Your portfolio is up to date.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        <TrustFooter />
      </main>
    </div>
  );
}
