import { FormattedMessage } from 'react-intl';

import Social from 'src/components/Social';

import packageInfo from 'package.json';

const Footer = () => (
  <footer className="flex items-center justify-center flex-col h-20 mt-8 w-full">
    <div className="flex items-center">
      <Social />
    </div>
    <div className="flex items-center mt-3 text-sm text-regreen-400 hover:text-regreen-400/80">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/aykutkardas/regexlearn.com#sponsoring"
      >
        <FormattedMessage id="general.becomeSponsor" />
      </a>
    </div>
    <span className="text-xs mt-1 text-neutral-400 mb-8">v{packageInfo.version}</span>
  </footer>
);

export default Footer;
