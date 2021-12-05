import en from './en';
import tr from './tr';
import ru from './ru';

const messages = {
  en,
  tr,
  ru,
};

export const langNames = {
  en: 'EN',
  tr: 'TR',
  ru: 'RU',
};

export const defaultLocale = 'en';

export const locales = Object.keys(langNames);

export default messages;
