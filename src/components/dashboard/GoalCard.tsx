'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Goal } from '@/types/goal';
import { formatCompact, formatLakh, formatPercent } from '@/lib/utils/formatters';
import { goalTimeLabel, isUrgent } from '@/lib/utils/dates';

// ── Color maps ────────────────────────────────────────────────────────────────
const borderColor = {
  green: 'border-l-status-green',
  amber: 'border-l-status-amber',
  red:   'border-l-status-red',
};

const barColor = {
  green: 'bg-status-green',
  amber: 'bg-status-amber',
  red:   'bg-status-red',
};

const statusConfig = {
  'on-track':       { label: 'On Track',        bg: 'bg-status-green-bg',  text: 'text-status-green' },
  'needs-attention':{ label: 'Needs Attention',  bg: 'bg-status-amber-bg',  text: 'text-status-amber' },
  'at-risk':        { label: 'At Risk',           bg: 'bg-status-red-bg',    text: 'text-status-red'   },
};

const categoryIcon: Record<string, string> = {
  education:  '🎓',
  retirement: '🌅',
  lifestyle:  '✈️',
  property:   '🏠',
  emergency:  '🛡️',
};

// ── Expanded detail data — mock, keyed by goal ID ─────────────────────────────
const goalDetail: Record<string, {
  monthlySIP: string;
  linked: string[];
  priyaNote: string;
}> = {
  'goal-001': {
    monthlySIP: '₹51,000/month to stay on track',
    linked: ['Franklin Templeton SIP — ₹20,000/mo', 'HDFC Bank FD — ₹8L earmarked'],
    priyaNote: "Increase SIP by ₹31,000/month or redeploy ₹8L from FD now. Arjun's 2028 deadline is firm.",
  },
  'goal-002': {
    monthlySIP: '₹45,000/month additional SIP needed',
    linked: ['EPF + NPS — ₹2.1 crore', 'Axis Long Term Equity — ₹2.7 crore'],
    priyaNote: 'Start a dedicated balanced advantage SIP of ₹45,000/month. At 10% CAGR, this closes the ₹7.2 crore gap by age 60.',
  },
  'goal-003': {
    monthlySIP: '₹50,000/month for next 12 months',
    linked: ['Zerodha Liquid Fund — ₹8.1L current balance'],
    priyaNote: 'Redirect your annual bonus + ₹50K/month liquid SIP. Gap closes by December 2027 — in time for the Europe trip.',
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export function GoalCard({ goal, investorAge }: { goal: Goal; investorAge: number }) {
  const [open, setOpen] = useState(false);

  const { label, bg, text } = statusConfig[goal.status];
  const detail = goalDetail[goal.id];

  const timeLabel = goalTimeLabel({
    targetYear: goal.targetYear,
    targetAge:  goal.targetAge,
    currentAge: investorAge,
  });

  const urgent = goal.targetYear ? isUrgent(goal.targetYear) : false;

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${borderColor[goal.colorCue]} overflow-hidden`}>
      {/* ── Always-visible summary — tap to expand ── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 focus:outline-none"
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none" aria-hidden>
              {categoryIcon[goal.category] ?? '💰'}
            </span>
            <h3 className="text-sm font-bold text-elara-navy leading-tight">
              {goal.name}
            </h3>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${bg} ${text}`}>
              {label}
            </span>
            <span className={`text-gray-300 text-[10px] transition-transform duration-200 ${open ? '-rotate-180' : ''}`}>
              ▾
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-2xl font-bold text-elara-navy">
              {formatPercent(goal.progressPercent)}
            </span>
            <div className="text-right">
              <p className="text-xs text-gray-400">Target</p>
              <p className="text-sm font-semibold text-gray-700">
                {formatCompact(goal.targetAmount)}
              </p>
            </div>
          </div>

          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${barColor[goal.colorCue]}`}
              initial={{ width: 0 }}
              animate={{ width: `${goal.progressPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
            />
          </div>

          <div className="flex items-center justify-between mt-1.5">
            <p className="text-[11px] text-gray-400">
              {formatCompact(goal.currentAmount)} saved
            </p>
            {timeLabel && (
              <p className={`text-[11px] font-medium ${urgent ? 'text-status-amber' : 'text-gray-400'}`}>
                {urgent && '⚠ '}{timeLabel}
              </p>
            )}
          </div>
        </div>

        {/* Gap pill */}
        {goal.gapAmount !== null && (
          <div className="mt-3 flex items-center gap-2 bg-status-amber-bg rounded-xl px-3 py-2">
            <span className="text-status-amber text-sm">⚡</span>
            <p className="text-xs text-status-amber font-semibold">
              {formatLakh(goal.gapAmount)} gap to close
            </p>
          </div>
        )}
      </button>

      {/* ── Expanded detail — CSS max-height transition ── */}
      {detail && (
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? '260px' : '0px', opacity: open ? 1 : 0 }}
        >
          <div className="px-5 pb-5 border-t border-gray-50 pt-4 space-y-3">

            {/* Monthly needed */}
            <div className="flex items-start gap-2">
              <span className="text-elara-gold text-sm flex-shrink-0 mt-0.5">→</span>
              <div>
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-0.5">
                  To close the gap
                </p>
                <p className="text-sm font-bold text-elara-navy">{detail.monthlySIP}</p>
              </div>
            </div>

            {/* Linked investments */}
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
                Currently allocated
              </p>
              <div className="space-y-1">
                {detail.linked.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-elara-navy/30 flex-shrink-0" />
                    <span className="text-[11px] text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Priya's recommendation */}
            <div className="bg-elara-gold/5 border border-elara-gold/20 rounded-xl px-3 py-2.5">
              <p className="text-[10px] font-semibold text-elara-navy mb-1">Priya recommends</p>
              <p className="text-[11px] text-gray-600 leading-relaxed">{detail.priyaNote}</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
