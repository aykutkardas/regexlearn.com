import en from './en';
import es from './es';
import tr from './tr';
import ru from './ru';

const messages = {
  en,
  es,
  tr,
  ru,
};

export const langNames = {
  en: 'EN',
  es: 'ES',
  tr: 'TR',
  ru: 'RU',
};

export const defaultLocale = 'en';

export const locales = Object.keys(langNames);

export default messages;
