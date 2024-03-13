/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navbarblue: '#1977d3',
        babyblue: '#60a5fb',
        darkblue: '#205ab2',
        buttonblue: '#3b82f6',
      },
    },
  },
  plugins: [],
}

