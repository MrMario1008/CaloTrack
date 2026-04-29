/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#81A6C6',
        secondary: '#AACDDC',
        tertiary: '#F3E3D0',
        quaternary: '#D2C4B4',
      }
    },
  },
  plugins: [],
}
