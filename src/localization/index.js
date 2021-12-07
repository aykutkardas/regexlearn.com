import en from './en';
import tr from './tr';
import ru from './ru';
import ko from './ko';

const messages = {
  en,
  tr,
  ru,
  ko,
};

export const langNames = {
  en: 'EN',
  tr: 'TR',
  ru: 'RU',
  ko: 'KO',
};

export const defaultLocale = 'en';

export const locales = Object.keys(langNames);

export default messages;
