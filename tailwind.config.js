/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <--- PENTING untuk ThemeContext.tsx kamu
  theme: {
    extend: {
      colors: {
        nexus: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          500: '#3b82f6',
          400: '#60a5fa',
        }
      }
    },
  },
  plugins: [],
}