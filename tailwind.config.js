/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'tailor-blue': '#264BEB',
        'tailor-gray': '#F1F1F0',
      },
      backgroundImage: {
        'home': "url('/Home.png')",
        'login': "url('/Login.png')",
        'signup': "url('/Signup.png')",
      }
    },
  },
  plugins: [],
};
