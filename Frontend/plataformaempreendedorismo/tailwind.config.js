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

