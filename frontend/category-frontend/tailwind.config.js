module.exports = {
  content: [
    './src/**/*.{html,ts}', // Ensure it includes your Angular files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f6e05e', // Golden Yellow
          light: '#ffe066',
          dark: '#d4c056',
        },
        secondary: {
          DEFAULT: '#4299e1', // Blue
          light: '#63b3ed',
          dark: '#3182ce',
        },
        danger: {
          DEFAULT: '#e53e3e', // Red
          light: '#fc8181',
          dark: '#c53030',
        },
        background: {
          dark: '#1a202c',
          light: '#2d3748',
        },
        text: {
          light: '#f7fafc',
          dark: '#2d3748',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'lg-blue': '0 4px 6px rgba(66, 153, 225, 0.3)',
        'lg-yellow': '0 4px 6px rgba(246, 224, 94, 0.3)',
      },
    },
  },
  plugins: [],
};
