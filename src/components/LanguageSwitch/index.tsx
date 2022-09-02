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
    <div className="tw-relative tw-cursor-pointer tw-select-none">
      <div
        className="tw-flex tw-items-center tw-justify-center tw-relative tw-text-2xl"
        role="button"
        tabIndex={0}
        onClick={toggleLanguageList}
      >
        <span>{currentLang}</span>
      </div>
      <div
        className={cx(
          'tw-absolute tw-top-10 -tw-left-1/2 tw-z-50 dark:tw-bg-neutral-700 tw-p-2 tw-rounded-md tw-shadow-lg',
          isOpen ? 'tw-block tw-opacity-100' : 'tw-hidden tw-opacity-0',
        )}
      >
        {availableLangList.map(({ label, value }) => (
          <a
            href={getIntlPath({ href: pathname, lang: value, query })}
            key={value}
            onClick={closeLanguageList}
            className="tw-flex tw-items-center tw-justify-center w-1/3 tw-text-2xl hover:tw-scale-125"
          >
            <span>{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitch;
