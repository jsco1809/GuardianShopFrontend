/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    fontFamily: {
      custom: ["Victor Mono", "monospace"], // Type
    },
    fontStyle:{
      custom: "italic",
    },
    container: {
      center: true,
    },
    extend: { 
     
      colors: {
        primary: "#000000", // colors
        secondary: "#F2F2F2",
        tertiary: "#6A9294",
        fourty: "#FEE092",
        fifthy: "#2C4A4C",
        gray: "#D9D9D9",
        darkBg: "#2d3436",
        darkText: "#F1F1F1",
        darkCard: "#1A1A1A",
      },     
    },
    screens: {
      sm: '375px',
      md: '768px',
      //lg: '960px', esta la podria necesitar mas adelante
      lg: '1440px',
      xl: '1669px'
     
    },
  },
  plugins: [],
}