import { calcLegPhysics } from './flipAndBurn.js';
import { checkFuelFeasibility } from './rocketEquation.js';
import { LOCATIONS_MAP } from '../data/locations.js';
import { FACTION_TENSION } from '../data/factions.js';
import {
  REGION_PIRACY_RISK,
  RADIATION_THRESHOLDS,
  TRANSIT_DURATION_RISK,
  RISK_WEIGHTS,
  getRiskLevel,
} from '../data/riskFactors.js';

export function computeMissionLegs(ship, cargoMassT, legs) {
  let currentFuelT = ship.maxFuelT;
  const results = [];

  for (const leg of legs) {
    const origin = LOCATIONS_MAP[leg.originId];
    const destination = LOCATIONS_MAP[leg.destinationId];

    if (!origin || !destination) continue;

    const physics = calcLegPhysics(origin, destination, ship.thrustG);
    const fuelCheck = checkFuelFeasibility(
      physics.deltaVMs,
      ship.isp,
      ship.dryMassT,
      currentFuelT,
      cargoMassT,
    );

    const fuelAtStartT = currentFuelT;
    const fuelAtEndT = fuelCheck.fuelRemainingT;

    let fuelAfterRefuelT = fuelAtEndT;
    if (leg.refuelAtDestination && destination.refuelAvailable) {
      fuelAfterRefuelT = ship.maxFuelT;
    }

    currentFuelT = fuelAfterRefuelT;

    results.push({
      legId: leg.id,
      originId: leg.originId,
      destinationId: leg.destinationId,
      originName: origin.name,
      destinationName: destination.name,
      ...physics,
      fuelAtStartT,
      fuelBurnedT: fuelCheck.fuelBurnedT,
      fuelAtEndT,
      refueled: leg.refuelAtDestination && destination.refuelAvailable,
      fuelAfterRefuelT,
      isFeasible: fuelCheck.feasible,
      canRefuelHere: destination.refuelAvailable,
      warningMessage: !fuelCheck.feasible
        ? `Insufficient fuel — need ${fuelCheck.fuelBurnedT.toFixed(1)}t, have ${fuelAtStartT.toFixed(1)}t`
        : null,
    });
  }

  return results;
}

export function computeMissionSummary(legResults, cargoMassT) {
  const totalTravelTimeDays = legResults.reduce((s, l) => s + l.travelTimeDays, 0);
  const totalDeltaVKms = legResults.reduce((s, l) => s + l.deltaVKms, 0);
  const finalFuelT = legResults.length > 0 ? legResults[legResults.length - 1].fuelAfterRefuelT : 0;
  const infeasibleIdx = legResults.findIndex(l => !l.isFeasible);

  return {
    totalLegs: legResults.length,
    totalTravelTimeDays,
    totalDeltaVKms,
    finalFuelT,
    cargoMassT,
    isMissionFeasible: infeasibleIdx === -1,
    insufficientFuelAtLeg: infeasibleIdx === -1 ? null : infeasibleIdx,
  };
}

export function computeRiskAssessment(legResults, ship) {
  if (legResults.length === 0) {
    return { overallScore: 0, overallLabel: 'Low', overallColor: '#22c55e', factors: [] };
  }

  // ── Faction Tension ─────────────────────────────────────────
  const factionScores = legResults.map(leg => {
    const origin = LOCATIONS_MAP[leg.originId];
    const dest = LOCATIONS_MAP[leg.destinationId];
    return FACTION_TENSION[origin.faction]?.[dest.faction] ?? 0;
  });
  const factionScore = factionScores.reduce((s, v) => s + v, 0) / factionScores.length;

  // ── Piracy Risk ──────────────────────────────────────────────
  const piracyScores = legResults.map(leg => {
    const midAU = (LOCATIONS_MAP[leg.originId].distanceFromSunAU + LOCATIONS_MAP[leg.destinationId].distanceFromSunAU) / 2;
    if (midAU > 15) return REGION_PIRACY_RISK.deep_outer;
    if (midAU > 5)  return REGION_PIRACY_RISK.outer;
    if (midAU > 1.5) return REGION_PIRACY_RISK.belt;
    return REGION_PIRACY_RISK.inner;
  });
  const piracyScore = piracyScores.reduce((s, v) => s + v, 0) / piracyScores.length;

  // ── Radiation Exposure ───────────────────────────────────────
  const radiationScores = legResults.map(leg => {
    const minAU = Math.min(
      LOCATIONS_MAP[leg.originId].distanceFromSunAU,
      LOCATIONS_MAP[leg.destinationId].distanceFromSunAU,
    );
    const threshold = RADIATION_THRESHOLDS.find(t => minAU <= t.maxAU);
    return threshold?.score ?? 10;
  });
  const radiationScore = radiationScores.reduce((s, v) => s + v, 0) / radiationScores.length;

  // ── Fuel Reserve ─────────────────────────────────────────────
  const lastLeg = legResults[legResults.length - 1];
  const fuelPct = lastLeg.fuelAfterRefuelT / ship.maxFuelT;
  const fuelReserveScore = Math.round((1 - fuelPct) * 100);

  // ── Transit Duration ─────────────────────────────────────────
  const maxLegDays = Math.max(...legResults.map(l => l.travelTimeDays));
  const durationThreshold = TRANSIT_DURATION_RISK.find(t => maxLegDays <= t.maxDays);
  const durationScore = durationThreshold?.score ?? 90;

  // ── Weighted Overall ─────────────────────────────────────────
  const overallScore = Math.round(
    factionScore   * RISK_WEIGHTS.faction_tension +
    piracyScore    * RISK_WEIGHTS.piracy +
    radiationScore * RISK_WEIGHTS.radiation +
    fuelReserveScore * RISK_WEIGHTS.fuel_reserve +
    durationScore  * RISK_WEIGHTS.transit_duration,
  );

  const level = getRiskLevel(overallScore);

  return {
    overallScore,
    overallLabel: level.label,
    overallColor: level.color,
    factors: [
      {
        id: 'faction_tension',
        name: 'Faction Tension',
        score: Math.round(factionScore),
        description: 'Political hostility between origin and destination factions.',
      },
      {
        id: 'piracy',
        name: 'Piracy Risk',
        score: Math.round(piracyScore),
        description: 'Probability of interdiction along this route.',
      },
      {
        id: 'radiation',
        name: 'Radiation Exposure',
        score: Math.round(radiationScore),
        description: 'Solar radiation hazard based on proximity to the sun.',
      },
      {
        id: 'fuel_reserve',
        name: 'Fuel Reserve',
        score: fuelReserveScore,
        description: 'Risk from low remaining propellant at mission end.',
      },
      {
        id: 'transit_duration',
        name: 'Transit Duration',
        score: durationScore,
        description: 'Crew fatigue and life-support strain from long burns.',
      },
    ],
  };
}
