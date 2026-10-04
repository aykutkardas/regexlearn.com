import { FormattedMessage } from 'react-intl';

import Logo from 'src/components/Logo';
import Social from 'src/components/Social';
import IntlLink from 'src/components/IntlLink';

import packageInfo from 'package.json';

const links = [
  { href: '/[lang]/learn', label: 'general.learn' },
  { href: '/[lang]/cheatsheet', label: 'general.cheatsheet' },
  { href: '/[lang]/playground', label: 'general.playground' },
];

const Footer = () => (
  <footer className="w-full mt-16 border-t border-white/[0.06]">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
      <div className="flex flex-col items-center md:items-start gap-2">
        <Logo />
        <span className="text-xs text-neutral-500 font-mono">v{packageInfo.version}</span>
      </div>
      <nav className="flex items-center gap-6 text-sm">
        {links.map(({ href, label }) => (
          <IntlLink
            key={href}
            href={href}
            navLink
            inactiveClassName="text-neutral-400 hover:text-white transition-colors"
          >
            <FormattedMessage id={label} />
          </IntlLink>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <a
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-regreen-400 hover:text-regreen-300 transition-colors"
          href="https://github.com/aykutkardas/regexlearn.com#sponsoring"
        >
          <FormattedMessage id="general.becomeSponsor" />
        </a>
        <span className="w-px h-4 bg-white/10" />
        <Social />
      </div>
    </div>
  </footer>
);

export default Footer;
