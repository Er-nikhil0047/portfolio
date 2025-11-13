/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#6366F1',
        surface: {
          DEFAULT: '#121212',
          light: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(99, 102, 241, 0.45)',
      },
    },
  },
  plugins: [],
}
