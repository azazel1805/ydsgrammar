export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./public/**/*.js",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { slate: { 850: '#1e293b' } }
    },
  },
  plugins: [],
}
