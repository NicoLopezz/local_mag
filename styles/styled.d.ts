import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
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
    };
    fontSizes: {
      title: number;
      subtitle: number;
      text: number;
    };
  }
}
