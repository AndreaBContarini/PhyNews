/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in-down': 'fadeIn 2s ease-out',
        'fade-in-up': 'fadeInUp 2s ease-out forwards',
        'spin-3d': 'spin3d 15s linear infinite',
        'pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in-from-left': 'slide-in-from-left 0.8s ease-out forwards',
        'slide-in-from-right': 'slide-in-from-right 0.8s ease-out forwards',
        'fast-spin': 'spin 0.08s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in forwards',
        'slide-in-from-left': 'slideInFromLeft 0.5s ease-out forwards',
        'slide-in-from-right': 'slideInFromRight 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spin3d: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        'slide-in-from-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-in-from-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        slideInFromLeft: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideInFromRight: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
      utilities: {
        '.animation-delay-300': {
          'animation-delay': '300ms',
        },
        '.animation-delay-500': {
          'animation-delay': '500ms',
        },
        '.animation-delay-700': {
          'animation-delay': '700ms',
        },
        '.animation-delay-900': {
          'animation-delay': '900ms',
        },
        '.animation-delay-1100': {
          'animation-delay': '1100ms',
        },
      },
    },
  },
  plugins: [],
};
