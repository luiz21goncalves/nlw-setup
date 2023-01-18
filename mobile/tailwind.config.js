/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        background: '#09090a',
      },
      fontFamily: {
        bold: 'Inter_700Bold',
        extrabold: 'Inter_800ExtraBold',
        regular: 'Inter_400Regular',
        semibold: 'Inter_600SemiBold',
      },
    },
  },
}
