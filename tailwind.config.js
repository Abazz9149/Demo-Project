/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f7f0',
          100: '#d8edd8',
          200: '#b4d9b4',
          300: '#84be84',
          400: '#559d55',
          500: '#3a7d3a',
          600: '#2d632d',
          700: '#244f24',
          800: '#1c3e1c',
          900: '#152f15',
          950: '#0d1f0d',
        },
        cream: {
          50:  '#fdfbf5',
          100: '#faf5e8',
          200: '#f5ead0',
          300: '#edd8aa',
          400: '#e3c07e',
          500: '#d9a855',
          600: '#c48e35',
          700: '#a2722a',
          800: '#825a25',
          900: '#6a4a20',
        },
        earth: {
          50:  '#fdf6f0',
          100: '#faeade',
          200: '#f4d0b5',
          300: '#ecb082',
          400: '#e28a4f',
          500: '#d46b2a',
          600: '#b8521e',
          700: '#963f1a',
          800: '#79331a',
          900: '#632c18',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
