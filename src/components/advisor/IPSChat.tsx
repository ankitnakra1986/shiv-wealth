'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ipsQuestions } from '@/data/mock-ips';
import { mockIPSSummary } from '@/data/mock-ips';
import { mockRM } from '@/data/mock-rm';
import { mockInvestor } from '@/data/mock-investor';
import { IPSSummaryCard } from './IPSSummaryCard';

// ── Types ─────────────────────────────────────────────────────────────────────
interface ChatMsg {
  id: string;
  sender: 'priya' | 'rahul';
  text: string;
}

type Phase = 'idle' | 'active' | 'generating' | 'complete';

// ── Which questions have chip options (1-indexed to match IPS question ids) ───
const chipOptions: Record<number, string[]> = {
  2: ["I'd sell to cut losses",       "Hold steady — this is long-term",  "I'd invest more while prices are down"],
  3: ["Less than 1 year",              "1 to 3 years",                     "3 to 5 years",                         "5 or more years"],
  5: ["Yes, I think I'm well covered", "Probably not — need to review it", "Honestly not sure"],
  7: ["Understand every decision",     "Trust my advisor to act",          "Somewhere in between"],
  8: ["Yes, several I'd never touch",  "A few specific things",            "No real restrictions"],
};

// Which chip index maps to Rahul's pre-filled answer (0-indexed in chip array)
const demoChipIndex: Record<number, number> = {
  2: 1, // "Hold steady"
  3: 2, // "3 to 5 years"
  5: 1, // "Probably not"
  7: 2, // "Somewhere in between"
  8: 0, // "Yes, several I'd never touch"
};

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-white rounded-2xl rounded-tl-sm shadow-sm w-fit">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-gray-300 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────
function MessageBubble({ msg, partial }: { msg: ChatMsg; partial?: boolean }) {
  const isPriya = msg.sender === 'priya';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-2.5 ${isPriya ? 'justify-start' : 'justify-end'}`}
    >
      {isPriya && (
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1 bg-gray-200 ring-1 ring-elara-gold/30">
                    <Image src="/priya-mehta.jpg" alt="Priya" fill sizes="32px" className="object-cover" />
        </div>
      )}

      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isPriya
            ? 'bg-white text-gray-800 rounded-tl-sm'
            : 'bg-elara-navy text-white rounded-tr-sm'
        } ${partial ? 'border-r-2 border-elara-gold' : ''}`}
      >
        {msg.text}
        {partial && <span className="inline-block w-0.5 h-3.5 bg-elara-gold ml-0.5 animate-pulse align-middle" />}
      </div>

      {!isPriya && (
        <div className="w-8 h-8 rounded-full bg-elara-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-elara-navy text-xs font-bold">
            {mockInvestor.name.split(' ')[0][0]}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ── Chip input ────────────────────────────────────────────────────────────────
function ChipInput({
  options,
  selected,
  onSelect,
  disabled,
}: {
  options: string[];
  selected: string | null;
  onSelect: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          disabled={disabled}
          onClick={() => onSelect(opt)}
          className={`text-xs px-3 py-2 rounded-xl border transition-all duration-150 font-medium ${
            selected === opt
              ? 'bg-elara-navy text-white border-elara-navy scale-[1.02]'
              : 'bg-white text-gray-600 border-gray-200 hover:border-elara-navy hover:text-elara-navy disabled:opacity-50'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ── Generating overlay ────────────────────────────────────────────────────────
function GeneratingIPS() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <div className="flex gap-2 mb-5">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-elara-gold"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}
      </div>
      <p className="text-elara-navy font-bold text-base">Priya is building your IPS…</p>
      <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">
        Analysing your answers and crafting<br />your personalised investment strategy.
      </p>
    </motion.div>
  );
}

// ── Intro screen ──────────────────────────────────────────────────────────────
function IntroScreen({
  onStart,
  onDemo,
}: {
  onStart: () => void;
  onDemo: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center px-6 py-8"
    >
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 ring-3 ring-elara-gold/40 mb-4">
        <Image src="/priya-mehta.jpg" alt="Priya Mehta" fill sizes="64px" className="object-cover" />
      </div>
      <p className="text-elara-navy font-bold text-base">Priya Mehta</p>
      <p className="text-gray-400 text-xs mt-0.5">{mockRM.designation} · {mockRM.certification} · {mockRM.firm}</p>

      <div className="mt-5 bg-white rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm text-sm text-gray-700 leading-relaxed text-left">
        {mockInvestor.name.split(' ')[0]}, building your Investment Policy Statement takes about 8 minutes.
        I&apos;ll ask about your goals, risk comfort, and what truly matters to you — not just the numbers.
        Everything you share stays private between us.
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-status-green flex-shrink-0" />
        <span className="text-[10px] text-gray-400">End-to-end encrypted · Private to you and your advisor</span>
      </div>

      <div className="mt-5 flex flex-col gap-2.5 w-full">
        <button
          onClick={onDemo}
          className="w-full h-11 bg-elara-navy text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-elara-navy-light transition-colors"
        >
          <span>▶</span> Play demo conversation
        </button>
        <button
          onClick={onStart}
          className="w-full h-11 border-2 border-elara-navy text-elara-navy rounded-xl font-semibold text-sm hover:bg-elara-navy/5 transition-colors"
        >
          Start my own conversation
        </button>
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function IPSChat() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [qIndex, setQIndex] = useState(-1);      // current question (0-based)
  const [priyadTyping, setPriyadTyping] = useState(false);
  const [rahulPartialText, setRahulPartialText] = useState('');
  const [chipSelected, setChipSelected] = useState<string | null>(null);
  const [userText, setUserText] = useState('');
  const [isDemo, setIsDemo] = useState(false);

  const mounted = useRef(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentQIndex = useRef(-1);   // track current Q without stale closure

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  // Auto-scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, priyadTyping, rahulPartialText, phase]);

  const addMsg = useCallback((msg: ChatMsg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  // ── Core: advance conversation ────────────────────────────────────────────
  const advanceToQuestion = useCallback((index: number, demoMode: boolean) => {
    if (!mounted.current || index >= ipsQuestions.length) {
      if (index >= ipsQuestions.length) {
        setPhase('generating');
        setTimeout(() => {
          if (mounted.current) setPhase('complete');
        }, 2600);
      }
      return;
    }

    currentQIndex.current = index;
    setPriyadTyping(true);

    setTimeout(() => {
      if (!mounted.current) return;
      setPriyadTyping(false);

      const question = ipsQuestions[index];
      addMsg({ id: `q-${index}`, sender: 'priya', text: question.question });
      setQIndex(index);
      setChipSelected(null);

      if (!demoMode) return; // manual mode — wait for user input

      const answer = mockIPSSummary.answers[index].answer;
      const qNum = question.id;
      const chips = chipOptions[qNum];

      if (chips) {
        // Highlight the matching chip, then type the full answer
        const chipIdx = demoChipIndex[qNum] ?? 0;
        setTimeout(() => {
          if (!mounted.current) return;
          setChipSelected(chips[chipIdx]);
          setTimeout(() => {
            if (!mounted.current) return;
            typeRahulAnswer(answer, index, demoMode);
          }, 750);
        }, 950);
      } else {
        setTimeout(() => {
          if (!mounted.current) return;
          typeRahulAnswer(answer, index, demoMode);
        }, 1100);
      }
    }, 950);
  }, [addMsg]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Typing animation ──────────────────────────────────────────────────────
  function typeRahulAnswer(text: string, index: number, demoMode: boolean) {
    let i = 0;
    setRahulPartialText('');

    function tick() {
      if (!mounted.current) return;
      i++;
      setRahulPartialText(text.slice(0, i));
      if (i < text.length) {
        setTimeout(tick, 18);
      } else {
        setTimeout(() => {
          if (!mounted.current) return;
          addMsg({ id: `a-${index}`, sender: 'rahul', text });
          setRahulPartialText('');
          setChipSelected(null);
          setTimeout(() => {
            if (!mounted.current) return;
            advanceToQuestion(index + 1, demoMode);
          }, 650);
        }, 280);
      }
    }
    setTimeout(tick, 18);
  }

  // ── Start handlers ────────────────────────────────────────────────────────
  const handleStartDemo = useCallback(() => {
    setIsDemo(true);
    setPhase('active');
    setMessages([]);
    setQIndex(-1);
    advanceToQuestion(0, true);
  }, [advanceToQuestion]);

  const handleStartManual = useCallback(() => {
    setIsDemo(false);
    setPhase('active');
    setMessages([]);
    setQIndex(-1);
    advanceToQuestion(0, false);
  }, [advanceToQuestion]);

  // ── Manual submit ─────────────────────────────────────────────────────────
  const handleManualSubmit = useCallback(() => {
    const answer = chipSelected ?? userText.trim();
    if (!answer || qIndex < 0) return;

    addMsg({ id: `a-${qIndex}`, sender: 'rahul', text: answer });
    setUserText('');
    setChipSelected(null);
    advanceToQuestion(qIndex + 1, false);
  }, [chipSelected, userText, qIndex, addMsg, advanceToQuestion]);

  // Current question object (for input rendering)
  const currentQ = qIndex >= 0 && qIndex < ipsQuestions.length ? ipsQuestions[qIndex] : null;
  const hasChips = currentQ ? !!chipOptions[currentQ.id] : false;
  const isWaitingForInput = phase === 'active' && !priyadTyping && !rahulPartialText && qIndex >= 0 && !isDemo;
  const progressPct = qIndex < 0 ? 0 : Math.round(((qIndex + 1) / ipsQuestions.length) * 100);

  return (
    <div className="flex flex-col h-full">
      {/* Progress bar — only during active conversation */}
      {phase !== 'idle' && phase !== 'complete' && (
        <div className="px-4 py-3 bg-white border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-gray-500">
              {phase === 'generating' ? 'Generating your IPS…' : `Question ${Math.max(qIndex + 1, 1)} of ${ipsQuestions.length}`}
            </span>
            <span className="text-[11px] font-semibold text-elara-navy">{progressPct}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-elara-gold rounded-full"
              animate={{ width: `${phase === 'generating' ? 95 : progressPct}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      )}

      {/* Messages scroll area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0"
      >
        <AnimatePresence mode="sync">
          {phase === 'idle' ? (
            <IntroScreen key="intro" onStart={handleStartManual} onDemo={handleStartDemo} />
          ) : phase === 'generating' ? (
            <GeneratingIPS key="generating" />
          ) : phase === 'complete' ? (
            <IPSSummaryCard
              key="summary"
              summary={mockIPSSummary}
              rm={mockRM}
              investorName={mockInvestor.name}
            />
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}

              {/* Priya typing indicator */}
              {priyadTyping && (
                <motion.div
                  key="priya-typing"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2.5 justify-start"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1 bg-gray-200 ring-1 ring-elara-gold/30">
          <Image src="/priya-mehta.jpg" alt="Priya" fill sizes="32px" className="object-cover" />
        </div>
        <TypingDots />
                </motion.div>
              )}

              {/* Rahul's answer being typed (demo mode) */}
              {rahulPartialText && (
                <MessageBubble
                  key="rahul-typing"
                  msg={{ id: 'rahul-partial', sender: 'rahul', text: rahulPartialText }}
                  partial
                />
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Input area — only in manual mode, when waiting */}
      <AnimatePresence>
        {isWaitingForInput && currentQ && (
          <motion.div
            key={`input-${qIndex}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex-shrink-0 px-4 pb-4 pt-3 border-t border-gray-100 bg-white space-y-3"
          >
            {hasChips && (
              <ChipInput
                options={chipOptions[currentQ.id]}
                selected={chipSelected}
                onSelect={(v) => {
                  setChipSelected(v);
                  setUserText('');
                }}
                disabled={false}
              />
            )}

            <div className="flex gap-2">
              <textarea
                rows={2}
                placeholder={hasChips ? 'Or type your own answer…' : 'Type your answer…'}
                value={userText}
                onChange={(e) => { setUserText(e.target.value); setChipSelected(null); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleManualSubmit();
                  }
                }}
                className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-elara-navy/20 placeholder:text-gray-300"
              />
              <button
                onClick={handleManualSubmit}
                disabled={!chipSelected && !userText.trim()}
                className="self-end px-4 h-10 bg-elara-navy text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-elara-navy-light transition-colors flex-shrink-0"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo mode: subtle label */}
      {isDemo && phase === 'active' && (
        <div className="flex-shrink-0 py-2 text-center">
          <span className="text-[10px] text-gray-300 font-medium tracking-wide">● DEMO MODE</span>
        </div>
      )}
    </div>
  );
}
