/**
 * How many full years remain from today to the start of targetYear.
 * e.g. today=2026, targetYear=2028 → 2
 */
export function yearsToGoal(targetYear: number): number {
  return targetYear - new Date().getFullYear();
}

/**
 * How many months remain from today to Jan 1 of targetYear.
 * Returns 0 if already past.
 */
export function monthsToGoal(targetYear: number): number {
  const now = new Date();
  const target = new Date(targetYear, 0, 1);
  const diff =
    (target.getFullYear() - now.getFullYear()) * 12 +
    (target.getMonth() - now.getMonth());
  return Math.max(0, diff);
}

/**
 * Human-readable time label for a goal card.
 * Pass targetYear for time-bound goals, or targetAge + currentAge for retirement.
 */
export function goalTimeLabel(opts: {
  targetYear?: number;
  targetAge?: number;
  currentAge?: number;
}): string {
  const { targetYear, targetAge, currentAge } = opts;

  if (targetYear) {
    const years = yearsToGoal(targetYear);
    if (years <= 0) return 'Due now';
    if (years === 1) return '1 year away';
    return `${years} years away`;
  }

  if (targetAge !== undefined && currentAge !== undefined) {
    const years = targetAge - currentAge;
    if (years <= 0) return 'Retirement age reached';
    if (years === 1) return '1 year to retirement';
    return `${years} years to retirement`;
  }

  return '';
}

/**
 * Returns true when fewer than 3 years remain to the target — triggers amber urgency.
 */
export function isUrgent(targetYear?: number): boolean {
  if (!targetYear) return false;
  return yearsToGoal(targetYear) <= 3;
}

/**
 * Time-of-day greeting.
 * e.g. "Good morning" | "Good afternoon" | "Good evening"
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Short formatted date string for dashboard header.
 * e.g. "Mon, 30 March 2026"
 */
export function formatDisplayDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * ISO date string → "Mar 2026" for chart axis labels.
 */
export function formatMonthYear(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });
}
