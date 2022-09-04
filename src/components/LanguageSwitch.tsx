import { useState } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';

import getIntlPath from 'src/utils/getIntlPath';
import { langNames } from 'src/localization';

const langList = Object.keys(langNames).map(langKey => ({
  value: langKey,
  label: langNames[langKey],
}));

const LanguageSwitch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname, query } = useRouter();
  const { lang } = query;
  let currentLang;

  if (typeof lang === 'string') {
    currentLang = langNames[lang];
  }

  const toggleLanguageList = () => setIsOpen(!isOpen);

  const closeLanguageList = () => setIsOpen(false);

  const availableLangList = langList.filter(({ value }) => lang !== value);

  return (
    <div className="relative cursor-pointer select-none">
      <div
        className="flex items-center justify-center relative text-2xl"
        role="button"
        tabIndex={0}
        onClick={toggleLanguageList}
      >
        <span>{currentLang}</span>
      </div>
      <div
        className={cx(
          'absolute top-10 -left-1/2 z-50 bg-neutral-700 p-2 rounded-md shadow-lg',
          isOpen ? 'block opacity-100' : 'hidden opacity-0',
        )}
      >
        {availableLangList.map(({ label, value }) => (
          <a
            href={getIntlPath({ href: pathname, lang: value, query })}
            key={value}
            onClick={closeLanguageList}
            className="flex items-center justify-center w-1/3 text-2xl hover:scale-125"
          >
            <span>{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitch;
