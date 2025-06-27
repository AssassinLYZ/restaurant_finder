// theme.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      dark: string;
      light: string;
      gray: string;
      success: string;
      warning: string;
      error: string;
      border: string;
      background: string;
    };
    fonts: {
      primary: string;
      secondary: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      pill: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    typography: {
      h1: {
        size: string;
        weight: string;
      };
      h2: {
        size: string;
        weight: string;
      };
      h3: {
        size: string;
        weight: string;
      };
      body: {
        size: string;
        weight: string;
      };
      caption: {
        size: string;
        weight: string;
      };
    };
    components: {
      button: {
        primary: {
          bg: string;
          color: string;
          hover: string;
        };
        secondary: {
          bg: string;
          color: string;
          hover: string;
        };
      };
      card: {
        bg: string;
        padding: string;
        borderRadius: string;
      };
    };
  }
}

declare module '@react-google-maps/api';
