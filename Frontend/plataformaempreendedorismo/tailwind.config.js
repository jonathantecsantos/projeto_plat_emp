/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx"
  ],
  important: "#root",
  theme: {
    fontFamily:{
      sans: ['Inter', 'sans-serif']
    },
    extend: { 
       animation: {
        'pop-in': 'popIn 1.2s ease-in-out forwards',
      },
      keyframes: {
        popIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '70%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      colors: {
        'ring-custom': '#6654c0',
         trophy: {
          1: '#ffa828', // ouro
          2: '#989ca0', // prata
          3: '#d76129', // bronze
          4: '#89eeeb', // outros
          5: '#dafd89'  // outros
        }
      }
    },
    container: {
      center: true,
    }
  },
   plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/container-queries'),
    // require('tailwind-scrollbar', ({ nocompatible: true })),
  ],
}

