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

const Header = ({ page }: Props) => {
  const isLearnDetail = page === 'learn-detail';
  const isPlaygroundPage = page === 'playground';

  return (
    <header
      className={cx('relative z-40 h-20', {
        'bg-neutral-800 px-4 border-b border-neutral-700': isPlaygroundPage,
      })}
    >
      <div className="flex items-center justify-center h-20">
        <div className="flex-1 inline-flex items-baseline">
          <Logo />
          {isPlaygroundPage && (
            <span className="text-xs ml-1 relative bottom-1 text-neutral-500 sm:flex hidden">
              v{packageInfo.version}
            </span>
          )}
        </div>
        {isLearnDetail && <div id="ProgressArea" className="flex justify-center flex-1" />}
        <div className="flex flex-1 items-center text-sm justify-end gap-2 sm:gap-4">
          <IntlLink href="/[lang]/learn" passHref>
            {({ isActive }) => (
              <a
                className={
                  isActive ? 'text-regreen-400' : 'text-neutral-200 hover:text-regreen-400'
                }
              >
                <FormattedMessage id="general.learn" />
              </a>
            )}
          </IntlLink>
          <IntlLink href="/[lang]/cheatsheet" passHref>
            {({ isActive }) => (
              <a
                className={cx(
                  isActive ? 'text-regreen-400' : 'text-neutral-200 hover:text-regreen-400',
                  { 'hidden md:block': isLearnDetail },
                )}
              >
                <FormattedMessage id="general.cheatsheet" />
              </a>
            )}
          </IntlLink>
          <IntlLink href="/[lang]/playground" passHref>
            {({ isActive }) => (
              <a
                className={cx(
                  isActive ? 'text-regreen-400' : 'text-neutral-200 hover:text-regreen-400',
                  { 'hidden md:block': isLearnDetail },
                )}
              >
                <FormattedMessage id="general.playground" />
              </a>
            )}
          </IntlLink>

          <a
            href="https://github.com/aykutkardas/regexlearn.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={cx(
              'text-neutral-200 hover:text-regreen-400',
              'select-none relative items-baseline inline-flex justify-center',
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
