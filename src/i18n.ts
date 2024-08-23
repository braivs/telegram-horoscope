// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      zodiac: {
        aries: 'Aries',
        taurus: 'Taurus',
        // ... другие знаки
      },
      back: 'Back',
      language: 'Language'
    },
  },
  ru: {
    translation: {
      zodiac: {
        aries: 'Овен',
        taurus: 'Телец',
        // ... другие знаки
      },
      back: 'Назад',
      language: 'Язык'
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // язык по умолчанию
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
