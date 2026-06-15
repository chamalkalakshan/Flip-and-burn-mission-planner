// Base piracy risk by region (0-100)
export const REGION_PIRACY_RISK = {
  inner: 10,    // < 1.5 AU
  belt: 55,     // 1.5 – 5 AU
  outer: 35,    // > 5 AU
  deep_outer: 60, // > 15 AU (lawless fringe)
};

// Radiation risk zones (by proximity to sun)
export const RADIATION_THRESHOLDS = [
  { maxAU: 0.5,  score: 95, label: 'Extreme' },
  { maxAU: 0.8,  score: 70, label: 'High' },
  { maxAU: 1.2,  score: 30, label: 'Moderate' },
  { maxAU: Infinity, score: 10, label: 'Low' },
];

// Per-leg transit duration risk (days)
export const TRANSIT_DURATION_RISK = [
  { maxDays: 7,   score: 0 },
  { maxDays: 14,  score: 10 },
  { maxDays: 30,  score: 25 },
  { maxDays: 60,  score: 50 },
  { maxDays: 120, score: 70 },
  { maxDays: Infinity, score: 90 },
];

// Risk factor weights for overall score
export const RISK_WEIGHTS = {
  faction_tension:  0.30,
  piracy:           0.20,
  radiation:        0.15,
  fuel_reserve:     0.25,
  transit_duration: 0.10,
};

// Risk level thresholds
export const RISK_LEVELS = [
  { maxScore: 25, label: 'Low',      color: '#22c55e', textColor: 'text-risk-low' },
  { maxScore: 50, label: 'Medium',   color: '#eab308', textColor: 'text-risk-medium' },
  { maxScore: 75, label: 'High',     color: '#f97316', textColor: 'text-risk-high' },
  { maxScore: 100, label: 'Critical', color: '#ef4444', textColor: 'text-risk-critical' },
];

export function getRiskLevel(score) {
  return RISK_LEVELS.find(l => score <= l.maxScore) || RISK_LEVELS[RISK_LEVELS.length - 1];
}
