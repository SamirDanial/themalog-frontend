/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midgrey: { 10: "#6D6D6D" },
        softgreen: { 10: "#98D69D" },
      },
    },
  },
  plugins: [],
};
