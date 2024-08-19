/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#181b20",
        primary: "#6c63ff",
        secondary: "#7cdb70",
        primaryDisabled: "#a19bfe",
        text: "#eaeaea",
        surface: "#2e3440",
        warn: "#c44949",
      },
      fontFamily: {
        roboto: ["Roboto", "Helvetica Neue", "sans-serif"]
      }
    },
  },
  plugins: [],
}
