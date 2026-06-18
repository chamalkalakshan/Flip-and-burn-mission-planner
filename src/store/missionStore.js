import { create } from 'zustand';

export const useMissionStore = create((set, get) => ({
  selectedShipId: 'rocinante',
  cargoMassT: 0,
  legs: [],

  setShip: (shipId) => set({ selectedShipId: shipId }),

  setCargo: (massT) => set({ cargoMassT: Math.max(0, massT) }),

  addLeg: (originId, destinationId) => {
    if (!originId || !destinationId || originId === destinationId) return;
    set(state => ({
      legs: [
        ...state.legs,
        {
          id: crypto.randomUUID(),
          originId,
          destinationId,
          refuelAtDestination: false,
        },
      ],
    }));
  },

  removeLeg: (legId) =>
    set(state => ({ legs: state.legs.filter(l => l.id !== legId) })),

  setLegRefuel: (legId, shouldRefuel) =>
    set(state => ({
      legs: state.legs.map(l =>
        l.id === legId ? { ...l, refuelAtDestination: shouldRefuel } : l,
      ),
    })),

  clearLegs: () => set({ legs: [] }),

  getLastDestinationId: () => {
    const { legs } = get();
    return legs.length > 0 ? legs[legs.length - 1].destinationId : 'earth';
  },
}));
