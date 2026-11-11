/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020509',
          900: '#050c18',
          850: '#071020',
          800: '#0a1628',
          750: '#0d1d33',
          700: '#112540',
          600: '#1a3559',
          500: '#254d80',
          400: '#3369a6',
        },
        citi: {
          blue: '#003b79',
          lightblue: '#0064b4',
          accent: '#38a5ff',
          lightaccent: '#75beff',
          silver: '#cbd5e1',
          muted: '#8fa2b5',
        },
        gold: { DEFAULT: '#c9a96e', light: '#e2cc9c', dim: '#8f7748' },
        surface: {
          900: '#06090f',
          800: '#0b1120',
          700: '#101929',
          600: '#172236',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
