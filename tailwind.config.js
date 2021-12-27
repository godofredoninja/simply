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
      black: '#000',
      dark: '#110f16',
      white: '#fff',
      blank: 'var(--blank)',
      orange: '#f42',
      modal: 'rgba(84,102,109,.6)',
      primary: 'var(--ghost-accent-color)',
      // 'primary-dark': 'var(--color-primary-dark)',
      'dark-blue-500': '#102b7b',
      secondary: '#102b7b',
      title: 'var(--title-color)',
      success: '#48c774',
      warning: '#ffdd57',
      danger: '#f14668',
      amber: colors.amber,
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
        740: '46.25rem',
        1000: '62.5rem',
        1100: '68.75rem',
        extreme: '81.25rem'
      },
      minHeight: {
        lg: '32rem'
      },
      maxHeight: {
        '(screen-16)': 'calc(100vh - 4rem)'
      },
      height: {
        88: '22rem',
        90: '24rem',
        96: '30rem',
        98: '32rem'
      },
      padding: {
        vw8: '8vw',
        vw4: '4vw',
        vw6: '6vw'
      },
      boxShadow: {
        '3xl': '0 36px 64px 0 rgba(0,0,0,.2)'
      },
      inset: {
        32: '8rem',
        24: '6rem',
        16: '4rem'
      }
    }
  },
  variants: {},
  plugins: [],
  corePlugins: {
    // Disable Grid
    gridRow: false,
    gridRowStart: false,
    gridRowEnd: false,
    gridTemplateColumns: false,
    gridTemplateRows: false,
    gap: false,
    gridAutoFlow: false,
    gridAutoColumns: false,
    gridAutoRows: false,
    //
    gridColumn: false,
    gridColumnStart: false,
    gridColumnEnd: false
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  // mode: 'jit',
  purge: {
    content: [
      './*.hbs',
      './partials/**/*.hbs',
      './src/js/**/*.js'
    ],
    options: {
      safelist: ['hover:text-youtube', 'hover:text-instagram']
    }
  }
}
