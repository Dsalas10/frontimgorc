  // src/App.js
  import React from 'react';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import { ThemeProvider, createTheme } from '@mui/material/styles';
  import CssBaseline from '@mui/material/CssBaseline'; // Importa esto
  import Layout from './components/Layout/Layout';
  import Dashboard from './components/Dashboard';
  import EventComponent from './components/Events/EventComponent';

  const theme = createTheme(); // Personaliza si quieres

  function App() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Agrega esto para resetear estilos globales */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path='eventos' element={<EventComponent/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  export default App;
  