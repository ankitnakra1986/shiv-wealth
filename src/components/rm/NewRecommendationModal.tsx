'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRMClients } from '@/data/mock-rm-clients';

interface Props {
  open: boolean;
  onClose: () => void;
  rmName: string;
}

const recTypes = [
  'Portfolio Rebalancing',
  'Goal Alignment',
  'Tax Optimisation',
  'Insurance Review',
  'New Opportunity',
];

export function NewRecommendationModal({ open, onClose, rmName }: Props) {
  const [clientId, setClientId]   = useState('');
  const [recType, setRecType]     = useState('');
  const [urgency, setUrgency]     = useState<'high' | 'medium' | 'low' | ''>('');
  const [amount, setAmount]       = useState('');
  const [rationale, setRationale] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isValid = clientId && recType && urgency && rationale.trim().length > 10;

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
  };

  const handleClose = () => {
    // Reset form on close
    setClientId(''); setRecType(''); setUrgency('');
    setAmount(''); setRationale(''); setSubmitted(false);
    onClose();
  };

  const selectedClient = mockRMClients.find((c) => c.id === clientId);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          <motion.div
            key="sheet"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[92vh] overflow-y-auto"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            <div className="px-6 pt-3 pb-4 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-elara-navy font-bold text-lg">New Recommendation</h2>
                  <p className="text-gray-400 text-sm mt-0.5">{rmName} · Shiv Wealth Platform</p>
                </div>
                <button onClick={handleClose} className="text-gray-300 hover:text-gray-500 text-xl">✕</button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-6 py-12 flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-status-green-bg flex items-center justify-center mb-4"
                  >
                    <span className="text-status-green text-3xl font-bold">✓</span>
                  </motion.div>
                  <p className="text-elara-navy font-bold text-lg">Recommendation sent</p>
                  <p className="text-gray-400 text-sm mt-1.5 leading-relaxed max-w-xs">
                    {recType} recommendation sent to{' '}
                    <span className="font-semibold text-elara-navy">{selectedClient?.name}</span> via Shiv Wealth Platform.
                  </p>
                  <div className="mt-5 bg-gray-50 rounded-xl px-4 py-3 w-full text-left">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Reference</p>
                    <p className="text-xs font-mono text-elara-navy">
                      REC-{new Date().getFullYear()}-{String(Math.floor(Math.random() * 9000) + 1000)}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      Client will see this in their Actions tab · Priya Mehta notified
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-6 w-full h-11 bg-elara-navy text-white rounded-xl text-sm font-semibold"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" className="px-6 py-5 space-y-5 pb-10">

                  {/* Client selector */}
                  <div>
                    <label className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 block mb-2">
                      Client
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {mockRMClients.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setClientId(c.id)}
                          className={`text-left px-4 py-3 rounded-xl border transition-all ${
                            clientId === c.id
                              ? 'bg-elara-navy text-white border-elara-navy'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-elara-navy'
                          }`}
                        >
                          <p className="text-sm font-semibold leading-tight">{c.name}</p>
                          <p className={`text-[11px] mt-0.5 ${clientId === c.id ? 'text-white/60' : 'text-gray-400'}`}>
                            {c.occupation} · ₹{(c.totalWealth / 10000000).toFixed(1)}Cr AUM
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recommendation type */}
                  <div>
                    <label className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 block mb-2">
                      Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {recTypes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setRecType(t)}
                          className={`text-xs px-3 py-2 rounded-xl border font-medium transition-all ${
                            recType === t
                              ? 'bg-elara-navy text-white border-elara-navy'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-elara-navy'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Urgency */}
                  <div>
                    <label className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 block mb-2">
                      Urgency
                    </label>
                    <div className="flex gap-2">
                      {(['high', 'medium', 'low'] as const).map((u) => (
                        <button
                          key={u}
                          onClick={() => setUrgency(u)}
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold border capitalize transition-all ${
                            urgency === u
                              ? u === 'high'   ? 'bg-status-red-bg text-status-red border-status-red'
                              : u === 'medium' ? 'bg-status-amber-bg text-status-amber border-status-amber'
                              :                  'bg-status-green-bg text-status-green border-status-green'
                              : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount (optional) */}
                  <div>
                    <label className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 block mb-2">
                      Estimated Amount <span className="normal-case font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                      <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="e.g. 12,00,000"
                        className="w-full h-11 border border-gray-200 rounded-xl pl-7 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-elara-navy/20 placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  {/* Rationale */}
                  <div>
                    <label className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 block mb-2">
                      Rationale
                    </label>
                    <textarea
                      rows={4}
                      value={rationale}
                      onChange={(e) => setRationale(e.target.value)}
                      placeholder="Explain the recommendation and why it's right for this client right now…"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-elara-navy/20 placeholder:text-gray-300"
                    />
                    <p className="text-[10px] text-gray-300 mt-1">{rationale.length} / 500</p>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    className="w-full h-12 bg-elara-navy text-white rounded-xl font-semibold text-sm disabled:opacity-40 hover:bg-elara-navy/90 transition-colors"
                  >
                    Send to Client →
                  </button>

                  <p className="text-center text-[10px] text-gray-400">
                    Client will receive this in their Actions tab instantly
                  </p>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
