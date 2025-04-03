import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'; // Para carregar arquivos de /public
import { initReactI18next } from 'react-i18next';

i18n
    .use(LanguageDetector)
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'pt-BR'],
        fallbackLng: 'en',
        // Namespace padrão
        ns: ['translation'],
        defaultNS: 'translation',
        detection: {
            // Ordem e de onde detectar o idioma
            order: ['localStorage', 'navigator', 'htmlTag'],
            // Chave para guardar no localStorage
            caches: ['localStorage'],
        },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        react: {
            useSuspense: true, // Recomendado para carregar traduções assincronamente
        },
        debug: import.meta.env.DEV,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
