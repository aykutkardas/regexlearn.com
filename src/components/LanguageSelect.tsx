import { useRouter } from 'next/router';
import { Popover } from '@headlessui/react';

import getIntlPath from 'src/utils/getIntlPath';
import { langNames } from 'src/localization';

const langList = Object.keys(langNames).map(langKey => ({
  value: langKey,
  label: langNames[langKey],
}));

const LanguageSelect = () => {
  const { pathname, query } = useRouter();
  let currentLang = langNames[query.lang as string];

  const availableLangList = langList.filter(({ value }) => query.lang !== value);

  return (
    <Popover className="select-none cursor-pointer">
      <Popover.Button className="text-lg">
        <span>{currentLang}</span>
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-10 mt-2 p-2 border w-28 border-neutral-700 bg-neutral-800 shadow-md rounded-md">
        {availableLangList.map(({ label, value }) => (
          <a
            href={getIntlPath({ href: pathname, lang: value, query })}
            key={value}
            className="inline-flex p-1  w-1/3 text-lg hover:scale-125"
          >
            <span>{label}</span>
          </a>
        ))}
      </Popover.Panel>
    </Popover>
  );
};

export default LanguageSelect;
