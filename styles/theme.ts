export interface ThemeColors {
    title: string;
    subtitle: string;
    button: string;
    icon: string;
    toggleOn: string;
    toggleOff: string;
    background: string;
    neutral: {
      light: string;
      DEFAULT: string;
      dark: string;
    };
  }
  
  export interface FontSizes {
    title: number;
    subtitle: number;
    text: number;
  }
  
  export interface AppTheme {
    colors: ThemeColors;
    fontSizes: FontSizes;
  }
  
  export const createTheme = (colors: ThemeColors): { colors: ThemeColors } => ({
    colors,
  });
  