import { create } from 'zustand';

export const useUiStore = create(set => ({
  selectedLocationId: null,
  hoveredLocationId: null,
  highlightedLegIndex: null,
  activePlannerSection: 'legs', // 'legs' | 'risk'

  selectLocation: (id) => set({ selectedLocationId: id }),
  hoverLocation: (id) => set({ hoveredLocationId: id }),
  highlightLeg: (index) => set({ highlightedLegIndex: index }),
  clearHighlight: () => set({ highlightedLegIndex: null }),
  setPlannerSection: (section) => set({ activePlannerSection: section }),
}));
