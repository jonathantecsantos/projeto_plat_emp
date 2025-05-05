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

