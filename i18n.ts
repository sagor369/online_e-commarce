import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          greeting: 'Hello!',
          // other translations...
        },
      },
      bn:{
        translation:{
          greeting: "Hello!"
        }
      }
      // Add translations for other languages as needed
    },
    fallbackLng: 'en',
    debug: true,
  });

export default i18n;