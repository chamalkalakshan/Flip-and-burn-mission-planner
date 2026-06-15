export function formatAU(au) {
  if (au < 0.01) return '< 0.01 AU';
  return `${au.toFixed(2)} AU`;
}

export function formatDays(days) {
  if (days < 1) return `${(days * 24).toFixed(1)}h`;
  if (days < 30) return `${days.toFixed(1)}d`;
  const months = days / 30.44;
  if (months < 12) return `${months.toFixed(1)}mo`;
  return `${(months / 12).toFixed(2)}yr`;
}

export function formatDeltaV(kms) {
  if (kms < 1) return `${(kms * 1000).toFixed(0)} m/s`;
  if (kms > 10000) return `${(kms / 1000).toFixed(2)} Mm/s`;
  return `${kms.toFixed(1)} km/s`;
}

export function formatMass(tonnes) {
  if (tonnes < 1) return `${(tonnes * 1000).toFixed(0)} kg`;
  if (tonnes >= 1000) return `${(tonnes / 1000).toFixed(2)} kt`;
  return `${tonnes.toFixed(1)} t`;
}

export function formatCredits(cr) {
  if (cr === 0) return 'Free';
  if (cr >= 1_000_000) return `₡${(cr / 1_000_000).toFixed(1)}M`;
  if (cr >= 1_000) return `₡${(cr / 1_000).toFixed(0)}k`;
  return `₡${cr}`;
}

export function formatPercent(value) {
  return `${Math.round(value)}%`;
}

export function formatGForce(g) {
  return `${g}g`;
}
