module.exports = {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all your files for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors if needed
        'gray-dark': '#1a1a1a',
        'gray-light': '#f5f5f5',
      },
    },
  },
  plugins: [],
};
