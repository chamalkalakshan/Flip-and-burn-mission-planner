import { AU_TO_METERS, G_TO_MS2, SEC_TO_DAYS, MS_TO_KMS } from './units.js';

/**
 * Flip-and-burn trajectory: accelerate at `a` for half the distance,
 * flip, decelerate at `a` for the second half.
 *
 * Time derivation: each half covers d/2 from rest → s = ½at²
 *   t_half = sqrt(d / a)
 *   t_total = 2 * sqrt(d / a)
 *
 * Peak velocity: v_peak = a * t_half = sqrt(a * d)
 * Total Δv: 2 * v_peak = 2 * sqrt(a * d)  (same as a * t_total)
 */

export function calcTravelTimeSec(distanceM, accelMs2) {
  if (distanceM <= 0 || accelMs2 <= 0) return 0;
  return 2 * Math.sqrt(distanceM / accelMs2);
}

export function calcDeltaVMs(accelMs2, timeSec) {
  return accelMs2 * timeSec;
}

export function calcDistanceAU(origin, destination) {
  // Simplified: absolute difference in AU from sun (no angular separation).
  // Minimum 0.01 AU to avoid zero-distance edge cases.
  return Math.max(0.01, Math.abs(destination.distanceFromSunAU - origin.distanceFromSunAU));
}

export function calcLegPhysics(origin, destination, thrustG) {
  const distanceAU = calcDistanceAU(origin, destination);
  const distanceM = distanceAU * AU_TO_METERS;
  const accelMs2 = thrustG * G_TO_MS2;

  const travelTimeSec = calcTravelTimeSec(distanceM, accelMs2);
  const deltaVMs = calcDeltaVMs(accelMs2, travelTimeSec);

  return {
    distanceAU,
    distanceM,
    travelTimeSec,
    travelTimeDays: travelTimeSec * SEC_TO_DAYS,
    deltaVMs,
    deltaVKms: deltaVMs * MS_TO_KMS,
  };
}
