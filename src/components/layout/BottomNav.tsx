'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, MessageSquare, Zap } from 'lucide-react';

const tabs = [
  { href: '/',        label: 'Dashboard', icon: LayoutDashboard },
  { href: '/advisor', label: 'Advisor',   icon: MessageSquare   },
  { href: '/actions', label: 'Actions',   icon: Zap             },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-1px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-lg mx-auto flex items-center h-16">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full py-2 select-none"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full bg-elara-gold"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}

              <Icon
                className={`w-[22px] h-[22px] transition-colors duration-150 ${
                  isActive ? 'text-elara-navy' : 'text-gray-400'
                }`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span
                className={`text-[11px] font-medium tracking-wide transition-colors duration-150 ${
                  isActive ? 'text-elara-navy' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
