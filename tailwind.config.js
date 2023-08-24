/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,tsx,jsx}',
    './components/**/*.{js,ts,tsx,jsx}',
    './pages/**/*.{js,ts,tsx,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        HantenGrotesk: ['Hanten_Grotesk', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
