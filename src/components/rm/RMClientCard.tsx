'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { RMClientSummary, ClientStatus, AIPriority } from '@/data/mock-rm-clients';
import { formatCompact } from '@/lib/utils/formatters';

const aiPriorityConfig: Record<AIPriority, { label: string; bg: string; text: string; dot: string }> = {
  urgent: { label: 'AI: Urgent',  bg: 'bg-status-red-bg',    text: 'text-status-red',   dot: 'bg-status-red'   },
  high:   { label: 'AI: High',    bg: 'bg-status-amber-bg',  text: 'text-status-amber', dot: 'bg-status-amber' },
  medium: { label: 'AI: Medium',  bg: 'bg-blue-50',          text: 'text-blue-600',     dot: 'bg-blue-400'     },
  low:    { label: 'AI: Low',     bg: 'bg-gray-100',         text: 'text-gray-400',     dot: 'bg-gray-300'     },
};

// ── Status config ─────────────────────────────────────────────────────────────
const statusConfig: Record<ClientStatus, { border: string; badge: string; label: string; dot: string }> = {
  healthy:   { border: 'border-l-status-green',  badge: 'bg-status-green-bg text-status-green',  label: 'Healthy',        dot: 'bg-status-green'  },
  attention: { border: 'border-l-status-amber',  badge: 'bg-status-amber-bg text-status-amber',  label: 'Needs attention', dot: 'bg-status-amber'  },
  critical:  { border: 'border-l-status-red',    badge: 'bg-status-red-bg text-status-red',      label: 'At risk',        dot: 'bg-status-red'    },
};

// ── Score bar ────────────────────────────────────────────────────────────────
function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80 ? 'bg-status-green' :
    score >= 65 ? 'bg-status-amber' :
    'bg-status-red';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
      <span className="text-xs font-bold text-gray-700 w-7 text-right">{score}</span>
    </div>
  );
}

// ── Card inner content ────────────────────────────────────────────────────────
function CardContent({ client }: { client: RMClientSummary }) {
  const cfg = statusConfig[client.status];

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${cfg.border} overflow-hidden`}>
      <div className="px-4 py-4">
        {/* Top row: name + status badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-bold text-elara-navy text-base leading-tight">{client.name}</p>
            <p className="text-gray-400 text-[11px] mt-0.5">
              {client.occupation} · {client.age} yrs
            </p>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0 ${cfg.badge}`}>
            {cfg.label}
          </span>
        </div>

        {/* Wealth */}
        <p className="text-[28px] font-bold text-elara-navy tracking-tight leading-none mt-3">
          {formatCompact(client.totalWealth)}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5 font-medium tracking-wide uppercase">Total AUM</p>

        {/* Efficiency score */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
              Efficiency Score
            </span>
          </div>
          <ScoreBar score={client.efficiencyScore} />
        </div>

        {/* Goals + pending row */}
        <div className="mt-4 pt-3.5 border-t border-gray-50 flex items-center justify-between">
          {/* Goals */}
          <div className="flex items-center gap-3">
            {client.goalsOnTrack > 0 && (
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-status-green" />
                <span className="text-[11px] text-gray-500 font-medium">
                  {client.goalsOnTrack} on track
                </span>
              </div>
            )}
            {client.goalsAtRisk > 0 && (
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-full ${client.status === 'critical' ? 'bg-status-red' : 'bg-status-amber'}`} />
                <span className="text-[11px] text-gray-500 font-medium">
                  {client.goalsAtRisk} at risk
                </span>
              </div>
            )}
          </div>

          {/* Pending badge */}
          {client.pendingRecommendations > 0 && (
            <span className="bg-elara-navy text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              {client.pendingRecommendations} pending
            </span>
          )}
        </div>

        {/* AI Priority indicator with reason */}
        <div className="mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center justify-between mb-1.5">
            {(() => {
              const ap = aiPriorityConfig[client.aiPriority];
              return (
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full ${ap.bg} ${ap.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${ap.dot}`} />
                  {ap.label}
                </span>
              );
            })()}
            {client.href && (
              <p className="text-[10px] text-elara-gold font-semibold">View dashboard →</p>
            )}
          </div>
          <p className="text-[10px] text-gray-400 leading-snug">{client.aiPriorityReason}</p>
        </div>
      </div>
    </div>
  );
}

// ── Exported card ─────────────────────────────────────────────────────────────
export function RMClientCard({
  client,
  index,
}: {
  client: RMClientSummary;
  index: number;
}) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={client.href ? 'cursor-pointer hover:scale-[1.01] transition-transform duration-150' : ''}
    >
      <CardContent client={client} />
    </motion.div>
  );

  if (client.href) {
    return <Link href={client.href}>{card}</Link>;
  }

  return card;
}
