/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#15803d",

          secondary: "#16a34a",

          accent: "#facc15",

          neutral: "#facc15",

          "base-100": "#ffffff",

          info: "#16a34a",

          success: "#16a34a",

          warning: "#facc15",

          error: "#ff0000",
        },
      },
    ],
  },
  content: ["views/*.{html,js,ejs}", "views/**/*.{html,js,ejs}"],
  // content: ["views/*.{html,js,ejs}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {},
  },
  // plugins: [require("preline/plugin")],
  plugins: [require("daisyui")],
};
