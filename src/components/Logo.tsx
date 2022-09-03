import Icon from 'src/components/Icon';
import IntlLink from 'src/components/IntlLink';

const Logo = () => (
  <IntlLink href="/[lang]">
    <a className="tw-flex tw-items-center" aria-label="RegexLearn">
      <Icon
        className="tw-fill-green-400 tw-block sm:tw-hidden"
        icon="unlocked"
        removeInlineStyle
        size={20}
      />
      <img
        className="tw-hidden sm:tw-block"
        width={109}
        height={27}
        src="/logo.svg"
        alt="RegexLearn"
      />
    </a>
  </IntlLink>
);

export default Logo;