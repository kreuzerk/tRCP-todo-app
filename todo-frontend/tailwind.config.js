/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "mountains": "url(/assets/mountains.jpg)"
      }
    },
  },
  plugins: [],
}
