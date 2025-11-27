/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 Add paths to your components
    "./public/index.html",        // 👈 Optional, for public files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
