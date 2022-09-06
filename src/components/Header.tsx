import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

import Icon from 'src/components/Icon';
import Logo from 'src/components/Logo';
import IntlLink from 'src/components/IntlLink';
import LanguageSwitch from 'src/components/LanguageSwitch';

interface Props {
  isLearnPage?: boolean;
}

const Header = ({ isLearnPage }: Props) => (
  <header className={cx('z-50', isLearnPage ? 'w-full px-3' : 'container')}>
    <div className="flex items-center justify-center h-20">
      <div className="flex-1">
        <Logo />
      </div>
      {isLearnPage && <div id="ProgressArea" className="flex justify-center flex-1" />}
      <div className="flex-1">
        <div className="flex items-center text-sm justify-end gap-2 sm:gap-4">
          <IntlLink href="/[lang]/learn" passHref>
            {({ isActive }) => (
              <a className={isActive ? 'text-regreen-400' : 'text-neutral-200'}>
                <FormattedMessage id="general.learn" />
              </a>
            )}
          </IntlLink>
          <IntlLink href="/[lang]/cheatsheet" passHref>
            {({ isActive }) => (
              <a
                className={cx('text-neutral-200 hover:text-regreen-400', {
                  'text-regreen-400': isActive,
                  'hidden md:block': isLearnPage,
                })}
              >
                <FormattedMessage id="general.cheatsheet" />
              </a>
            )}
          </IntlLink>
          <IntlLink href="/[lang]/playground" passHref>
            {({ isActive }) => (
              <a
                className={cx(
                  'text-neutral-200 hover:text-regreen-400',
                  "relative after:right-0 after:content-['BETA'] after:text-[10px] after:text-regreen-400 after:absolute after:-top-3",
                  {
                    'text-regreen-400': isActive,
                    'hidden md:block': isLearnPage,
                  },
                )}
                data-beta="true"
              >
                <FormattedMessage id="general.playground" />
              </a>
            )}
          </IntlLink>

          <a
            href="https://github.com/aykutkardas/regexlearn.com"
            target="_blank"
            rel="noreferrer"
            className={cx(
              'text-neutral-200 hover:text-regreen-400',
              'select-none relative items-baseline hidden justify-center',
              isLearnPage ? 'lg:flex' : 'sm:flex',
            )}
          >
            <span>GitHub</span>
            <Icon icon="github" size={16} className="ml-1 w-4 h-4 text-neutral-200" />
          </a>
          <LanguageSwitch />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
