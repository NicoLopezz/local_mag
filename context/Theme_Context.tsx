import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { ThemeProvider } from "styled-components";
import { createTheme, ThemeColors } from "../styles/theme";

interface FontSizes {
  title: number;
  subtitle: number;
  text: number;
}

const defaultFontSizes: FontSizes = {
  title: 35,
  subtitle: 18,
  text: 15,
};

const defaultColors: ThemeColors = {
  title: "#111827",
  subtitle: "#6f6f6f",
  button: "#000000",
  icon: "#000000",
  toggleOn: "#000000",
  toggleOff: "#dcdcdc",
  background: "#F9FAFB",
  neutral: {
    light: "#F3F4F6",
    DEFAULT: "#9CA3AF",
    dark: "#374151",
  },
};

const ThemeContext = createContext<{
  colors: ThemeColors;
  fontSizes: FontSizes;
  setColor: (key: keyof ThemeColors, value: string) => void;
  setFontSize: (key: keyof FontSizes, value: number) => void;
}>({
  colors: defaultColors,
  fontSizes: defaultFontSizes,
  setColor: () => {},
  setFontSize: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

interface ProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ProviderProps) => {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const [fontSizes, setFontSizes] = useState<FontSizes>(defaultFontSizes);

  const setColor = (key: keyof ThemeColors, value: string) => {
    setColors((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const setFontSize = (key: keyof FontSizes, value: number) => {
    setFontSizes((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const theme = useMemo(() => {
    return {
      ...createTheme(colors),
      fontSizes,
    };
  }, [colors, fontSizes]);

  return (
    <ThemeContext.Provider value={{ colors, fontSizes, setColor, setFontSize }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
