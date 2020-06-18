const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    '../**/*.hbs',
    './js/**/*.js'
  ],
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
      // primary: '#2ecc71',
      primary: 'var(--color-primary)',
      secondary: '#102b7b',
      title: '#111',
      gray: {
        100: '#fafafa',
        // 200: '#eeeeee',
        200: '#F3F5F9',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#6c757d',
        600: '#757575',
        700: '#616161',
        800: '#212529',
        900: '#111'
      }
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
        22: '1.375rem',
        32: '2rem',
        44: '2.75rem'
      },
      backgroundOpacity: {
        40: '0.4',
        60: '0.6'
      },
      maxWidth: {
        740: '46.25rem',
        1000: '62.5rem',
        1100: '68.75rem',
        extreme: '81.25rem'
      },
      minHeight: {
        lg: '32rem'
      }

    }
  },
  variants: {},
  plugins: [],
  corePlugins: {
    // Disable Grid
    gridRow: false,
    gridRowStart: false,
    gridRowEnd: false
  }
}
