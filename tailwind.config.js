/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
	animation: {
  'spin-slow': 'spin 8s linear infinite',
  'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  'float': 'float 6s ease-in-out infinite',
},
keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  }
}
};
