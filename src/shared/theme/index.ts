// theme.ts
import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#F5A623', // Vibrant primary color for CTAs
    secondary: '#4ECDC4', // Complementary secondary color
    accent: '#FFE66D', // Accent color for highlights
    dark: '#292F36', // Dark text and headings
    light: '#F7FFF7', // Light background
    gray: '#6B7280', // Secondary text
    success: '#4CAF50', // Success states
    warning: '#FFC107', // Warning states
    error: '#F44336', // Error states
    border: '#d6d7db',
    background: '#ffffff',
  },
  fonts: {
    primary: '"Inter", sans-serif',
    secondary: '"Merriweather", serif',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    pill: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
  typography: {
    h1: {
      size: '2.5rem',
      weight: '700',
    },
    h2: {
      size: '2rem',
      weight: '600',
    },
    h3: {
      size: '1.5rem',
      weight: '600',
    },
    body: {
      size: '1rem',
      weight: '400',
    },
    caption: {
      size: '0.875rem',
      weight: '400',
    },
  },
  components: {
    button: {
      primary: {
        bg: '#FF6B6B',
        color: '#FFFFFF',
        hover: '#E55A5A',
      },
      secondary: {
        bg: '#4ECDC4',
        color: '#FFFFFF',
        hover: '#3DBBB2',
      },
    },
    card: {
      bg: '#FFFFFF',
      padding: '24px',
      borderRadius: '8px',
    },
  },
};

export default theme;
