/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "#09090A",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0,1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
