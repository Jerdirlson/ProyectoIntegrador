/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0f6aef',
        'secondary': '#009ee2',
        'third': '#fff',
      },
    },
  },
  plugins: [],
}

