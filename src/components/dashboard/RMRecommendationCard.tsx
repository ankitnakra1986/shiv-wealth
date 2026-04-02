'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { RMRecommendation, RecommendationStatus, RelationshipManager } from '@/types/rm';
import { formatCompact } from '@/lib/utils/formatters';

type LocalStatus = RecommendationStatus;

const MAX_CHARS = 500;

const urgencyConfig = {
  high:   { label: 'High Priority',   bg: 'bg-status-red-bg',    text: 'text-status-red',   dot: 'bg-status-red'   },
  medium: { label: 'Medium Priority', bg: 'bg-status-amber-bg',  text: 'text-status-amber', dot: 'bg-status-amber' },
  low:    { label: 'Low Priority',    bg: 'bg-status-green-bg',  text: 'text-status-green', dot: 'bg-status-green' },
};

const categoryLabel: Record<string, string> = {
  rebalancing:       'Portfolio Rebalancing',
  'tax-saving':      'Tax Optimisation',
  'goal-alignment':  'Goal Alignment',
  insurance:         'Insurance',
  'new-opportunity': 'New Opportunity',
};

// ── Projected impact per recommendation — the "if you approve this" story ────
const projectedImpact: Record<string, {
  scoreFrom: number; scoreTo: number;
  goalLabel: string; goalDetail: string;
  basedOn: string[];
  wsExecution: string;        // what Wealth Spectrum will actually do
}> = {
  'rec-001': {
    scoreFrom: 72, scoreTo: 76,
    goalLabel: 'Retirement',
    goalDetail: 'Gap reduces ₹7.2Cr → ₹6.0Cr',
    basedOn: [
      'Equity drift: 43% actual vs 35% your target',
      'Retirement gap growing ₹10L/year at current pace',
      'Mid-cap valuations stretched (P/E 28x, 5yr high)',
    ],
    wsExecution: 'Book ₹12L from HDFC Mid-Cap · Move to ICICI Short Duration Fund',
  },
  'rec-002': {
    scoreFrom: 72, scoreTo: 74,
    goalLabel: 'Child Education',
    goalDetail: '62% → 78% on track',
    basedOn: [
      "Arjun's 2028 deadline: 24 months away",
      'Current SIP of ₹25,000/month closes only 80% of gap',
      'Equity volatility risk high for a 2-year horizon',
    ],
    wsExecution: 'Increase Franklin Templeton SIP to ₹40,000/month · Switch to target-maturity debt fund',
  },
  'rec-003': {
    scoreFrom: 72, scoreTo: 79,
    goalLabel: 'Protection',
    goalDetail: 'Coverage gap: ₹3Cr → ₹0',
    basedOn: [
      'Current term cover: ₹1Cr · Recommended for ₹15Cr wealth: ₹4-5Cr',
      'Arjun is 6 years old — 20-year dependency horizon',
      'Annual premium cost: ₹18,000 (0.1% of wealth)',
    ],
    wsExecution: 'Initiate HDFC Life Click 2 Protect application · ₹4Cr cover · 25-year term',
  },
};

const quickReplies = [
  'I need more details before deciding',
  'Can we schedule a call this week?',
  "I'll review and respond by Friday",
  'Approved in principle — send the documents',
];

// ── RM Avatar with initials fallback ─────────────────────────────────────────
function RMAvatar({ rm, size = 52 }: { rm: RelationshipManager; size?: number }) {
  const [imgError, setImgError] = useState(false);
  const initials = rm.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  if (imgError) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-full bg-elara-navy flex items-center justify-center flex-shrink-0 ring-2 ring-elara-gold/40"
      >
        <span style={{ fontSize: size * 0.32 }} className="text-elara-gold font-bold">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className="relative rounded-full overflow-hidden flex-shrink-0 bg-gray-100 ring-2 ring-elara-gold/40"
    >
      <Image
        src={rm.photoUrl}
        alt={rm.name}
        fill
        sizes="52px"
        className="object-cover"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

// ── Navigation dots ───────────────────────────────────────────────────────────
function NavDots({
  total,
  current,
  statuses,
  onSelect,
}: {
  total: number;
  current: number;
  statuses: LocalStatus[];
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const isDone = statuses[i] === 'approved' || statuses[i] === 'discussed';
        const isActive = i === current;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`Go to recommendation ${i + 1}`}
            className={`rounded-full transition-all duration-250 ${
              isActive  ? 'w-6 h-2 bg-elara-navy'
              : isDone  ? 'w-2 h-2 bg-status-green'
              :           'w-2 h-2 bg-gray-200 hover:bg-gray-300'
            }`}
          />
        );
      })}
    </div>
  );
}

