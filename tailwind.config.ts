import type { Config } from 'tailwindcss';
const { fontFamily } = require("tailwindcss/defaultTheme")

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Lato', 'sans-serif'],
        headline: ['"Dancing Script"', 'cursive'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        beat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-120vh)', opacity: '0' },
        },
         sway: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(var(--sway-amount))' },
        },
        'balloon-float': {
          '0%': { transform: 'translateY(20vh) rotate(-10deg)', opacity: '0.8' },
          '100%': { transform: 'translateY(-120vh) rotate(10deg)', opacity: '0' },
        },
        'fill-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fly-out': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-120vh) scale(0.5)', opacity: '0' },
        },
        'shuffle-card-out': {
          '0%': { transform: 'scale(1) translateY(0) rotate(0)', opacity: '1' },
          '100%': { transform: 'translateY(-120vh) scale(0.8) rotate(10deg)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        beat: 'beat 0.8s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'float-up': 'float-up forwards',
        'sway': 'sway ease-in-out infinite',
        'balloon-float': 'balloon-float 15s linear forwards',
        'fill-in': 'fill-in 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'fly-out': 'fly-out 3s ease-in forwards',
        'shuffle-card-out': 'shuffle-card-out 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate'),
    function ({ addUtilities }) {
      const newUtilities = {};
      const delays = [100, 200, 300, 400, 500, 700, 1000, 2000, 3000, 4000, 5000];
      delays.forEach(delay => {
        newUtilities[`.animation-delay-${delay}`] = {
          'animation-delay': `${delay}ms`,
        };
      });
      addUtilities(newUtilities);
    }
  ],
} satisfies Config;
