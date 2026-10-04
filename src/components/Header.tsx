import { Fragment, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'clsx';
import { Popover, Transition } from '@headlessui/react';

import Icon from 'src/components/Icon';
import Logo from 'src/components/Logo';
import IntlLink from 'src/components/IntlLink';
import LanguageSelect from 'src/components/LanguageSelect';

import packageInfo from 'package.json';

interface Props {
  page?: 'home' | 'learn' | 'learn-detail' | 'cheatsheet' | 'playground';
}

const navItems = [
  { href: '/[lang]/learn', label: 'general.learn' },
  { href: '/[lang]/cheatsheet', label: 'general.cheatsheet' },
  { href: '/[lang]/playground', label: 'general.playground' },
];

const Header = ({ page }: Props) => {
  const isLearnDetail = page === 'learn-detail';
  const isPlaygroundPage = page === 'playground';
  const isSticky = !isLearnDetail && !isPlaygroundPage;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isSticky) return;

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, [isSticky]);

  return (
    <header
      className={cx('z-40 h-16 sm:h-20 transition-colors duration-300', {
        'sticky top-0 -mx-4 px-4 backdrop-blur-xl': isSticky,
        'bg-ink-800/70 border-b border-white/[0.06]': isSticky && scrolled,
        'border-b border-transparent': isSticky && !scrolled,
        relative: !isSticky,
        'bg-ink-900/80 px-4 border-b border-white/[0.06] backdrop-blur-xl': isPlaygroundPage,
      })}
    >
      <div className="flex items-center justify-center h-full gap-3">
        <div className="flex-1 shrink-0 inline-flex items-center gap-2">
          <Logo />
          {isPlaygroundPage && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/5 text-neutral-500 sm:inline-flex hidden">
              v{packageInfo.version}
            </span>
          )}
        </div>
        {isLearnDetail && <div id="ProgressArea" className="flex justify-center flex-1" />}
        <div className="flex flex-1 min-w-0 items-center text-sm justify-end gap-1 sm:gap-2">
          {!isLearnDetail && (
            <nav className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
              {navItems.map(({ href, label }) => (
                <IntlLink
                  key={href}
                  className="block whitespace-nowrap px-3 lg:px-3.5 py-1.5 rounded-full transition-colors font-medium text-[13px]"
                  activeClassName="bg-white/[0.08] text-regreen-400"
                  inactiveClassName="text-neutral-300 hover:text-white"
                  navLink
                  href={href}
                >
                  <FormattedMessage id={label} />
                </IntlLink>
              ))}
            </nav>
          )}

          <a
            href="https://github.com/aykutkardas/regexlearn.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={cx(
              'w-9 h-9 rounded-full text-neutral-300 hover:text-white hover:bg-white/[0.06]',
              'select-none items-center hidden sm:inline-flex justify-center transition-colors',
            )}
          >
            <Icon icon="github" size={18} />
          </a>
          <LanguageSelect />
          {!isLearnDetail && (
            <Popover className="sm:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    aria-label="Menu"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-full text-neutral-200 hover:bg-white/[0.06] transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                        {open ? (
                          <>
                            <path d="M4.5 4.5l9 9" />
                            <path d="M13.5 4.5l-9 9" />
                          </>
                        ) : (
                          <>
                            <path d="M3 5.5h12" />
                            <path d="M3 9h12" />
                            <path d="M3 12.5h12" />
                          </>
                        )}
                      </g>
                    </svg>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition duration-150 ease-out"
                    enterFrom="opacity-0 -translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition duration-100 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Panel className="absolute inset-x-2 top-full mt-1 p-1.5 flex flex-col rounded-2xl border border-white/10 bg-ink-900 shadow-2xl">
                      {navItems.map(({ href, label }) => (
                        <IntlLink
                          key={href}
                          className="block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors"
                          activeClassName="bg-white/[0.06] text-regreen-400"
                          inactiveClassName="text-neutral-200 hover:bg-white/[0.04]"
                          navLink
                          href={href}
                        >
                          <FormattedMessage id={label} />
                        </IntlLink>
                      ))}
                      <a
                        href="https://github.com/aykutkardas/regexlearn.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-3 mt-1 rounded-xl text-[15px] text-neutral-300 hover:bg-white/[0.04] border-t border-white/[0.06]"
                      >
                        <Icon icon="github" size={16} />
                        GitHub
                      </a>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
