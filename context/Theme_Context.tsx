import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { createTheme, ThemeColors } from "../styles/theme";

interface FontSizes {
  title: number;
  subtitle: number;
  text: number;
}

const defaultFontSizes: FontSizes = {
  title: 30,
  subtitle: 18,
  text: 13,
};

export const lightColors: ThemeColors = {
  modal: "#ffffff",
  title: "#111827",
  subtitle: "#4B5563",
  button: "#262626",
  icon: "#6B7280",
  text: "#374151",
  toggleOn: "#e9e9e9",
  toggleOff: "#10B981",
  background: "#f6f6f670",
  contenedores: "#ffffff",
  neutral: {
    light: "#ffffff",
    DEFAULT: "#9CA3AF",
    dark: "#374151",
  },
};

export const darkColors: ThemeColors = {
  modal: "#000000",
  title: "#e1e1e1",
  subtitle: "#f1f1f1",
  button: "#000000",
  icon: "#E5E7EB",
  toggleOff: "#10B981",
  toggleOn: "#4B5563",
  background: "#1A202C",
  contenedores: "#232a39",
  text: "#fffefedb",
  neutral: {
    light: "#7e7e7e0",
    DEFAULT: "#2D3748",
    dark: "#1A202C",
  },
};

const ThemeContext = createContext<{
  colors: ThemeColors;
  fontSizes: FontSizes;
  themeMode: "light" | "dark";
  setThemeMode: (mode: "light" | "dark") => void;
  setColor: (key: keyof ThemeColors, value: string) => void;
  setFontSize: (key: keyof FontSizes, value: number) => void;
}>({
  colors: lightColors,
  fontSizes: defaultFontSizes,
  themeMode: "light",
  setThemeMode: () => {},
  setColor: () => {},
  setFontSize: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);
interface ProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ProviderProps) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [fontSizes, setFontSizes] = useState<FontSizes>(defaultFontSizes);
  const [customColors, setCustomColors] = useState<ThemeColors>(lightColors);

  const baseColors = themeMode === "dark" ? darkColors : lightColors;

  const selectedColors = {
    ...baseColors,
    ...customColors,
  };

  useEffect(() => {
    setCustomColors(themeMode === "dark" ? darkColors : lightColors);
  }, [themeMode]);

  const setColor = (key: keyof ThemeColors, value: string) => {
    setCustomColors((prev) => ({
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

  const theme = useMemo(() => createTheme(selectedColors, fontSizes), [selectedColors, fontSizes]);

  return (
    <ThemeContext.Provider
      value={{
        colors: selectedColors,
        fontSizes,
        themeMode,
        setThemeMode,
        setColor,
        setFontSize,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
