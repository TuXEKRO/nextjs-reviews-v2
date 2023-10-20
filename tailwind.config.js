/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{jsx,tsx}",
    "./components/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        shantellSans: ["var(--font-shantell_sans)", "sans-serif"],
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}

