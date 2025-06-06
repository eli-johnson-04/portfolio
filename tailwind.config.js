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
      scale: {
        '102': '1.02',
        '101': '1.01',
      },
      keyframes :{
        'spin-cw': { to: {transform: 'rotate(360deg)' }, },
        'spin-ccw': { to: {transform: 'rotate(-360deg)' }, },
      },
      animation: {
        'spin-cw': 'spin-cw 4s linear infinite',
        'spin-ccw': 'spin-ccw 4s linear infinite',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
      backgroundColor: ['hover'],
      scale: ['hover'],
    },
  },
  plugins: [
    function({addUtilities}) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "12px",
          scrollbarColor: "rgb(185, 185, 185) rgb(222, 222, 222)"
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "12px", // Thin scrollbar
            height: "0" // Hide the arrows if needed
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(222, 222, 222)"
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgb(185, 185, 185)",
            borderRadius: "20px",
            border: "1px solid rgb(222, 222, 222)"
          }
        }
      }

      addUtilities(newUtilities, ["responsive", "hover"]);
    }
  ],
};