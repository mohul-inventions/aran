/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./frontend/src/**/*.{js,ts,jsx,tsx}', './frontend/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#070B12',
        secondary: '#0C1420',
        panel: '#111E2D',
        cyan: '#00E5FF',
        electric: '#318BFF',
        red: '#FF394F',
        amber: '#FFB020',
        green: '#22D69A',
        text: '#EAF3FF',
        muted: '#8797AA',
        online: '#22D69A',
        offline: '#FF394F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
