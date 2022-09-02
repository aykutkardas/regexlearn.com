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
  <header
    className={cx('tw-z-50', {
      container: !isLearnPage,
      'container-fluid': isLearnPage,
    })}
  >
    <div className="row">
      <div className="col-sm-12">
        <div className="tw-flex tw-items-center tw-justify-center tw-h-20">
          <div className="tw-flex-1">
            <Logo />
          </div>
          {isLearnPage && <div id="ProgressArea" className="tw-flex tw-justify-center tw-flex-1" />}
          <div className="tw-flex-1">
            <div className="tw-flex tw-items-center tw-text-sm tw-justify-end tw-gap-2 sm:tw-gap-4">
              <IntlLink href="/[lang]/learn" passHref>
                {({ isActive }) => (
                  <a
                    className={cx('dark:tw-text-neutral-200 dark:hover:tw-text-green-400', {
                      ['dark:tw-text-green-400']: isActive,
                      'tw-block': isLearnPage,
                    })}
                  >
                    <FormattedMessage id="general.learn" />
                  </a>
                )}
              </IntlLink>
              <IntlLink href="/[lang]/cheatsheet" passHref>
                {({ isActive }) => (
                  <a
                    className={cx('dark:tw-text-neutral-200 dark:hover:tw-text-green-400', {
                      ['dark:tw-text-green-400']: isActive,
                      'tw-hidden md:tw-block': isLearnPage,
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
                      'dark:tw-text-neutral-200 dark:hover:tw-text-green-400',
                      "tw-relative after:tw-right-0 after:tw-content-['BETA'] after:tw-text-[10px] dark:after:tw-text-green-400 after:tw-absolute after:-tw-top-3",
                      {
                        ['dark:tw-text-green-400']: isActive,
                        'tw-hidden md:tw-block': isLearnPage,
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
                  'dark:tw-text-neutral-200 dark:hover:tw-text-green-400',
                  'tw-select-none tw-relative tw-hidden sm:tw-flex tw-items-baseline tw-justify-center',
                  { 'md:tw-inline-flex': isLearnPage },
                )}
              >
                <span>GitHub</span>
                <Icon
                  icon="github"
                  size={16}
                  className="tw-ml-1 tw-w-4 tw-h-4 dark:text-neutral-200"
                />
              </a>
              <LanguageSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
