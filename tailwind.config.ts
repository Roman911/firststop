import { heroui } from '@heroui/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      'display': ['NotoSans'],
      'body': ['NotoSans'],
      'notoSans': ['NotoSans', 'sans-serif'],
    },
    light: {
      layout: {},
      colors: {
        background: 'var(--background)'
      }
    },
    dark: {
      layout: {},
      colors: {
        background: 'var(--background-dark)'
      }
    },
    extend: {
      colors: {
        black: 'var(--g-color-dark)',
        primary: 'var(--g-color-primary)',
        'gray': {
          100: 'var(--g-color-grey-100)',
          200: 'var(--g-color-grey-200)',
          300: 'var(--g-color-grey-300)',
          400: 'var(--g-color-grey-400)',
          500: 'var(--g-color-grey-500)',
          600: 'var(--g-color-grey-600)',
          700: 'var(--g-color-grey-700)',
          800: 'var(--g-color-grey-800)',
          900: 'var(--g-color-grey-900)',
          950: 'var(--g-color-grey-950)',
        },
        'blue': {
          100: 'var(--g-color-blue-100)',
          500: 'var(--g-color-blue-500)',
          800: 'var(--g-color-blue-800)',
        },
        'teal': {
          500: 'var(--g-color-teal-500)',
        },
        'violet': {
          500: 'var(--g-color-violet-500)',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
} satisfies Config;
