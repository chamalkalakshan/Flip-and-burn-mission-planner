/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#050810',
          900: '#0a0e1a',
          800: '#0f1526',
          700: '#151d35',
          600: '#1e2a4a',
          500: '#2a3d6b',
        },
        accent: {
          orange: '#e8620a',
          orangeLight: '#f07c30',
          teal: '#00bcd4',
          tealLight: '#4dd0e1',
        },
        faction: {
          un: '#3b82f6',
          mars: '#ef4444',
          belt: '#f59e0b',
          opa: '#f59e0b',
          laconian: '#8b5cf6',
          neutral: '#6b7280',
        },
        risk: {
          low: '#22c55e',
          medium: '#eab308',
          high: '#f97316',
          critical: '#ef4444',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

