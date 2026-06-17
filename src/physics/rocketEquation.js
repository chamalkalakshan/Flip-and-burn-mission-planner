import { G_TO_MS2 } from './units.js';

/**
 * Tsiolkovsky rocket equation:
 *   Δv = Isp * g₀ * ln(m₀ / m₁)
 *
 * Solve for propellant burned:
 *   m₁ = m₀ / e^(Δv / v_e)   where v_e = Isp * g₀
 *   burned = m₀ - m₁
 */

export function calcExhaustVelocity(isp) {
  return isp * G_TO_MS2;
}

export function calcFuelBurned(deltaVMs, isp, wetMassT) {
  const ve = calcExhaustVelocity(isp);
  const massRatio = Math.exp(deltaVMs / ve);
  return wetMassT * (1 - 1 / massRatio);
}

export function checkFuelFeasibility(deltaVMs, isp, dryMassT, currentFuelT, cargoMassT) {
  const wetMassT = dryMassT + currentFuelT + cargoMassT;
  const fuelBurnedT = calcFuelBurned(deltaVMs, isp, wetMassT);
  const fuelRemainingT = currentFuelT - fuelBurnedT;
  return {
    feasible: fuelRemainingT >= 0,
    fuelBurnedT: Math.max(0, fuelBurnedT),
    fuelRemainingT: Math.max(0, fuelRemainingT),
  };
}
