import Link from 'next/link';
import { getInvestorSnapshot } from '@/lib/utils/investor-snapshot';
import { formatCompact } from '@/lib/utils/formatters';
import { formatDisplayDate } from '@/lib/utils/dates';
import { EfficiencyScoreCard } from '@/components/dashboard/EfficiencyScoreCard';
import { GoalsSection } from '@/components/dashboard/GoalsSection';
import { RMRecommendationCard } from '@/components/dashboard/RMRecommendationCard';
import { TrustFooter } from '@/components/layout/TrustFooter';
import { InviteAdvisorTrigger } from '@/components/dashboard/InviteAdvisorTrigger';
import { ClientGreeting } from '@/components/dashboard/ClientGreeting';

function SinceLastVisit() {
  const deltas = [
    { icon: '↑', label: 'Portfolio +₹1.8L', color: 'text-status-green' },
    { icon: '●', label: '1 new action from Priya', color: 'text-elara-gold', href: '/actions' },
    { icon: '→', label: 'Retirement: 40% (unchanged)', color: 'text-gray-400' },
  ];
  return (
    <div className="bg-elara-navy/[0.03] border-b border-gray-100 px-6 py-2.5">
      <div className="max-w-5xl mx-auto flex items-center gap-1.5 flex-wrap">
        <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mr-1">
          Since last visit
        </span>
        {deltas.map((d, i) => (
          <span key={d.label} className="flex items-center gap-1">
            {i > 0 && <span className="text-gray-200 text-[10px]">·</span>}
            {d.href ? (
              <Link href={d.href} className={`text-[11px] font-semibold ${d.color} hover:underline`}>
                {d.icon} {d.label}
              </Link>
            ) : (
              <span className={`text-[11px] font-medium ${d.color}`}>
                {d.icon} {d.label}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}


function WealthPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${color}`} />
      <span className="text-white/60 text-[11px]">{label}</span>
      <span className="text-white/90 text-[11px] font-semibold ml-1">{value}</span>
    </div>
  );
}

export default async function DashboardPage() {
  const snapshot = await getInvestorSnapshot('inv-001');
  const { investor } = snapshot;
  const { wealthBreakdown } = investor;
  const date = formatDisplayDate();

  const equityTotal =
    wealthBreakdown.mutualFunds + wealthBreakdown.equityBroker1 + wealthBreakdown.equityBroker2;

  return (
    <div className="flex flex-col min-h-screen bg-elara-surface">

      {/* ── Full-width navy header ────────────────────────────────────────── */}
      <header className="bg-elara-navy px-6 pt-12 pb-7">
        <div className="max-w-5xl mx-auto">
          {/* Brand row */}
          <div className="flex items-start justify-between">
            <span className="text-elara-gold text-[11px] font-semibold tracking-[0.18em] uppercase">
              Shiv Wealth
            </span>
            <div className="flex items-center gap-4">
              <InviteAdvisorTrigger />
              <Link href="/rm" className="text-white/30 text-[10px] font-medium hover:text-white/60 transition-colors">
                RM View →
              </Link>
              <span className="text-white/40 text-[11px]">{date}</span>
            </div>
          </div>

          {/* Greeting + wealth — side by side on desktop */}
          <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            {/* Left: greeting */}
            <div>
              <h1 className="text-white text-[24px] font-semibold leading-snug">
                <ClientGreeting firstName={investor.name.split(' ')[0]} />
              </h1>
              <p className="text-white/50 text-sm mt-0.5">Here&apos;s your financial snapshot</p>
            </div>

            {/* Right: wealth card */}
            <div className="bg-white/5 rounded-2xl px-5 py-4 border border-white/10 lg:min-w-[340px]">
              <p className="text-white/50 text-[10px] font-semibold tracking-widest uppercase">
                Total Wealth
              </p>
              <div className="flex items-end justify-between gap-4">
                <p className="text-white text-[38px] font-bold tracking-tight leading-none mt-1">
                  {formatCompact(investor.totalWealth)}
                </p>
                <div className="text-right pb-0.5">
                  <span className="text-status-green text-sm font-semibold">↑ 8.2%</span>
                  <p className="text-white/40 text-[10px]">vs last year</p>
                </div>
              </div>

              {/* All 4 asset pills */}
              <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-x-5 gap-y-1.5">
                <WealthPill label="Equity" value={formatCompact(equityTotal)} color="bg-blue-400" />
                <WealthPill label="Fixed Deposits" value={formatCompact(wealthBreakdown.fixedDeposits)} color="bg-yellow-400" />
                <WealthPill label="Real Estate" value={formatCompact(wealthBreakdown.realEstate)} color="bg-purple-400" />
                <WealthPill label="Savings & Other"
                  value={formatCompact(wealthBreakdown.bankSavings + wealthBreakdown.otherInvestments)}
                  color="bg-emerald-400"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Since last visit ─────────────────────────────────────────────── */}
      <SinceLastVisit />

      {/* ── 2-column desktop grid ─────────────────────────────────────────── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left column: Efficiency Score */}
          <div>
            <EfficiencyScoreCard efficiencyScore={snapshot.efficiencyScore} />
          </div>

          {/* Right column: Goals + RM Recommendation */}
          <div className="space-y-5">
            <GoalsSection goals={snapshot.goals} investorAge={investor.age} />
            <RMRecommendationCard recommendations={snapshot.recommendations} rm={snapshot.rm} />
          </div>

        </div>

        <TrustFooter synced={date} />
      </main>

    </div>
  );
}
