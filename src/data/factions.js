export const FACTIONS = {
  un: {
    id: 'un',
    name: 'UN Earth',
    shortName: 'UN',
    color: '#3b82f6',
    description: 'United Nations. Controls Earth and Luna.',
  },
  mars: {
    id: 'mars',
    name: 'Mars Congressional Republic',
    shortName: 'MCR',
    color: '#ef4444',
    description: 'Independent Mars. Highly militarized.',
  },
  belt: {
    id: 'belt',
    name: 'The Belt',
    shortName: 'Belt',
    color: '#f59e0b',
    description: 'Belter communities. Resource-rich, politically marginalized.',
  },
  opa: {
    id: 'opa',
    name: 'Outer Planets Alliance',
    shortName: 'OPA',
    color: '#d97706',
    description: 'OPA militant faction. Anti-inner-planets.',
  },
  laconian: {
    id: 'laconian',
    name: 'Laconian Empire',
    shortName: 'Laconia',
    color: '#8b5cf6',
    description: 'High Consul Duarte\'s empire. Controls ring-gate traffic.',
  },
  neutral: {
    id: 'neutral',
    name: 'Neutral / Independent',
    shortName: 'Neutral',
    color: '#6b7280',
    description: 'No faction affiliation.',
  },
};

// Tension matrix: score 0-100 for crossing from faction A to faction B
// Higher = more dangerous (customs scrutiny, interdiction risk, hostility)
export const FACTION_TENSION = {
  un:      { un: 0,  mars: 25, belt: 60, opa: 80, laconian: 90, neutral: 10 },
  mars:    { un: 25, mars: 0,  belt: 55, opa: 75, laconian: 85, neutral: 10 },
  belt:    { un: 60, mars: 55, belt: 5,  opa: 20, laconian: 70, neutral: 15 },
  opa:     { un: 80, mars: 75, belt: 20, opa: 0,  laconian: 75, neutral: 20 },
  laconian:{ un: 90, mars: 85, belt: 70, opa: 75, laconian: 0,  neutral: 30 },
  neutral: { un: 10, mars: 10, belt: 15, opa: 20, laconian: 30, neutral: 0  },
};
