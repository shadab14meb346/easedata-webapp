import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
const fontFamily = ['CircularStd-Book', 'sans-serif'].join(',');

const defaultTheme = createTheme();
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
      contrastText: '#469178',
    },
    error: {
      main: red.A400,
    },
    customColor1: {
      main: '#620A15',
      light: '#84232F',
      dark: '#490710',
      contrastText: '#F7C144',
    },
    customColor2: {
      main: '#F7C144',
      light: '#FCD376',
      dark: '#F8B61F',
      contrastText: '#620A15',
    },
    customColor3: {
      main: '#D46A19',
      light: '#E07B2E',
      dark: '#F0EAE3',
      contrastText: '#F0EAE3',
    },
    customColor4: {
      main: '#F0EAE3',
      light: '#FFFAF4',
      dark: '#D46A19',
      contrastText: '#D46A19',
    },
    customColor5: {
      main: '#B38552',
      light: '#D1A574',
      dark: '#F7C144',
      contrastText: '#F7C144',
    },
    lightGray: {
      main: '#D2D2D2',
      light: '#828282',
      dark: '#828282',
      contrastText: '#828282',
    },
    offWhite: {
      main: '#EAE2D7',
      light: '#EAE2D7',
      dark: '#EAE2D7',
    },
    green: {
      main: '#469178',
      light: '#469178',
      dark: '#469178',
    },
    red: {
      main: '#EB4242',
    },
  },
  typography: {
    fontFamily: fontFamily,
    h1: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 700,
      fontSize: '51px',
      lineHeight: '59px',

      [defaultTheme.breakpoints.down('lg')]: {
        fontSize: '43px',
        lineHeight: '49px',
      },
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '34px',
        lineHeight: '38px',
      },
    },

    h2: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 700,
      fontSize: '36px',
      lineHeight: '42px',

      [defaultTheme.breakpoints.down('lg')]: {
        fontSize: '30px',
        lineHeight: '35px',
      },
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '24px',
        lineHeight: '28px',
      },
    },
    specialH2: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 500,
      fontSize: '34px',
      lineHeight: '39px',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '28px',
        lineHeight: '32px',
      },
    },
    h3: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 500,
      fontSize: '36px',
      lineHeight: '48px',

      [defaultTheme.breakpoints.down('lg')]: {
        fontSize: '30px',
        lineHeight: '40px',
      },
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '24px',
        lineHeight: '32px',
      },
    },

    body1: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '32px',

      [defaultTheme.breakpoints.down('lg')]: {
        fontSize: '20px',
        lineHeight: '26px',
      },
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '18px',
        lineHeight: '24px',
      },
    },
    body2: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 400,
      fontSize: '21px',
      lineHeight: '28px',

      [defaultTheme.breakpoints.down('lg')]: {
        fontSize: '18px',
        lineHeight: '24px',
      },
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '16px',
        lineHeight: '21px',
      },
    },
    body3: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '21px',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '13px',
        lineHeight: '17px',
      },
    },
    body4: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 500,
      fontSize: '24px',
      lineHeight: '32px',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '18px',
        lineHeight: '24px',
      },
    },
    body5: {
      fontFamily: 'CircularStd-Book',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '18px',
    },
    subtitle1: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '24px',
    },
    subtitle2: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '15px',
      [defaultTheme.breakpoints.down('sm')]: {
        fontSize: '11px',
      },
    },
    button1: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '32px',

      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '18px',
        lineHeight: '24px',
      },
    },
    button2: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 400,
      fontSize: '22px',
      lineHeight: '28px',

      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '16px',
        lineHeight: '21px',
      },
    },

    caption: {
      fontFamily: 'CircularStd-Book',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '24px',
      [defaultTheme.breakpoints.down('lg')]: {
        fontSize: '15px',
        lineHeight: '20px',
      },
      [defaultTheme.breakpoints.down('md')]: {
        fontSize: '12px',
        lineHeight: '16px',
      },
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        disableFocusRipple: true,
      },
    },

    MuiGrid: {
      styleOverrides: {
        root: {
          margin: 0,
          width: '100%',
          '& > .MuiGrid-item': {
            padding: 0,
          },
        },
      },
    },
  },
});

export default theme;
