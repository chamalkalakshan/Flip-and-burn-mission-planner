import { FACTIONS } from '../data/factions.js';
import { getRiskLevel } from '../data/riskFactors.js';

export function factionColor(factionId) {
  return FACTIONS[factionId]?.color ?? '#6b7280';
}

export function riskColor(score) {
  return getRiskLevel(score).color;
}

export function legFeasibilityColor(isFeasible) {
  return isFeasible ? '#00bcd4' : '#ef4444';
}

export function fuelBarColor(pct) {
  if (pct > 0.5) return '#22c55e';
  if (pct > 0.25) return '#eab308';
  if (pct > 0.1) return '#f97316';
  return '#ef4444';
}
