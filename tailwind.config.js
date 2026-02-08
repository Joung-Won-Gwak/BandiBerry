
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ec1337',
        'brand-dark': '#181112',
        'brand-gray': '#896168',
        'brand-bg': '#f8f6f6',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
