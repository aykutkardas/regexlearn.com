import { createIntl } from 'react-intl';
import { defaultLocale } from 'src/localization';

const globalIntl = (locale, messages) => {
  const intl = createIntl({ defaultLocale, locale, messages });
  return intl;
};

export default globalIntl;
