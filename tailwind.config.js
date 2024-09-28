const { mtConfig } = require("@material-tailwind/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rail: {
          dark: "#75002b",
          light: "#9e2452",
        },
      },
    },
  },
  plugins: [mtConfig],
};
