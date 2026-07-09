/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#F7D9E3',
        rose: '#E8829E',
        berry: '#8E2A46',
        mustard: '#E0A93A',
        cream: '#FFF8F3',
        charcoal: '#2E2420',
      },
      fontFamily: {
        script: ['Caveat', 'cursive'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slower': 'float 8s ease-in-out infinite',
        'float-slowest': 'float 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
      },
    },
  },
  plugins: [],
};
