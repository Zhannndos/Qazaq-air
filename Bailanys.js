import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Stack,
    Button,
    TextField,
    IconButton,
    Divider,
    Alert,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { useTranslation } from 'react-i18next';

export default function Bailanys() {
    const { t } = useTranslation();
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Email basic validation
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError(t('emailError'));
            return;
        }
        if (form.message.length < 10) {
            setError(t('messageError'));
            return;
        }
        setError('');
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        setForm({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: { xs: 400, md: 520 },
                py: { xs: 2, md: 4 },
                px: { xs: 1, md: 2 },
                zIndex: 1,
            }}
        >
            <Paper
                elevation={8}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 5,
                    maxWidth: 440,
                    width: '100%',
                    mx: 2,
                    bgcolor: 'rgba(255,255,255,0.97)',
                    boxShadow: '0 8px 32px rgba(25, 118, 210, 0.10)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <ContactPhoneIcon color="primary" sx={{ fontSize: 44, mb: 1 }} />
                <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
                    {t('contact')}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center" mb={2}>
                    {t('contactSubtitle')}
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Stack spacing={2} width="100%" mb={2}>
                        <TextField
                            label={t('yourName')}
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            label={t('yourEmail')}
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                            type="email"
                        />
                        <TextField
                            label={t('yourPhone')}
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            type="tel"
                        />
                        <TextField
                            label={t('yourMessage')}
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            minRows={3}
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            sx={{ fontWeight: 700, borderRadius: 3, py: 1.2 }}
                        >
                            {t('send')}
                        </Button>
                        {sent && <Alert severity="success">{t('messageSent')}</Alert>}
                    </Stack>
                </form>
                <Divider sx={{ width: '100%', my: 2 }} />
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                    <IconButton color="primary" href="mailto:info@qazaqair.kz">
                        <EmailIcon />
                    </IconButton>
                    <IconButton color="primary" href="https://instagram.com/qazaqair" target="_blank">
                        <InstagramIcon />
                    </IconButton>
                    <IconButton color="primary" href="https://t.me/qazaqair" target="_blank">
                        <TelegramIcon />
                    </IconButton>
                </Stack>
                <Typography variant="body2" color="text.secondary" mt={2}>
                    {t('phone')}: +7 727 3561414
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Email: info@qazaqair.kz
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                    {t('workTime')}: 09:00 - 18:00
                </Typography>
            </Paper>
        </Box>
    );
}
