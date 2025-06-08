import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Stack,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SecurityIcon from '@mui/icons-material/Security';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AnimatedTitle = ({ children }) => (
    <span style={{
        display: 'inline-block',
        animation: 'fade-in-down 0.8s cubic-bezier(.39,.575,.565,1.000) both'
    }}>{children}</span>
);

export default function BastyBet() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: { xs: 400, md: 520 },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 4, md: 8 },
                py: { xs: 2, md: 4 },
                px: { xs: 1, md: 2 },
                position: 'relative',
                zIndex: 1,
            }}
        >
            {/* Сол жақ: Тек тақырып пен сипаттама */}
            <Box sx={{ flex: 1, maxWidth: 540, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
                {/* Логотиптер алынып тасталды */}
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 800,
                        color: '#1976d2',
                        mb: 1,
                        fontSize: { xs: 28, md: 44 },
                        lineHeight: 1.1,
                        letterSpacing: 1,
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                    <AnimatedTitle>{t('mainTitle')}</AnimatedTitle>
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        color: '#374151',
                        fontWeight: 400,
                        mb: 3,
                        fontSize: { xs: 15, md: 20 },
                        textAlign: { xs: 'center', md: 'left' }
                    }}
                >
                    {t('mainSubtitle')}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
                    <Paper elevation={3} sx={{
                        borderRadius: 4, p: 2.5, minWidth: 140, textAlign: 'center',
                        boxShadow: 3, transition: '0.2s', flex: 1,
                        '&:hover': { boxShadow: 8, transform: 'scale(1.04)' }
                    }}>
                        <SecurityIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
                        <Typography fontWeight={700}>{t('security')}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t('securityDesc')}
                        </Typography>
                    </Paper>
                    <Paper elevation={3} sx={{
                        borderRadius: 4, p: 2.5, minWidth: 140, textAlign: 'center',
                        boxShadow: 3, transition: '0.2s', flex: 1,
                        '&:hover': { boxShadow: 8, transform: 'scale(1.04)' }
                    }}>
                        <FlightTakeoffIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
                        <Typography fontWeight={700}>{t('newRoutes')}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t('newRoutesDesc')}
                        </Typography>
                    </Paper>
                    <Paper elevation={3} sx={{
                        borderRadius: 4, p: 2.5, minWidth: 140, textAlign: 'center',
                        boxShadow: 3, transition: '0.2s', flex: 1,
                        '&:hover': { boxShadow: 8, transform: 'scale(1.04)' }
                    }}>
                        <StarBorderIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
                        <Typography fontWeight={700}>{t('quality')}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t('qualityDesc')}
                        </Typography>
                    </Paper>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<InfoOutlinedIcon />}
                        sx={{
                            borderRadius: 3,
                            fontWeight: 700,
                            fontSize: 17,
                            px: 3,
                            boxShadow: 2,
                            transition: 'all 0.2s',
                            '&:hover': { boxShadow: 6, transform: 'scale(1.04)' },
                        }}
                        onClick={() => navigate('/security')}
                    >
                        {t('securityRules')}
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<ContactPhoneIcon />}
                        sx={{
                            borderRadius: 3,
                            fontWeight: 700,
                            fontSize: 17,
                            px: 3,
                            borderWidth: 2,
                            transition: 'all 0.2s',
                            '&:hover': { background: '#e3f2fd', transform: 'scale(1.04)' },
                        }}
                        onClick={() => navigate('/bailanys')}
                    >
                        {t('contact')}
                    </Button>
                </Stack>
            </Box>
            {/* Оң жақ: ұшақ иллюстрациясы */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 220,
            }}>
                <img
                    src="/plane-illustration.svg"
                    alt="Plane"
                    style={{
                        width: 260,
                        maxWidth: '100%',
                        filter: 'drop-shadow(0 8px 32px #90caf9aa)',
                        borderRadius: 18,
                        background: 'rgba(255,255,255,0.7)',
                        padding: 8,
                    }}
                />
            </Box>
            {/* Анимация стилі */}
            <style>
                {`
                @keyframes fade-in-down {
                    0% { opacity: 0; transform: translateY(-30px);}
                    100% { opacity: 1; transform: translateY(0);}
                }
                `}
            </style>
        </Box>
    );
}
