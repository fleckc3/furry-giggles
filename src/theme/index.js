import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export default function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      type: 'light',
      primary: {
        main: '#01579b',
        contrastText: '#ffffff',
        light: '#3378af',
        dark: '#003c6c',
      },
      secondary: {
        main: '#9cda54',
        light: '#afe176',
        dark: '#6d983a',
        contrastText: 'rgba(0,0,0,0.87)',
      },
      error: {
        main: '#ff2b1c',
        light: '#ff5549',
        dark: '#b21e13',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#ffa726',
        light: '#ffb851',
        dark: '#b2741a',
        contrastText: 'rgba(0,0,0,0.87)',
      },
      info: {
        main: '#1976d2',
        light: '#4791db',
        dark: '#115293',
        contrastText: '#ffffff',
      },
      success: {
        main: '#13b71b',
        light: '#42c548',
        dark: '#0d8012',
        contrastText: 'rgba(0,0,0,0.87)',
      },
      text: {
        primary: 'rgba(0,0,0,0.87)',
        secondary: 'rgba(0,0,0,0.54)',
        disabled: 'rgba(0,0,0,0.38)',
        hint: 'rgba(0,0,0,0.38)',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
      divider: 'rgba(0,0,0,0.2)',
    },
    spacing: 8,
    shape: {
      borderRadius: 4,
    },
    direction: 'ltr',
  };

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
