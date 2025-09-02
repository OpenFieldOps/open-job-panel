import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/locales/en/translation.json";
import fr from "@/locales/fr/translation.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
} as const;

// biome-ignore lint/style/useNamingConvention: <i18n naming convention>
const defaultNS = "translation";

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: savedLang,
  ns: [defaultNS],
  // biome-ignore lint/style/useNamingConvention: <i18n naming convention>
  defaultNS,
  interpolation: { escapeValue: false },
});
