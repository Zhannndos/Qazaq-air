import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Paper, Stack, Button, Avatar, Divider, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField, Alert
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
            
export default function Profile() {
    const { t } = useTranslation();

    const [user, setUser] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', birthday: '' });
    const [saved, setSaved] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [editError, setEditError] = useState('');
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [confirmation, setConfirmation] = useState(null);
    const [success, setSuccess] = useState('');

    // Пайдаланушыны автоматты түрде анықтау
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
                    email: firebaseUser.email,
                    phone: firebaseUser.phoneNumber || '',
                    birthday: '',
                    registered: firebaseUser.metadata?.creationTime,
                    role: t('userRole') || 'Пайдаланушы',
                });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
        // eslint-disable-next-line
    }, []);

    // Кіру
    const handleLogin = async () => {
        if (!loginForm.email || !loginForm.password) {
            setError('Email және құпиясөзді толтырыңыз');
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
            setOpenLogin(false);
            setError('');
            setLoginForm({ email: '', password: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    // Тіркелу
    const handleRegister = async () => {
        if (!registerForm.name || !registerForm.email || !registerForm.password) {
            setError('Барлық өрістерді толтырыңыз');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password);
            await updateProfile(userCredential.user, { displayName: registerForm.name });
            setOpenRegister(false);
            setError('');
            setRegisterForm({ name: '', email: '', password: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    // Шығу
    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        alert(t('logoutAlert') || 'Сіз жүйеден шықтыңыз!');
    };

    // Профильді өңдеу
    const handleEditOpen = () => {
        setForm(user);
        setEditError('');
        setOpenEdit(true);
    };
    const handleEditClose = () => setOpenEdit(false);

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Профильді сақтау (тек аты мен телефон, туған күнді локалды жаңартады)
    const handleSave = async () => {
        if (!form.name.trim()) {
            setEditError('Аты бос болмауы керек');
            return;
        }
        try {
            if (auth.currentUser && form.name !== user.name) {
                await updateProfile(auth.currentUser, { displayName: form.name });
            }
            setUser({ ...user, ...form });
            setOpenEdit(false);
            setSaved(true);
            setEditError('');
            setTimeout(() => setSaved(false), 2500);
        } catch (err) {
            setEditError(err.message);
        }
    };

    // Enter пернесін басқанда форманы жіберу
    const handleLoginKeyDown = (e) => {
        if (e.key === 'Enter') handleLogin();
    };
    const handleRegisterKeyDown = (e) => {
        if (e.key === 'Enter') handleRegister();
    };

    // Инициализация reCAPTCHA
    const setupRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved
            }
        }, auth);
    };

    // Отправить SMS
    const sendCode = async () => {
        setError('');
        setSuccess('');
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmation(confirmationResult);
            setSuccess('Код отправлен!');
        } catch (err) {
            setError(err.message);
        }
    };

    // Подтвердить код
    const verifyCode = async () => {
        setError('');
        try {
            await confirmation.confirm(code);
            setSuccess('Телефон подтвержден!');
        } catch (err) {
            setError('Код неверный');
        }
    };

    return (
        <Box sx={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', minHeight: { xs: 400, md: 520 },
            py: { xs: 2, md: 4 }, px: { xs: 1, md: 2 }, zIndex: 1,
        }}>
            <Paper elevation={8} sx={{
                p: { xs: 3, md: 5 }, borderRadius: 5, maxWidth: 420, width: '100%',
                mx: 2, bgcolor: 'rgba(255,255,255,0.97)', boxShadow: '0 8px 32px rgba(25, 118, 210, 0.10)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
                {!user ? (
                    <>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, mb: 2 }}>
                            <AccountCircleIcon sx={{ fontSize: 64 }} />
                        </Avatar>
                        <Typography variant="h6" fontWeight={700} color="primary" gutterBottom>
                            {t('profileNotLoggedIn') || 'Профиль қолжетімсіз'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                            {t('pleaseLoginOrRegister') || 'Профильді көру үшін жүйеге кіріңіз немесе тіркеліңіз.'}
                        </Typography>
                        <Stack direction="row" spacing={2} width="100%">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<LoginIcon />}
                                fullWidth
                                sx={{ fontWeight: 600, borderRadius: 3 }}
                                onClick={() => { setOpenLogin(true); setError(''); }}
                            >
                                {t('login') || 'Кіру'}
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<PersonAddIcon />}
                                fullWidth
                                sx={{ fontWeight: 600, borderRadius: 3 }}
                                onClick={() => { setOpenRegister(true); setError(''); }}
                            >
                                {t('register') || 'Тіркелу'}
                            </Button>
                        </Stack>
                    </>
                ) : (
                    <>
                        <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80, mb: 2 }}>
                            <AccountCircleIcon sx={{ fontSize: 64 }} />
                        </Avatar>
                        <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
                            {user.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mb={0.5}>
                            {user.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={2}>
                            {user.role}
                        </Typography>
                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Stack spacing={1} width="100%" mb={2}>
                            <Typography variant="body2"><b>{t('phone') || 'Телефон'}:</b> {user.phone}</Typography>
                            <Typography variant="body2"><b>{t('birthday') || 'Туған күні'}:</b> {user.birthday}</Typography>
                            <Typography variant="body2"><b>{t('registered') || 'Тіркелген'}:</b> {user.registered}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={2} width="100%">
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<EditIcon />}
                                fullWidth
                                sx={{ fontWeight: 600, borderRadius: 3 }}
                                onClick={handleEditOpen}
                            >
                                {t('editProfile') || 'Профильді өзгерту'}
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<LogoutIcon />}
                                fullWidth
                                sx={{ fontWeight: 600, borderRadius: 3 }}
                                onClick={handleLogout}
                            >
                                {t('logout') || 'Шығу'}
                            </Button>
                        </Stack>
                        {saved && (
                            <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
                                {t('profileSaved') || 'Профиль сәтті сақталды!'}
                            </Alert>
                        )}
                    </>
                )}
            </Paper>

            {/* Кіру модалы */}
            <Dialog open={openLogin} onClose={() => setOpenLogin(false)} maxWidth="xs" fullWidth>
                <DialogTitle>{t('login') || 'Кіру'}</DialogTitle>
                <DialogContent>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={loginForm.email}
                        onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                        onKeyDown={handleLoginKeyDown}
                    />
                    <TextField
                        margin="dense"
                        label={t('password') || 'Құпиясөз'}
                        name="password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={loginForm.password}
                        onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                        onKeyDown={handleLoginKeyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenLogin(false)}>{t('cancel') || 'Болдырмау'}</Button>
                    <Button onClick={handleLogin} variant="contained">{t('login') || 'Кіру'}</Button>
                </DialogActions>
            </Dialog>

            {/* Тіркелу модалы */}
            <Dialog open={openRegister} onClose={() => setOpenRegister(false)} maxWidth="xs" fullWidth>
                <DialogTitle>{t('register') || 'Тіркелу'}</DialogTitle>
                <DialogContent>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    <TextField
                        margin="dense"
                        label={t('name') || 'Аты'}
                        name="name"
                        fullWidth
                        variant="outlined"
                        value={registerForm.name}
                        onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
                        onKeyDown={handleRegisterKeyDown}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={registerForm.email}
                        onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                        onKeyDown={handleRegisterKeyDown}
                    />
                    <TextField
                        margin="dense"
                        label={t('password') || 'Құпиясөз'}
                        name="password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={registerForm.password}
                        onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                        onKeyDown={handleRegisterKeyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenRegister(false)}>{t('cancel') || 'Болдырмау'}</Button>
                    <Button onClick={handleRegister} variant="contained">{t('register') || 'Тіркелу'}</Button>
                </DialogActions>
            </Dialog>

            {/* Профильді өзгерту модалы */}
            <Dialog open={openEdit} onClose={handleEditClose} maxWidth="xs" fullWidth>
                <DialogTitle>{t('editProfile') || 'Профильді өзгерту'}</DialogTitle>
                <DialogContent>
                    {editError && <Alert severity="error" sx={{ mb: 2 }}>{editError}</Alert>}
                    <TextField
                        margin="dense"
                        label={t('name') || 'Аты'}
                        name="name"
                        fullWidth
                        variant="outlined"
                        value={form.name}
                        onChange={handleFormChange}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={form.email}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        margin="dense"
                        label={t('phone') || 'Телефон'}
                        name="phone"
                        fullWidth
                        variant="outlined"
                        value={form.phone}
                        onChange={handleFormChange}
                    />
                    <TextField
                        margin="dense"
                        label={t('birthday') || 'Туған күні'}
                        name="birthday"
                        fullWidth
                        variant="outlined"
                        value={form.birthday}
                        onChange={handleFormChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>{t('cancel') || 'Болдырмау'}</Button>
                    <Button onClick={handleSave} variant="contained">{t('save') || 'Сақтау'}</Button>
                </DialogActions>
            </Dialog>

            {/* Телефон арқылы тіркелу */}
            <Dialog open={openRegister} onClose={() => setOpenRegister(false)} maxWidth="xs" fullWidth>
                <DialogTitle>{t('phoneRegister') || 'Телефон арқылы тіркелу'}</DialogTitle>
                <DialogContent>
                    <div id="recaptcha-container"></div>
                    {!confirmation ? (
                        <>
                            <TextField
                                margin="dense"
                                label={t('phone') || 'Телефон'}
                                name="phone"
                                type="tel"
                                fullWidth
                                variant="outlined"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            <Button onClick={sendCode} variant="contained">{t('sendCode') || 'Код жіберу'}</Button>
                        </>
                    ) : (
                        <>
                            <TextField
                                margin="dense"
                                label={t('enterCode') || 'Кодты енгізіңіз'}
                                name="code"
                                type="text"
                                fullWidth
                                variant="outlined"
                                value={code}
                                onChange={e => setCode(e.target.value)}
                            />
                            <Button onClick={verifyCode} variant="contained">{t('verifyCode') || 'Кодты растау'}</Button>
                        </>
                    )}
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenRegister(false)}>{t('cancel') || 'Болдырмау'}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}