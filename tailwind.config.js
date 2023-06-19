/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  daisyui: {
    theme: ["light", "dark"],
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    mytheme: {
      primary: "#39d3ce",
      secondary: "#5527f9",
      accent: "#d8fc3a",
      neutral: "#2a192e",
      "base-100": "#e9eef2",
      info: "#7e96f6",
      success: "#158458",
      warning: "#fcd269",
      error: "#f6133d",
    },

    extend: {
      width: {
        1000: "1000px",
      },
    },
  },
  plugins: [require("daisyui")],
};
