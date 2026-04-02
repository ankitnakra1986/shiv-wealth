'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { EfficiencyScore, EfficiencyFactor, TrendDirection } from '@/types/efficiency';

// ── Arc constants ─────────────────────────────────────────────────────────────
const R = 52;
const CX = 60;
const CY = 60;
const CIRCUMFERENCE = 2 * Math.PI * R;
const ARC_LENGTH = CIRCUMFERENCE * 0.75;
const GAP_LENGTH = CIRCUMFERENCE - ARC_LENGTH;
const DASHARRAY = `${ARC_LENGTH.toFixed(2)} ${GAP_LENGTH.toFixed(2)}`;

function scoreDashoffset(score: number): number {
  return ARC_LENGTH - (score / 100) * ARC_LENGTH;
}
function arcColor(score: number): string {
  if (score >= 75) return '#16a34a';
  if (score >= 60) return '#d97706';
  return '#dc2626';
}
function barColor(score: number): string {
  if (score >= 75) return 'bg-status-green';
  if (score >= 60) return 'bg-status-amber';
  return 'bg-status-red';
}

// ── Trend badge ───────────────────────────────────────────────────────────────
function TrendBadge({ trend, delta }: { trend: TrendDirection; delta: number }) {
  const cfg = {
    improving: { arrow: '↑', color: 'text-status-green', bg: 'bg-status-green-bg' },
    stable:    { arrow: '→', color: 'text-gray-400',     bg: 'bg-gray-100'        },
    declining: { arrow: '↓', color: 'text-status-amber', bg: 'bg-status-amber-bg' },
  }[trend];
  const sign = delta > 0 ? '+' : '';
  return (
    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${cfg.bg} ${cfg.color}`}>
      {cfg.arrow} {sign}{delta}
    </span>
  );
}

// ── Collapsible factor row — CSS transition, no Framer Motion height ──────────
function FactorRow({ factor, index }: { factor: EfficiencyFactor; index: number }) {
  const [open, setOpen] = useState(false);
  const delta = factor.score - factor.previousScore;
  const needsAction = factor.score < 75;

  return (
    <div className="border-b border-gray-50 last:border-0">
      {/* Always-visible summary — click to toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left py-3 flex items-center justify-between gap-2 focus:outline-none"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${needsAction ? 'bg-status-amber' : 'bg-status-green'}`} />
          <span className="text-sm font-semibold text-gray-800 leading-tight">{factor.name}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <TrendBadge trend={factor.trend} delta={delta} />
          <span className="text-base font-bold text-elara-navy w-7 text-right">{factor.score}</span>
          <span className={`text-gray-300 text-[10px] transition-transform duration-200 ${open ? '-rotate-180' : ''}`}>▾</span>
        </div>
      </button>

      {/* Progress bar — always visible */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-0.5">
        <motion.div
          className={`h-full rounded-full ${barColor(factor.score)}`}
          initial={{ width: 0 }}
          animate={{ width: `${factor.score}%` }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.07 }}
        />
      </div>

      {/* Detail — CSS max-height toggle, 100% reliable */}
      <div
        className="overflow-hidden transition-all duration-250 ease-in-out"
        style={{ maxHeight: open ? '120px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="pt-2 pb-3">
          <p className="text-[11px] text-gray-400 leading-relaxed">{factor.explanation}</p>
          {needsAction && (
            <p className="mt-1 text-[11px] text-elara-navy font-semibold leading-relaxed">
              → {factor.recommendation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main card ─────────────────────────────────────────────────────────────────
export function EfficiencyScoreCard({ efficiencyScore }: { efficiencyScore: EfficiencyScore }) {
  const { overall, previousOverall, factors } = efficiencyScore;
  const delta = overall - previousOverall;
  const sortedFactors = [...factors].sort((a, b) => a.score - b.score);
  const attentionCount = factors.filter((f) => f.score < 75).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Arc + score */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
          Financial Health Score
        </p>

        <div className="flex items-center justify-center mt-4">
          <div className="relative">
            <svg viewBox="0 0 120 120" className="w-36 h-36" aria-label={`Score ${overall}/100`}>
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f3f4f6" strokeWidth={10}
                strokeDasharray={DASHARRAY} strokeLinecap="round" transform="rotate(135 60 60)" />
              <motion.circle cx={CX} cy={CY} r={R} fill="none" stroke={arcColor(overall)} strokeWidth={10}
                strokeDasharray={DASHARRAY} strokeLinecap="round" transform="rotate(135 60 60)"
                initial={{ strokeDashoffset: ARC_LENGTH }}
                animate={{ strokeDashoffset: scoreDashoffset(overall) }}
                transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-2">
              <motion.span className="text-4xl font-bold text-elara-navy leading-none"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}>
                {overall}
              </motion.span>
              <span className="text-xs text-gray-400 font-medium mt-0.5">/100</span>
            </div>
          </div>
        </div>

        {/* Delta + attention count */}
        <div className="flex items-center justify-between mt-2 px-1">
          <span className={`text-sm font-semibold ${delta >= 0 ? 'text-status-green' : 'text-status-amber'}`}>
            {delta >= 0 ? '↑' : '↓'} {Math.abs(delta)} pts vs last quarter
          </span>
          {attentionCount > 0 && (
            <span className="text-[11px] text-status-amber font-semibold bg-status-amber-bg px-2 py-0.5 rounded-full">
              {attentionCount} of 6 need action
            </span>
          )}
        </div>

        {/* Score context — meaningful from day one, no peer data needed */}
        <p className="text-center text-[11px] text-gray-400 mt-2 px-1">
          Score range: <span className="font-semibold text-status-red">0–59</span> Critical &nbsp;·&nbsp;
          <span className="font-semibold text-status-amber">60–74</span> Improve &nbsp;·&nbsp;
          <span className="font-semibold text-status-green">75+</span> Strong
        </p>
      </div>

      <div className="h-px bg-gray-100 mx-5" />

      {/* Factor list */}
      <div className="px-5 pt-1 pb-3">
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mt-2 mb-1">
          6 Factors · Tap any to expand
        </p>
        {sortedFactors.map((factor, i) => (
          <FactorRow key={factor.id} factor={factor} index={i} />
        ))}
      </div>
    </div>
  );
}
