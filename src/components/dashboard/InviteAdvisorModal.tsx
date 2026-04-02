'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  open: boolean;
  onClose: () => void;
}

const accessOptions = [
  {
    icon: '📊',
    role: 'Chartered Accountant',
    tagline: 'Tax-season conversations in 20 minutes, not 3 hours.',
    canSee: [
      'Total wealth & asset breakdown',
      'LTCG / STCG exposure',
      '80C & 80D utilisation',
      'FD interest accruing this year',
    ],
    cannotSee: [
      'Investment Policy Statement',
      'Priya\'s recommendations',
      'Individual transaction history',
    ],
    ctaLabel: 'Send invite to CA',
    accentColor: 'border-blue-200 bg-blue-50',
    iconBg: 'bg-blue-100',
  },
  {
    icon: '👨‍👩‍👧',
    role: 'Spouse or Family',
    tagline: 'Your family sees the goals. Nothing more, nothing less.',
    canSee: [
      'Goal progress (Education, Retirement, Lifestyle)',
      'Total wealth — headline number only',
      'Monthly savings pace',
    ],
    cannotSee: [
      'Specific fund holdings',
      'Advisory notes & IPS',
      'Efficiency Score breakdown',
    ],
    ctaLabel: 'Share with family',
    accentColor: 'border-purple-200 bg-purple-50',
    iconBg: 'bg-purple-100',
  },
  {
    icon: '📈',
    role: 'Existing Broker',
    tagline: 'Your broker gives better advice when they see the full picture.',
    canSee: [
      'Portfolio summary & asset allocation',
      'Goals and gaps',
      'Efficiency Score (headline)',
    ],
    cannotSee: [
      'Priya\'s specific recommendations',
      'IPS details & personal notes',
      'Other advisor communications',
    ],
    ctaLabel: 'Invite broker',
    accentColor: 'border-green-200 bg-green-50',
    iconBg: 'bg-green-100',
  },
];

export function InviteAdvisorModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Bottom sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[88vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* Header */}
            <div className="px-6 pt-3 pb-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-elara-navy font-bold text-lg leading-tight">
                    Invite an advisor
                  </h2>
                  <p className="text-gray-400 text-sm mt-0.5">
                    Give read-only access. You stay in full control.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-300 hover:text-gray-500 transition-colors text-xl leading-none mt-0.5"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="px-6 py-5 space-y-4">
              {accessOptions.map((opt, i) => (
                <motion.div
                  key={opt.role}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.25 }}
                  className={`rounded-2xl border p-4 ${opt.accentColor}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${opt.iconBg}`}>
                      {opt.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-elara-navy">{opt.role}</p>
                      <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{opt.tagline}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1.5">Can see</p>
                      <ul className="space-y-1">
                        {opt.canSee.map((item) => (
                          <li key={item} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                            <span className="text-status-green text-[10px] font-bold mt-0.5 flex-shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1.5">Cannot see</p>
                      <ul className="space-y-1">
                        {opt.cannotSee.map((item) => (
                          <li key={item} className="flex items-start gap-1.5 text-[11px] text-gray-400">
                            <span className="text-gray-300 text-[10px] font-bold mt-0.5 flex-shrink-0">✕</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => {}}
                    className="w-full h-9 bg-elara-navy text-white rounded-xl text-xs font-semibold hover:bg-elara-navy/90 transition-colors"
                  >
                    {opt.ctaLabel}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Privacy note */}
            <div className="px-6 pb-8 pt-1 text-center">
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Access can be revoked anytime from Settings.
                Invitees cannot make transactions or changes on your behalf.
              </p>
              <div className="flex items-center justify-center gap-1 mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-status-green" />
                <span className="text-[10px] text-gray-400">256-bit encrypted · SEBI compliant data sharing</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
