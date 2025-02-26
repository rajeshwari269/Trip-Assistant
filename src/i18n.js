import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      places: "Places",
      contact: "Contact Us",
      find_friends: "Find Friends",
      dark_mode: "Dark Mode",
      signup: "Sign up",
      login: "Log in",
      help: "Help Centre",
    },
  },
  hi: {
    translation: {
      home: "होम",
      places: "स्थान",
      contact: "संपर्क करें",
      find_friends: "मित्र खोजें",
      dark_mode: "डार्क मोड",
      signup: "साइन अप करें",
      login: "लॉग इन करें",
      help: "सहायता केंद्र",
    },
  },
  fr: {
    translation: {
      home: "Accueil",
      places: "Lieux",
      contact: "Nous contacter",
      find_friends: "Trouver des amis",
      dark_mode: "Mode sombre",
      signup: "S'inscrire",
      login: "Connexion",
      help: "Centre d'aide",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "en", // Default Language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
