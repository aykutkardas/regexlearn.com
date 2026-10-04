import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import cx from 'clsx';

import getIntlPath from 'src/utils/getIntlPath';
import { defaultLocale, langNames } from 'src/localization';

const getNativeName = (code: string) => {
  try {
    const name = new Intl.DisplayNames([code], { type: 'language' }).of(code);
    return name.charAt(0).toLocaleUpperCase(code) + name.slice(1);
  } catch {
    return code.toUpperCase();
  }
};

const langList = Object.keys(langNames).map(langKey => ({
  value: langKey,
  flag: langNames[langKey],
  label: getNativeName(langKey),
}));

const LanguageSelect = () => {
  const { pathname, query } = useRouter();
  const currentLocale = (query.lang as string) || defaultLocale;

  return (
    <Popover className="relative select-none">
      <Popover.Button
        aria-label="Language"
        className={cx(
          'h-9 inline-flex items-center gap-1.5 px-3 rounded-full text-xs font-semibold tracking-wide',
          'text-neutral-200 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-colors',
        )}
      >
        <span className="uppercase">{currentLocale.split('-')[0]}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="opacity-60">
          <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </Popover.Button>

      <Transition
        enter="transition duration-150 ease-out"
        enterFrom="opacity-0 -translate-y-1 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
        leave="transition duration-100 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel
          className={cx(
            'absolute rtl:left-0 ltr:right-0 z-50 mt-2 p-1.5 w-[300px] max-w-[calc(100vw-2rem)]',
            'grid grid-cols-2 gap-0.5 rounded-2xl border border-white/10 bg-ink-900/95 backdrop-blur-xl shadow-2xl',
          )}
        >
          {langList.map(({ label, value, flag }) => {
            const isActive = value === currentLocale;
            return (
              <a
                href={getIntlPath({ href: pathname, lang: value, query })}
                key={value}
                lang={value}
                aria-current={isActive ? 'true' : undefined}
                className={cx(
                  'flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] transition-colors',
                  isActive
                    ? 'bg-regreen-400/10 text-regreen-400'
                    : 'text-neutral-300 hover:bg-white/[0.06] hover:text-white',
                )}
              >
                <span className="text-base leading-none">{flag}</span>
                <span className="truncate">{label}</span>
              </a>
            );
          })}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default LanguageSelect;
