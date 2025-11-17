import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Azul por defecto
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});
export default theme;