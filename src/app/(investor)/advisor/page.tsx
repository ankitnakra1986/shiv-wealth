import { IPSChat } from '@/components/advisor/IPSChat';

export default function AdvisorPage() {
  return (
    <div className="flex flex-col h-[calc(100dvh-64px)] max-w-lg mx-auto w-full">
      {/* Header */}
      <header className="bg-elara-navy px-5 pt-10 pb-5 flex-shrink-0">
        <p className="text-elara-gold text-[11px] font-semibold tracking-[0.18em] uppercase">
          Shiv Wealth
        </p>
        <h1 className="text-white text-[22px] font-semibold mt-2 leading-snug">
          Your Advisor
        </h1>
        <p className="text-white/50 text-sm mt-0.5">
          Investment Policy Statement
        </p>
      </header>

      {/* Chat fills remaining height */}
      <div className="flex-1 bg-elara-surface overflow-hidden flex flex-col">
        <IPSChat />
      </div>
    </div>
  );
}
