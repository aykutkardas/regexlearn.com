import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import cx from 'clsx';

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
        <div className="flex-1 inline-flex items-center gap-2">
          <Logo />
          {isPlaygroundPage && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/5 text-neutral-500 sm:inline-flex hidden">
              v{packageInfo.version}
            </span>
          )}
        </div>
        {isLearnDetail && <div id="ProgressArea" className="flex justify-center flex-1" />}
        <div className="flex flex-1 items-center text-sm justify-end gap-1 sm:gap-2">
          {!isLearnDetail && (
            <nav className="flex items-center gap-0.5 sm:gap-1 sm:p-1 sm:rounded-full sm:bg-white/[0.03] sm:border sm:border-white/[0.06]">
              {navItems.map(({ href, label }) => (
                <IntlLink
                  key={href}
                  className="block px-2 sm:px-3.5 py-1.5 rounded-full transition-colors font-medium text-[13px]"
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
        </div>
      </div>
    </header>
  );
};

export default Header;
