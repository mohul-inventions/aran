import { defineConfig } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default defineConfig({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
});