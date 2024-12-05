/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/*.{js,jsx,ts,tsx}",
    "./css/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        gentilis: ['Gentilis', 'sans-serif'],
      },
    },
  },
  plugins: [],
};