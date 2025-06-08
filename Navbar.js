import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const navLinks = [
    { key: 'main', path: '/' },
    { key: 'security', path: '/security' },
    { key: 'contact', path: '/bailanys' },
];

const languages = [
    { code: 'kz', label: 'Қазақша' },
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' },
];

export default function Navbar() {
    const location = useLocation();
    const { t, i18n } = useTranslation();

    // Тіл таңдағыш
    const [langAnchor, setLangAnchor] = React.useState(null);
    const handleLangOpen = (e) => setLangAnchor(e.currentTarget);
    const handleLangClose = () => setLangAnchor(null);
    const handleLangChange = (code) => {
        i18n.changeLanguage(code);
        handleLangClose();
    };

    // Мобильді меню
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    return (
        <AppBar
            position="sticky"
            color="transparent"
            elevation={0}
            sx={{
                backdropFilter: 'blur(8px)',
                background: 'rgba(255,255,255,0.85)',
                boxShadow: '0 2px 12px rgba(25,118,210,0.06)',
                borderBottom: '1px solid #e3f2fd',
                zIndex: 1201,
            }}
        >
            <Toolbar sx={{ minHeight: 64, px: { xs: 1, md: 3 } }}>
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        mr: 2,
                    }}
                >
                    <img src="/logo.png" alt="Qazaq Air Security" style={{ height: 32, marginRight: 10 }} />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 800,
                            color: '#1976d2',
                            letterSpacing: 1,
                            userSelect: 'none',
                            fontSize: 22,
                        }}
                    >
                        Qazaq Air Security
                    </Typography>
                </Box>
                {/* Десктоп меню */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flex: 1 }}>
                    {navLinks.map((link) => (
                        <Button
                            key={link.path}
                            component={Link}
                            to={link.path}
                            color={location.pathname === link.path ? 'primary' : 'inherit'}
                            sx={{
                                mx: 0.5,
                                fontWeight: location.pathname === link.path ? 700 : 500,
                                borderBottom: location.pathname === link.path ? '2px solid #1976d2' : '2px solid transparent',
                                borderRadius: 0,
                                minWidth: 0,
                                px: 2,
                                fontSize: 16,
                                transition: 'all 0.18s',
                                '&:hover': {
                                    background: 'rgba(25,118,210,0.06)',
                                    borderBottom: '2px solid #1976d2',
                                },
                            }}
                            aria-label={t(link.key)}
                        >
                            {t(link.key)}
                        </Button>
                    ))}
                    <Tooltip title="Telegram">
                        <IconButton
                            color="primary"
                            href="https://t.me/yourchannel"
                            target="_blank"
                            aria-label="Telegram"
                            sx={{ mx: 0.5 }}
                        >
                            <TelegramIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Instagram">
                        <IconButton
                            color="primary"
                            href="https://instagram.com/yourprofile"
                            target="_blank"
                            aria-label="Instagram"
                            sx={{ mx: 0.5 }}
                        >
                            <InstagramIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t('language') || 'Тілді таңдау'}>
                        <IconButton
                            color="primary"
                            onClick={handleLangOpen}
                            aria-label={t('language') || 'Тілді таңдау'}
                            sx={{ mx: 0.5 }}
                        >
                            <LanguageIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu anchorEl={langAnchor} open={Boolean(langAnchor)} onClose={handleLangClose}>
                        {languages.map((lang) => (
                            <MenuItem
                                key={lang.code}
                                selected={i18n.language === lang.code}
                                onClick={() => handleLangChange(lang.code)}
                            >
                                {lang.label}
                            </MenuItem>
                        ))}
                    </Menu>
                    {/* Профиль ең оң жақта, иконкамен */}
                    <Button
                        component={Link}
                        to="/profile"
                        color={location.pathname === '/profile' ? 'primary' : 'inherit'}
                        sx={{
                            ml: 2,
                            fontWeight: location.pathname === '/profile' ? 700 : 500,
                            borderBottom: location.pathname === '/profile' ? '2px solid #1976d2' : '2px solid transparent',
                            borderRadius: 0,
                            minWidth: 0,
                            px: 2,
                            fontSize: 16,
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.18s',
                            '&:hover': {
                                background: 'rgba(25,118,210,0.06)',
                                borderBottom: '2px solid #1976d2',
                            },
                        }}
                        aria-label={t('profile')}
                        startIcon={<AccountCircleIcon />}
                    >
                        {t('profile')}
                    </Button>
                </Box>
                {/* Мобильді меню */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        color="primary"
                        edge="end"
                        onClick={() => setDrawerOpen(true)}
                        aria-label="Мобильді меню"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="right"
                        open={drawerOpen}
                        onClose={() => setDrawerOpen(false)}
                        PaperProps={{ sx: { width: 240 } }}
                    >
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <img src="/logo.png" alt="Qazaq Air Security" style={{ height: 28, marginRight: 8 }} />
                                <Typography variant="h6" fontWeight={700}>
                                    Qazaq Air
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 1 }} />
                            <List>
                                {navLinks.map((link) => (
                                    <ListItem key={link.path} disablePadding>
                                        <ListItemButton
                                            component={Link}
                                            to={link.path}
                                            selected={location.pathname === link.path}
                                            onClick={() => setDrawerOpen(false)}
                                            aria-label={t(link.key)}
                                        >
                                            <ListItemText primary={t(link.key)} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        to="/profile"
                                        selected={location.pathname === '/profile'}
                                        onClick={() => setDrawerOpen(false)}
                                        aria-label={t('profile')}
                                    >
                                        <AccountCircleIcon style={{ marginRight: 8 }} />
                                        {t('profile')}
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleLangOpen}>
                                        <LanguageIcon sx={{ mr: 1 }} />
                                        {t('language') || 'Тіл'}
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component="a"
                                        href="https://t.me/yourchannel"
                                        target="_blank"
                                        aria-label="Telegram"
                                    >
                                        <TelegramIcon sx={{ mr: 1 }} /> Telegram
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        component="a"
                                        href="https://instagram.com/yourprofile"
                                        target="_blank"
                                        aria-label="Instagram"
                                    >
                                        <InstagramIcon sx={{ mr: 1 }} /> Instagram
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                    {/* Мобильді тіл таңдағыш */}
                    <Menu anchorEl={langAnchor} open={Boolean(langAnchor)} onClose={handleLangClose}>
                        {languages.map((lang) => (
                            <MenuItem
                                key={lang.code}
                                selected={i18n.language === lang.code}
                                onClick={() => handleLangChange(lang.code)}
                            >
                                {lang.label}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}