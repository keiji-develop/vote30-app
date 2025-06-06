/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',  // ← src 内をすべて対象に
  ],
  theme: {
    extend: {},
  },
  plugins: [
        require('@tailwindcss/line-clamp'),
      ],
};
