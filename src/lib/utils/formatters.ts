const CRORE = 10_000_000;
const LAKH = 100_000;

/**
 * Smart compact formatter — crore if ≥1Cr, lakh if ≥1L, otherwise raw INR.
 * e.g. 153000000 → "₹15.3 Cr"
 */
export function formatCompact(amount: number): string {
  if (amount >= CRORE) return formatCrore(amount);
  if (amount >= LAKH) return formatLakh(amount);
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Always formats in crore regardless of amount.
 * e.g. 153000000 → "₹15.3 Cr"
 */
export function formatCrore(amount: number): string {
  const crores = amount / CRORE;
  const formatted = crores % 1 === 0 ? crores.toString() : crores.toFixed(1);
  return `₹${formatted} Cr`;
}

/**
 * Always formats in lakh regardless of amount.
 * e.g. 1216000 → "₹12.2L"
 */
export function formatLakh(amount: number): string {
  const lakhs = amount / LAKH;
  const formatted = lakhs % 1 === 0 ? lakhs.toString() : lakhs.toFixed(1);
  return `₹${formatted}L`;
}

/**
 * Full verbose INR string.
 * e.g. 153000000 → "₹15.3 crore" | 1200000 → "₹12 lakh"
 */
export function formatINR(amount: number): string {
  if (amount >= CRORE) {
    const crores = amount / CRORE;
    const formatted = crores % 1 === 0 ? crores.toString() : crores.toFixed(1);
    return `₹${formatted} crore`;
  }
  if (amount >= LAKH) {
    const lakhs = amount / LAKH;
    const formatted = lakhs % 1 === 0 ? lakhs.toString() : lakhs.toFixed(1);
    return `₹${formatted} lakh`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * e.g. 62 → "62%" | 62.5 → "62.5%"
 */
export function formatPercent(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * e.g. 72 → "72/100"
 */
export function formatScore(value: number): string {
  return `${value}/100`;
}

/**
 * e.g. 153000000 → "15.3 Cr" (no ₹ — for axis labels etc.)
 */
export function formatCroreRaw(amount: number): string {
  const crores = amount / CRORE;
  return crores % 1 === 0 ? `${crores} Cr` : `${crores.toFixed(1)} Cr`;
}