// ── All done empty state ──────────────────────────────────────────────────────
function AllCaughtUp({ rm }: { rm: RelationshipManager }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-10 text-center px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
        className="w-16 h-16 rounded-full bg-status-green-bg flex items-center justify-center mb-4"
      >
        <span className="text-3xl">✓</span>
      </motion.div>
      <p className="text-elara-navy font-bold text-base">You&apos;re all caught up</p>
      <p className="text-gray-400 text-sm mt-1.5 leading-relaxed max-w-[220px]">
        {rm.name} will be in touch with new recommendations shortly.
      </p>
      <div className="mt-5 flex items-center gap-2">
        <RMAvatar rm={rm} size={28} />
        <span className="text-xs text-gray-400">{rm.name} · {rm.firm}</span>
      </div>
    </motion.div>
  );
}

// ── Wealth Spectrum execution confirmation ────────────────────────────────────
function WealthSpectrumOverlay({ execution }: { execution?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white rounded-2xl flex flex-col z-10 px-5 py-5 justify-center"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl bg-elara-navy flex items-center justify-center flex-shrink-0">
          <span className="text-elara-gold text-sm font-bold tracking-tight">WS</span>
        </div>
        <div>
          <p className="text-elara-navy font-bold text-sm leading-tight">Sent to Wealth Spectrum</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            SEBI-registered PMS infrastructure · Used by all major Indian wealth firms
          </p>
        </div>
      </div>

      {/* What's being executed */}
      {execution && (
        <div className="bg-elara-navy/[0.04] border border-elara-navy/10 rounded-xl px-4 py-3 mb-4">
          <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1.5">
            Execution instruction
          </p>
          <p className="text-sm font-semibold text-elara-navy leading-snug">{execution}</p>
        </div>
      )}

      {/* Status rows */}
      <div className="space-y-2">
        {[
          { icon: '✓', label: 'Instruction received by Wealth Spectrum', done: true },
          { icon: '⏱', label: 'Execution within 1 business day', done: false },
          { icon: '📱', label: 'SMS + email confirmation to Rahul', done: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2.5">
            <span className={`text-xs w-4 text-center ${item.done ? 'text-status-green' : 'text-gray-300'}`}>
              {item.icon}
            </span>
            <p className={`text-[11px] ${item.done ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-gray-300 font-mono mt-4">Ref: WS-2026-0403</p>
    </motion.div>
  );
}

// ── Approve animation overlay ─────────────────────────────────────────────────
function ApprovedOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-status-green-bg rounded-2xl flex flex-col items-center justify-center z-10"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 400, delay: 0.05 }}
        className="w-16 h-16 rounded-full bg-status-green flex items-center justify-center"
      >
        <span className="text-white text-3xl font-bold">✓</span>
      </motion.div>
      <p className="text-status-green font-bold text-lg mt-3">Approved!</p>
      <p className="text-gray-500 text-sm mt-1">Moving to next action…</p>
    </motion.div>
  );
}

// ── Sent confirmation overlay ─────────────────────────────────────────────────
function SentConfirmation({ message, rm }: { message: string; rm: RelationshipManager }) {
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="px-5 py-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-status-green-bg flex items-center justify-center">
          <span className="text-status-green text-xs font-bold">✓</span>
        </div>
        <span className="text-sm font-semibold text-status-green">Message sent to {rm.name}</span>
      </div>

      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
        <p className="text-xs text-gray-600 leading-relaxed italic">&ldquo;{message}&rdquo;</p>
        <p className="text-[10px] text-gray-400 mt-2">Today at {time}</p>
      </div>

      <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
        {rm.name} will follow up within 24 hours.
      </p>
    </motion.div>
  );
}

// ── Discussion composer ───────────────────────────────────────────────────────
function DiscussComposer({
  rm,
  message,
  onChange,
  onSend,
  onCancel,
}: {
  rm: RelationshipManager;
  message: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onCancel: () => void;
}) {
  const remaining = MAX_CHARS - message.length;
  const isOverLimit = remaining < 0;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="mt-4 pt-4 border-t border-gray-100">
        {/* Recipient context */}
        <div className="flex items-center gap-2 mb-3">
          <RMAvatar rm={rm} size={28} />
          <div>
            <p className="text-xs font-semibold text-elara-navy">Message to {rm.name}</p>
            <p className="text-[10px] text-gray-400">{rm.designation} · {rm.firm}</p>
          </div>
        </div>

        {/* Quick reply chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => onChange(reply)}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                message === reply
                  ? 'bg-elara-navy text-white border-elara-navy'
                  : 'border-gray-200 text-gray-500 hover:border-elara-navy hover:text-elara-navy bg-white'
              }`}
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-elara-navy/20 placeholder:text-gray-300 pr-14"
            rows={3}
            placeholder="Or type your own message…"
            value={message}
            onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
            autoFocus
          />
          <span className={`absolute bottom-3 right-3 text-[10px] font-medium ${
            remaining < 50 ? 'text-status-amber' : 'text-gray-300'
          }`}>
            {remaining}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5 mt-3">
          <button
            onClick={onCancel}
            className="flex-1 h-10 border border-gray-200 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSend}
            disabled={!message.trim() || isOverLimit}
            className="flex-[2] h-10 bg-elara-navy text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-elara-navy-light transition-colors flex items-center justify-center gap-1.5"
          >
            Send to {rm.name.split(' ')[0]} →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main card ─────────────────────────────────────────────────────────────────
interface Props {
  recommendations: RMRecommendation[];
  rm: RelationshipManager;
}

export function RMRecommendationCard({ recommendations, rm }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statuses, setStatuses] = useState<LocalStatus[]>(
    recommendations.map((r) => r.status)
  );
  const [discussMode, setDiscussMode] = useState(false);
  const [discussMessage, setDiscussMessage] = useState('');
  const [approvedAnimating, setApprovedAnimating] = useState(false);
  const [wealthSpectrumConfirming, setWealthSpectrumConfirming] = useState(false);
  const [sentConfirmation, setSentConfirmation] = useState<string | null>(null);
  const [showRationale, setShowRationale] = useState(false);

  // Reset local UI state when recommendation changes
  useEffect(() => {
    setDiscussMode(false);
    setDiscussMessage('');
    setShowRationale(false);
    setSentConfirmation(null);
  }, [currentIndex]);

  const allActioned = statuses.every(
    (s) => s === 'approved' || s === 'discussed' || s === 'rejected'
  );

  // Compute next pending from a given statuses array (avoids stale closure bug)
  const findNextPending = useCallback(
    (from: number, currentStatuses: LocalStatus[]): number => {
      for (let offset = 1; offset <= recommendations.length; offset++) {
        const idx = (from + offset) % recommendations.length;
        if (currentStatuses[idx] === 'pending') return idx;
      }
      return -1;
    },
    [recommendations.length]
  );

  const handleApprove = useCallback(() => {
    setApprovedAnimating(true);
    const updated = [...statuses];
    updated[currentIndex] = 'approved';

    // Phase 1: "Approved!" for 1.2s
    setTimeout(() => {
      setStatuses(updated);
      setApprovedAnimating(false);
      // Phase 2: Wealth Spectrum execution screen — held for 4s so the audience can read it
      setWealthSpectrumConfirming(true);
      setTimeout(() => {
        setWealthSpectrumConfirming(false);
        const next = findNextPending(currentIndex, updated);
        if (next !== -1) setCurrentIndex(next);
      }, 4000);
    }, 1200);
  }, [currentIndex, statuses, findNextPending]);

  const handleSendMessage = useCallback(() => {
    const msgSnapshot = discussMessage;
    const updated = [...statuses];
    updated[currentIndex] = 'discussed';

    setStatuses(updated);
    setDiscussMode(false);
    setDiscussMessage('');
    setSentConfirmation(msgSnapshot);

    // Show sent confirmation for 1.8s then advance
    setTimeout(() => {
      setSentConfirmation(null);
      const next = findNextPending(currentIndex, updated);
      if (next !== -1) setCurrentIndex(next);
    }, 1800);
  }, [currentIndex, statuses, discussMessage, findNextPending]);

  const rec = recommendations[currentIndex];
  const { label: urgencyLabel, bg: urgencyBg, text: urgencyText, dot: urgencyDot } =
    urgencyConfig[rec.urgency];

  const isActioned =
    statuses[currentIndex] === 'approved' || statuses[currentIndex] === 'discussed';

  const doneCount = statuses.filter((s) => s === 'approved' || s === 'discussed').length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Card header row */}
      <div className="px-5 pt-5 pb-3 border-b border-gray-50">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
            Advisor Recommendation
          </p>
          <span className="text-[11px] text-gray-400 font-medium">
            {doneCount} / {recommendations.length} actioned
          </span>
        </div>
        {/* Platform value — attributed to system, not individual RM */}
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-status-green flex-shrink-0" />
          <p className="text-[10px] text-gray-400">
            Since joining Shiv Wealth &nbsp;·&nbsp;
            <span className="font-semibold text-status-green">+₹1.8 crore</span>
            {' '}vs. all-FD baseline &nbsp;·&nbsp; 92% approval rate
          </p>
        </div>
      </div>

      {allActioned ? (
        <AllCaughtUp rm={rm} />
      ) : (
        <div className="relative">
          {/* Approve animation overlay */}
          <AnimatePresence>
            {approvedAnimating && <ApprovedOverlay />}
          </AnimatePresence>

          {/* Wealth Spectrum execution confirmation */}
          <AnimatePresence>
            {wealthSpectrumConfirming && (
              <WealthSpectrumOverlay execution={projectedImpact[rec.id]?.wsExecution} />
            )}
          </AnimatePresence>

          {/* Sent confirmation overlay */}
          <AnimatePresence mode="wait">
            {sentConfirmation && (
              <SentConfirmation key="sent" message={sentConfirmation} rm={rm} />
            )}
          </AnimatePresence>

          {/* Main recommendation content */}
          <AnimatePresence mode="wait">
            {!sentConfirmation && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="px-5 pt-4"
              >
                {/* ── RM identity row ─────────────────────────────────────── */}
                <div className="flex items-start gap-3 mb-4">
                  <RMAvatar rm={rm} size={52} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-sm font-bold text-elara-navy">{rm.name}</p>
                      <span className="px-1.5 py-0.5 bg-elara-gold/10 rounded text-[9px] font-semibold text-elara-gold tracking-wide">
                        {rm.certification}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                      {rm.designation}
                    </p>
                    <p className="text-[11px] text-gray-400">{rm.firm}</p>
                  </div>
                  {/* Urgency badge */}
                  <span className={`flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${urgencyBg} ${urgencyText}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${urgencyDot}`} />
                    {urgencyLabel}
                  </span>
                </div>

                {/* ── Recommendation content ───────────────────────────── */}
                <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mb-1">
                  {categoryLabel[rec.category] ?? rec.category}
                </p>
                <h3 className="text-base font-bold text-elara-navy leading-snug">
                  {rec.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {rec.summary}
                </p>

                {/* Rationale expand */}
                <button
                  onClick={() => setShowRationale((v) => !v)}
                  className="mt-2 text-[11px] text-elara-navy font-semibold hover:underline"
                >
                  {showRationale ? 'Hide reasoning ↑' : "See Priya's reasoning →"}
                </button>

                <AnimatePresence>
                  {showRationale && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 mb-1 bg-gray-50 rounded-xl p-3 border-l-2 border-elara-gold">
                        <p className="text-xs text-gray-600 leading-relaxed italic">
                          {rec.rationale}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Impact amount */}
                {rec.impactAmount && (
                  <div className="mt-3 inline-flex items-center gap-1.5 bg-elara-gold/10 rounded-lg px-3 py-1.5">
                    <span className="text-elara-gold text-xs">💰</span>
                    <span className="text-xs font-semibold text-elara-navy">
                      {formatCompact(rec.impactAmount)} estimated impact
                    </span>
                  </div>
                )}

                {/* ── Discuss composer ──────────────────────────────────── */}
                <AnimatePresence>
                  {discussMode && (
                    <DiscussComposer
                      rm={rm}
                      message={discussMessage}
                      onChange={setDiscussMessage}
                      onSend={handleSendMessage}
                      onCancel={() => { setDiscussMode(false); setDiscussMessage(''); }}
                    />
                  )}
                </AnimatePresence>

                {/* ── Data behind this recommendation ── */}
                {!isActioned && !discussMode && (() => {
                  const impact = projectedImpact[rec.id];
                  if (!impact) return null;
                  return (
                    <div className="mt-4 space-y-3">
                      {/* Based on — the WHY Rahul can trust */}
                      <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                        <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-2">
                          Data behind this recommendation
                        </p>
                        <ul className="space-y-1.5">
                          {impact.basedOn.map((point) => (
                            <li key={point} className="flex items-start gap-2">
                              <span className="text-elara-gold text-[10px] font-bold mt-0.5 flex-shrink-0">→</span>
                              <span className="text-[11px] text-gray-600 leading-snug">{point}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-[10px] text-gray-400 mt-2 italic">
                          Priya reviewed and approved this analysis
                        </p>
                      </div>

                      {/* If you approve */}
                      <div className="bg-elara-navy/[0.04] border border-elara-navy/10 rounded-xl px-4 py-3">
                        <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-2">
                          If you approve
                        </p>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-[10px] text-gray-400">Health Score</p>
                            <p className="text-sm font-bold text-elara-navy">
                              {impact.scoreFrom} → <span className="text-status-green">{impact.scoreTo}</span>
                              <span className="text-[10px] text-status-green font-semibold ml-1">
                                (+{impact.scoreTo - impact.scoreFrom})
                              </span>
                            </p>
                          </div>
                          <div className="w-px h-8 bg-gray-200" />
                          <div>
                            <p className="text-[10px] text-gray-400">{impact.goalLabel}</p>
                            <p className="text-sm font-bold text-elara-navy">{impact.goalDetail}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* ── Action buttons ───────────────────────────────────── */}
                {!isActioned && !discussMode && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleApprove}
                      className="flex-1 h-11 bg-elara-navy text-white rounded-xl text-sm font-semibold hover:bg-elara-navy-light active:scale-[0.98] transition-all"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setDiscussMode(true)}
                      className="flex-1 h-11 border-2 border-elara-navy text-elara-navy rounded-xl text-sm font-semibold hover:bg-elara-navy/5 active:scale-[0.98] transition-all"
                    >
                      Discuss
                    </button>
                  </div>
                )}

                {/* Actioned state */}
                {isActioned && (
                  <div className={`mt-4 flex items-center gap-2 text-sm font-semibold ${
                    statuses[currentIndex] === 'approved' ? 'text-status-green' : 'text-elara-navy'
                  }`}>
                    <span>✓</span>
                    <span>
                      {statuses[currentIndex] === 'approved' ? 'Approved' : 'Sent for discussion'}
                    </span>
                  </div>
                )}

                {/* Expiry note */}
                {rec.expiresAt && !isActioned && (
                  <p className="mt-2 text-[10px] text-gray-400">
                    This recommendation expires{' '}
                    {new Date(rec.expiresAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                )}

                {/* ── Navigation ───────────────────────────────────────── */}
                <div className="mt-5 pb-5 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                    disabled={currentIndex === 0}
                    className="text-[11px] text-gray-400 hover:text-elara-navy disabled:opacity-30 transition-colors font-medium"
                  >
                    ← Prev
                  </button>

                  <NavDots
                    total={recommendations.length}
                    current={currentIndex}
                    statuses={statuses}
                    onSelect={setCurrentIndex}
                  />

                  <button
                    onClick={() => setCurrentIndex((i) => Math.min(recommendations.length - 1, i + 1))}
                    disabled={currentIndex === recommendations.length - 1}
                    className="text-[11px] text-gray-400 hover:text-elara-navy disabled:opacity-30 transition-colors font-medium"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
