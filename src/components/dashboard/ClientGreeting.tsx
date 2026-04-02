'use client';

import { getGreeting } from '@/lib/utils/dates';

export function ClientGreeting({ firstName }: { firstName: string }) {
  return <>{getGreeting()}, {firstName}</>;
}
