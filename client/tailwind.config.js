/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rede31: "#e31837",
        whitef4d: "#F4D2D6",
        gray484: "#484848",
        graye8e: "#e8e8e8",
        yellowffd: "#FFDE94",
        yellowffc: "#ffc522",
        blue287: "#287bff",
      },
      maxWidth: {
        defaultWidthLayout: "1200px",
      },
      fontFamily: {
        Miniver: ['"Miniver", serif'],
      },
    },
  },
  plugins: [],
};
