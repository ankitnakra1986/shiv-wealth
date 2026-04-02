import Image from 'next/image';
import Link from 'next/link';
import { mockRM } from '@/data/mock-rm';
import { mockRMClients, rmPortfolioStats } from '@/data/mock-rm-clients';
import { RMClientCard } from '@/components/rm/RMClientCard';
import { RMActionBar } from '@/components/rm/RMActionBar';
import { formatCompact } from '@/lib/utils/formatters';
import { formatDisplayDate } from '@/lib/utils/dates';
import { TrustFooter } from '@/components/layout/TrustFooter';

// ── Stat pill ─────────────────────────────────────────────────────────────────
function StatPill({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center px-4 py-2.5 bg-white/10 rounded-xl min-w-[80px]">
      <span className={`text-lg font-bold leading-none ${highlight ? 'text-elara-gold' : 'text-white'}`}>
        {value}
      </span>
      <span className="text-white/50 text-[10px] font-medium mt-1 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

export default function RMDashboardPage() {
  const date = formatDisplayDate();

  return (
    <div className="flex flex-col min-h-screen bg-elara-surface">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="bg-elara-navy px-6 pt-12 pb-6">
        <div className="max-w-5xl mx-auto">
          {/* Brand + date */}
          <div className="flex items-start justify-between">
            <span className="text-elara-gold text-[11px] font-semibold tracking-[0.18em] uppercase">
              Shiv Wealth · RM Portal
            </span>
            <span className="text-white/40 text-[11px]">{date}</span>
          </div>

          {/* RM identity + stats — side by side on desktop */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mt-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 ring-2 ring-elara-gold/40">
                <Image src={mockRM.photoUrl} alt={mockRM.name} fill sizes="48px" loading="eager" className="object-cover" />
              </div>
              <div>
                <h1 className="text-white text-[20px] font-bold leading-tight">{mockRM.name}</h1>
                <p className="text-white/50 text-[11px] mt-0.5">
                  {mockRM.designation} · {mockRM.certification} · {mockRM.experience}
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-2.5">
              <StatPill label="Clients" value={rmPortfolioStats.totalClients} />
              <StatPill label="Total AUM" value={formatCompact(rmPortfolioStats.totalAUM)} highlight />
              <StatPill label="Pending" value={rmPortfolioStats.totalPending} highlight={rmPortfolioStats.totalPending > 0} />
              <StatPill label="Avg Score" value={rmPortfolioStats.avgEfficiency} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Client grid — 3 columns on desktop ───────────────────────────── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
            Your Clients · AI-Prioritised
          </p>
          <RMActionBar rmName={mockRM.name} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mockRMClients.map((client, i) => (
            <RMClientCard key={client.id} client={client} index={i} />
          ))}
        </div>

        <div className="pt-4 text-center mt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-elara-navy border border-elara-navy/20 px-4 py-2 rounded-xl hover:bg-elara-navy hover:text-white transition-colors"
          >
            ← Switch to Investor View
          </Link>
        </div>
        <TrustFooter synced={date} />
      </main>
    </div>
  );
}
