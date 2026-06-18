import { useMemo } from 'react';
import { useMissionStore } from '../store/missionStore.js';
import { SHIPS_MAP } from '../data/ships.js';
import {
  computeMissionLegs,
  computeMissionSummary,
  computeRiskAssessment,
} from '../physics/fuelPlanner.js';

export function useMissionPlan() {
  const selectedShipId = useMissionStore(s => s.selectedShipId);
  const cargoMassT = useMissionStore(s => s.cargoMassT);
  const legs = useMissionStore(s => s.legs);

  const ship = SHIPS_MAP[selectedShipId];

  const legResults = useMemo(
    () => computeMissionLegs(ship, cargoMassT, legs),
    [ship, cargoMassT, legs],
  );

  const missionSummary = useMemo(
    () => computeMissionSummary(legResults, cargoMassT),
    [legResults, cargoMassT],
  );

  const riskAssessment = useMemo(
    () => computeRiskAssessment(legResults, ship),
    [legResults, ship],
  );

  return { ship, legResults, missionSummary, riskAssessment };
}
