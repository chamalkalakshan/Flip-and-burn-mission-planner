# Flip-and-Burn Mission Planner

A mission planning tool for The Expanse solar system. Plan multi-leg interplanetary routes using the flip-and-burn constant-acceleration model, balancing travel time, fuel, cargo, refueling stops, and mission risk.

## Features

- **Interactive solar system map** - zoom/pan SVG map with all major Expanse locations from Mercury to Laconia
- **Flip-and-burn physics** - accurate constant-acceleration travel time (`t = 2√(d/a)`) and Tsiolkovsky rocket equation fuel consumption
- **Multi-leg mission planning** - chain legs sequentially, with fuel state tracked across the full mission
- **Refueling stops** - toggle refueling at any station that has fuel available
- **5 ship classes** - Rocinante corvette, Canterbury freighter, Donnager battleship, Behemoth generation ship, Razorback pinnace
- **Risk assessment** - faction tension, piracy, radiation, fuel reserve, and transit duration scored and visualized
- **Live fuel bar** - tracks remaining propellant in real time as you add legs

## Tech Stack

- React + Vite
- Zustand (state management)
- d3-zoom + d3-selection (map zoom/pan)
- Tailwind CSS v3

## Getting Started

```bash
npm install
npm run dev
```

## Physics Model

Travel uses the Expanse-style flip-and-burn: constant acceleration for the first half, flip, constant deceleration for the second half.

- **Travel time**: `t = 2 * sqrt(d / a)`  
- **Delta-v**: `Δv = a * t`  
- **Fuel burned**: Tsiolkovsky rocket equation `Δv = Isp * g₀ * ln(m₀/m₁)`

Positions are static (fixed orbital angles per location) - no time-varying positions. Distances use absolute AU difference between bodies.

## Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/chamalkalakshan">
        <img src="https://github.com/chamalkalakshan.png" width="80" alt="Chamalka Lakshan"/><br/>
        <sub><b>Chamalka Lakshan</b></sub>
      </a>
    </td>
  </tr>
</table>
