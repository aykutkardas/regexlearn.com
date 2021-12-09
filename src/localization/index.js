import en from './en';
import es from './es';
import tr from './tr';
import ru from './ru';
import ko from './ko';

const messages = {
  en,
  es,
  tr,
  ru,
  ko,
};

export const langNames = {
  en: 'EN',
  es: 'ES',
  tr: 'TR',
  ru: 'RU',
  ko: 'KO',
};

export const defaultLocale = 'en';

export const locales = Object.keys(langNames);

export default messages;
