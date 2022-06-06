const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  // darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      serif: ['PT Serif', ...defaultTheme.fontFamily.serif]
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      blank: 'var(--blank)',
      dark: '#110f16',
      global: 'var(--text-global)',
      mark: 'var(--color-mark)',
      orange: '#f42',
      white: '#fff',
      'dark-blue-500': '#102b7b',

      // Logo & Header
      logo: 'var(--header-text-link)',
      'header-link': 'var(--header-text-link)',

      // Primary
      primary: 'var(--ghost-accent-color)',
      secondary: '#102b7b',
      // 'primary-dark': 'var(--color-primary-dark)',

      // Modal
      modal: 'rgba(84,102,109,.6)',

      // post
      title: 'var(--title-color)',

      // Notes
      success: '#48c774',
      warning: '#ffdd57',
      danger: '#f14668',
      amber: colors.amber,
      red: colors.red,
      slate: colors.slate,

      // color Gray
      gray: {
        100: 'var(--gray-100)',
        150: 'var(--gray-150)',
        200: 'var(--gray-200)',
        300: 'var(--gray-300)',
        400: 'var(--gray-400)',
        500: 'var(--gray-500)',
        600: 'var(--gray-600)',
        700: 'var(--gray-700)',
        800: 'var(--gray-800)',
        900: 'var(--gray-900)'
      },

      // Social Media
      facebook: '#4267B2',
      twitter: '#55acee',
      youtube: '#FF0000',
      linkedin: '#007bb6',
      instagram: '#bf32a8',
      whatsapp: '#64d448'
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1000px',
      xl: '1232px'
    },
    container: {
      padding: '1rem'
    },
    zIndex: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      10: 10,
      20: 20,
      50: 50
    },
    extend: {
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        //
        22: '1.375rem',
        32: '2rem',
        44: '2.75rem'
      },
      backgroundOpacity: {
        40: '0.4',
        60: '0.6'
      },
      opacity: {
        15: '0.15',
        40: '0.4',
        80: '0.8',
        90: '0.9',
        92: '0.92'
      },
      maxWidth: {
        1100: '68.75rem',
        extreme: '81.25rem'
      },
      minHeight: {
        96: '24rem',
        lg: '32rem'
      },
      maxHeight: {
        128: '32rem',
        '(screen-16)': 'calc(100vh - 4rem)'
      },
      height: {
        128: '32rem',
        88: '22rem'
        // 90: '24rem',
        // 96: '24rem'
        // 98: '32rem'
      },
      padding: {
        vw8: '8vw',
        vw4: '4vw',
        vw6: '6vw',
        vmin8: '8vmin'
      },
      boxShadow: {
        '3xl': '0 36px 64px 0 rgba(0,0,0,.2)',
        '4xl': 'inset 0 0 0 0.1rem rgb(58 3 45 / 8%), 0 10px 20px rgb(58 3 45 / 4%), 0 2px 6px rgb(58 3 45 / 4%), 0 0 1px rgb(58 3 45 / 4%)',
        'card-primary': 'inset 0 0 0 0.1rem var(--color-primary), 0 10px 20px rgb(58 3 45 / 4%), 0 2px 6px rgb(58 3 45 / 4%), 0 0 1px rgb(58 3 45 / 4%)'
      },
      inset: {
        32: '8rem',
        24: '6rem',
        16: '4rem'
      },
      borderWidth: {
        3: '0.1875rem'
      },
      gridTemplateColumns: {
        sidebar: '1fr 22.5rem',
        kusi2: 'calc(12.5rem + 4vmin) 1fr',
        kusi3: 'calc(12.5rem + 4vmin) 1fr calc(13.75rem + 2vmin)'
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
  content: [
    './*.hbs',
    './partials/**/*.hbs',
    './src/js/**/*.js'
  ]
  // safelist: [
  //   'hover:text-youtube',
  //   'hover:text-instagram'
  // ]
}
