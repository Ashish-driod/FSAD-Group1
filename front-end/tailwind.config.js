module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Adjust based on your project structure
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'), // Include the forms plugin
  ],
};