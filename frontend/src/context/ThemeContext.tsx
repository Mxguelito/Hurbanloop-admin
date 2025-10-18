import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import i18n from "@/i18n";

interface ThemeContextType {
  theme: "dark" | "light";
  language: "es" | "en";
  allowAnimations: boolean;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  toggleAnimations: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [allowAnimations, setAllowAnimations] = useState(true);

  // 🧠 Cargar configuraciones previas desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const savedLang = localStorage.getItem("language") as "es" | "en" | null;
    const savedAnim = localStorage.getItem("allowAnimations");

    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
    if (savedAnim) setAllowAnimations(savedAnim === "true");

    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // 💾 Guardar cambios globalmente y actualizar DOM
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);
    localStorage.setItem("allowAnimations", String(allowAnimations));
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, language, allowAnimations]);
  useEffect(() => {
  i18n.changeLanguage(language);
}, [language]);


  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleLanguage = () => setLanguage((l) => (l === "es" ? "en" : "es"));
  const toggleAnimations = () => setAllowAnimations((a) => !a);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        language,
        allowAnimations,
        toggleTheme,
        toggleLanguage,
        toggleAnimations,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return context;
};
