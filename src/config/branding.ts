// Platform Branding & Theming Configuration
import heroImage from '../assets/images/hero_nikah_connect_1791245959443.jpg';
import blogImage from '../assets/images/marriage_counseling_blog_1791245969678.jpg';
import trustImage from '../assets/images/safety_trust_banner_1791245979978.jpg';

export const BRANDING = {
  appName: 'NIKAH CONNECT',
  tagline: 'Rencontre Musulmane Sérieuse & Mariage',
  subheading: 'La plateforme de mise en relation islamique respectueuse, orientée vers le mariage et fondée sur les valeurs partagées.',
  
  // Color palette constants
  colors: {
    forest: '#0F5132',      // Vert profond
    emerald: '#198754',     // Vert émeraude
    gold: '#D4AF37',        // Doré
    goldLight: '#F4E8C1',   // Doré doux
    ivory: '#FAF9F6',       // Blanc cassé
    surface: '#F3F4F6',     // Gris clair
    ink: '#17201A',         // Texte foncé
  },

  assets: {
    heroImage,
    blogImage,
    trustImage,
  },

  contact: {
    supportEmail: 'contact@nikahconnect.org',
    moderationEmail: 'moderation@nikahconnect.org',
    responseDelay: 'Réponse sous 24h',
  },

  features: {
    enableWaliChaperone: true,
    enableThreeTierVerification: true,
    enableAntiScamWarning: true,
    enableFreemiumTiers: true,
  }
};

