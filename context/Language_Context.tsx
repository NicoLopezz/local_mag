import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "@/locales/en";
import es from "@/locales/es";

type Language = "en" | "es";

const translations = { en, es };

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof en;
}

const LanguageContext = createContext<LanguageContextProps>({
  lang: "en",
  setLang: () => {},
  t: en
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>("en");

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Language;
  
    if (storedLang === "en" || storedLang === "es") {
      setLangState(storedLang);
    } else {
      const browserLang = navigator.language.startsWith("es") ? "es" : "en";
      setLangState(browserLang);
      localStorage.setItem("lang", browserLang);
    }
  }, []);
  

  const value = {
    lang,
    setLang,
    t: translations[lang]
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = () => useContext(LanguageContext);
