import React from 'react';
import './i18n';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import BastyBet from './pages/BastyBet';
import Security from './pages/Security';
import Profile from './pages/Profile';
import Bailanys from './pages/Bailanys';

// Кеңейтілген MUI тақырыбы
let theme = createTheme({
    palette: {
        primary: { main: '#1976d2' },
        secondary: { main: '#ff4081' },
        background: { default: '#f4f6f8' },
    },
    typography: {
        fontFamily: '"Roboto", "Noto Sans", Arial, sans-serif',
        button: { textTransform: 'none', fontWeight: 600 },
        h3: { fontWeight: 800 },
        h6: { fontWeight: 700 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: 'none',
                    transition: 'all 0.2s',
                    '&:hover': {
                        boxShadow: '0 4px 16px rgba(25,118,210,0.10)',
                        transform: 'translateY(-2px)'
                    }
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                }
            }
        }
    }
});
theme = responsiveFontSizes(theme);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<BastyBet />} />
                        <Route path="/security" element={<Security />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/bailanys" element={<Bailanys />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
