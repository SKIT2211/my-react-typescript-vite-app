import Router from './routes/Router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppSnackbarProvider from './components/AppSnackbarProvider';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <AppSnackbarProvider>
        <Router />
        <CssBaseline />
      </AppSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
