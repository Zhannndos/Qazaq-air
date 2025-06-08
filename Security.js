import React from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

export default function Security() {
    const { t } = useTranslation();

    // Кеңестерді локализациядан алу
    const tips = t('tips', { returnObjects: true });
    // FAQ-ті локализациядан алу
    const faq = t('faq', { returnObjects: true });

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
                    maxWidth: 540,
                    width: '100%',
                    mx: 2,
                    bgcolor: 'rgba(255,255,255,0.97)',
                    boxShadow: '0 8px 32px rgba(25, 118, 210, 0.10)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
                    {t('securityRules')}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center" mb={2}>
                    {t('securityIntro')}
                </Typography>
                <Divider sx={{ width: '100%', mb: 2 }} />
                <List sx={{ width: '100%' }}>
                    {Array.isArray(tips) && tips.map((tip, idx) => (
                        <ListItem key={idx}>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={tip} />
                        </ListItem>
                    ))}
                </List>
                {/* FAQ секциясы */}
                <Typography variant="h5" fontWeight={700} color="primary" mt={4} mb={2}>
                    {t('faqTitle')}
                </Typography>
                {Array.isArray(faq) && faq.map((item, idx) => (
                    <Accordion key={idx} sx={{ width: '100%', mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>{item.q}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color="text.secondary">{item.a}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>
        </Box>
    );
}