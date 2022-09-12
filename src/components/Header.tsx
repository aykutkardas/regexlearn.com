import { FormattedMessage } from 'react-intl';
import cx from 'clsx';

import Icon from 'src/components/Icon';
import Logo from 'src/components/Logo';
import IntlLink from 'src/components/IntlLink';
import LanguageSelect from 'src/components/LanguageSelect';

interface Props {
  isLearnPage?: boolean;
}

const Header = ({ isLearnPage }: Props) => (
  <header className="relative z-40">
    <div className="flex items-center justify-center h-20">
      <div className="flex-1">
        <Logo />
      </div>
      {isLearnPage && <div id="ProgressArea" className="flex justify-center flex-1" />}
      <div className="flex flex-1 items-center text-sm justify-end gap-2 sm:gap-4">
        <IntlLink href="/[lang]/learn" passHref>
          {({ isActive }) => (
            <a
              className={isActive ? 'text-regreen-400' : 'text-neutral-200 hover:text-regreen-400'}
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
                { 'hidden md:block': isLearnPage },
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
                "relative after:right-0 after:content-['BETA'] after:text-[10px] after:text-regreen-400 after:absolute after:-top-3",
                { 'hidden md:block': isLearnPage },
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

export default Header;
