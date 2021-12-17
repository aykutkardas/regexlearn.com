import en from './en';
import es from './es';
import tr from './tr';
import ru from './ru';
import zhCn from './zh-cn';

const messages = {
  en,
  es,
  tr,
  ru,
  'zh-cn': zhCn,
};

export const langNames = {
  en: 'EN',
  es: 'ES',
  tr: 'TR',
  ru: 'RU',
  'zh-cn': 'ZH-CN',
};

export const defaultLocale = 'en';

export const locales = Object.keys(langNames);

export default messages;
