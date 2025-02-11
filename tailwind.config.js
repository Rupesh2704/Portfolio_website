/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',    // Darker shade of primary
          light: '#60A5FA',   // Lighter shade of primary
        },
        dark: '#111827',
        'dark-lighter': '#1F2937',
        'dark-card': '#1E293B',
      }
    },
  },
  plugins: [],
}