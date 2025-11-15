'use client'
import { ThemeProvider } from "./ThemeContext";
import { LanguageProvider } from "./LanguageContext";


export default function ThemeWrapper({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
