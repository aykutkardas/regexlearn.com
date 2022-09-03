import { FormattedMessage } from 'react-intl';

import Social from 'src/components/Social';

import packageInfo from 'package.json';

const Footer = () => (
  <footer className="tw-flex tw-items-center tw-justify-center tw-flex-col tw-h-20 tw-mt-8 tw-mb-4 tw-w-full">
    <div className="tw-flex tw-items-center">
      <Social />
    </div>
    <div className="tw-flex tw-items-center tw-mt-3 tw-text-sm dark:tw-text-neutral-200 dark:hover:tw-text-neutral-400">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/aykutkardas/regexlearn.com#sponsoring"
      >
        <FormattedMessage id="general.becomeSponsor" />
      </a>
    </div>
    <span className="tw-text-xs tw-mt-1 dark:tw-text-neutral-400">v{packageInfo.version}</span>
  </footer>
);

export default Footer;
