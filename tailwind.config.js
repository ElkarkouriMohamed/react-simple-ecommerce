/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files
  ],
  //darkMode: 'media', // Default: Uses system settings
  theme: {
    extend: {
      screens: {
        'low': '470px', // Define a custom breakpoint at 950px
        'v-low': '380px',
      },
      colors: {
        customBlack: '#000000', // Example custom color
        customWhite: '#FFFFFF',
        transparent: 'transparent',
      },
    },
  },
  plugins: [],
}

