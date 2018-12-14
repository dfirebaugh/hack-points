import createPalette from '@material-ui/core/styles/createPalette';
import createTypography from '@material-ui/core/styles/createTypography';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const palette = createPalette({
  primary: {
    main: '#3581b8',
    contrastText: 'white',
  },
  primaryVariant: {
    main: '#B2DFDB',
    contrastText: 'white',
  },
  primaryVariant2: {
    main: '#80CBC4',
    contrastText: 'white',
  },
  primaryVariant3: {
    main: '#9FFDE1',
    contrastText: 'white',
  },
  secondary: {
    main: '#fcb07e',
    contrastText: 'white',
  },
  secondaryVariant: {
    main: '#ebe9e9',
    contrastText: 'darkgrey',
  },
  thirdary: {
    main: '#dee2d6',
    contrastText: 'darkgrey',
  },
  blueSometimes: {
    main: '#4A90E2',
    contrastText: 'white',
  },
  redSometimes: {
    main: '#F03B48',
    contrastText: 'white',
  },
});
const typography = createTypography(palette, {
  fontFamily: "'Nunito Sans', sans-serif;",
  // fontFamily: "'Roboto', sans-serif;",
});
export default createMuiTheme({
  palette: palette,
  typography: typography,
});