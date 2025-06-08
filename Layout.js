import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';

// Футерді осында қосыңыз немесе бөлек компонент жасаңыз
function Footer() {
    return (
        <Box
            sx={{
                width: '100%',
                background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
                color: 'white',
                py: { xs: 2, md: 3 },
                px: 2,
                mt: 6,
                boxShadow: '0 -2px 16px rgba(25, 118, 210, 0.10)',
            }}
        >
            <Container maxWidth="lg" sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                gap: 2,
            }}>
                <Box>
                    <img src="/logo.png" alt="Qazaq Air Security" style={{ height: 36, marginBottom: 6 }} />
                    <Box sx={{ fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>Qazaq Air Security</Box>
                </Box>
                <Box sx={{ fontSize: 14, opacity: 0.85 }}>
                    © {new Date().getFullYear()} Qazaq Air Security. Барлық құқықтар қорғалған.
                </Box>
            </Container>
        </Box>
    );
}

export default function Layout({ children }) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)',
                position: 'relative',
                fontFamily: 'Montserrat, Poppins, Inter, Arial, sans-serif',
                overflowX: 'hidden',
            }}
        >
            {/* SVG фон - тек бір рет, барлық бетке ортақ */}
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: 320,
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
                viewBox="0 0 1440 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <ellipse cx="200" cy="100" rx="200" ry="80" fill="#bbdefb" opacity="0.35" />
                <ellipse cx="1200" cy="220" rx="180" ry="70" fill="#90caf9" opacity="0.22" />
                <ellipse cx="700" cy="300" rx="300" ry="100" fill="#e3f2fd" opacity="0.45" />
                {/* Ұшақ силуэті */}
                <g>
                    <rect x="900" y="60" width="80" height="10" rx="5" fill="#1976d2" />
                    <rect x="940" y="40" width="10" height="40" rx="5" fill="#1976d2" />
                    <rect x="970" y="65" width="30" height="5" rx="2.5" fill="#1976d2" />
                </g>
            </svg>

            {/* Навбар */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Navbar />
            </Box>

            {/* Контент */}
            <Container
                maxWidth="lg"
                sx={{
                    pt: { xs: 4, md: 8 },
                    pb: { xs: 4, md: 6 },
                    minHeight: '70vh',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {children}
            </Container>

            {/* Футер */}
            <Footer />
        </Box>
    );
}
