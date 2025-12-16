/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#faf8f3',
        ink: '#2a2a2a',
        'ink-light': '#6a6a6a',
        'paper-border': '#e0ddd6',
        sepia: '#8b4513',
      },
      fontFamily: {
        masthead: ['Chomsky', 'serif'],
        editorial: ['Libre Baskerville', 'serif'],
        body: ['Arial', 'Helvetica', 'sans-serif'],
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};