import type { Config } from 'tailwindcss'

/**
 * ZeedBeez Tailwind Config
 * Extends the default theme with ZeedBeez design tokens.
 * All values mirror src/styles/tokens.css for consistency.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#080808',
        depth: '#0c0c0e',
        surface: '#111114',
        elevated: '#18181c',
        charcoal: '#1e1e24',
        muted: '#2a2a32',
        border: {
          DEFAULT: '#303038',
          soft: 'rgba(255,255,255,0.06)',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          glow: 'rgba(251,191,36,0.15)',
          glass: 'rgba(251,191,36,0.08)',
        },
        glass: {
          light: 'rgba(255,255,255,0.04)',
          medium: 'rgba(255,255,255,0.07)',
          heavy: 'rgba(255,255,255,0.10)',
          border: 'rgba(255,255,255,0.08)',
        },
        content: {
          primary: 'rgba(255,255,255,0.96)',
          secondary: 'rgba(255,255,255,0.64)',
          tertiary: 'rgba(255,255,255,0.36)',
          disabled: 'rgba(255,255,255,0.20)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        tight: '-0.03em',
        snug: '-0.01em',
        wide: '0.05em',
        wider: '0.1em',
        widest: '0.2em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '44': '11rem',
        '52': '13rem',
        '60': '15rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      boxShadow: {
        gold: '0 0 40px rgba(251,191,36,0.12)',
        glow: '0 0 80px rgba(251,191,36,0.08)',
        'dark-md': '0 4px 16px rgba(0,0,0,0.5)',
        'dark-lg': '0 8px 32px rgba(0,0,0,0.6)',
        'dark-xl': '0 16px 64px rgba(0,0,0,0.7)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'gold-glow': 'goldGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        goldGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0c0c0e 0%, #080808 100%)',
        'glass-shine':
          'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
