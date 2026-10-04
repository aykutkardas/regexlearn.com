import { FormattedMessage, useIntl } from 'react-intl';
import cx from 'clsx';

import Icon from 'src/components/Icon';
import Button, { ButtonVariants } from 'src/components/Button';
import IntlLink from 'src/components/IntlLink';
import HighlightedText from 'src/components/HighlightedText';
import { useLanguageDirection } from 'src/utils/useLanguageDirection';

interface Props {
  index?: number;
  title?: string;
  description?: string;
  link?: string;
  image?: string;
  imageAltText?: string;
  buttonText?: string;
  customButton?: Function;
  reverse?: boolean;
}

const Section = ({
  index,
  reverse,
  title,
  description,
  link,
  image,
  imageAltText,
  buttonText,
  customButton,
}: Props) => {
  const { formatMessage } = useIntl();
  const direction = useLanguageDirection();
  const isShowButton = Boolean(link && buttonText);

  return (
    <section
      className={cx(
        'w-full flex flex-col-reverse items-center gap-6 md:gap-12 py-10 md:py-16',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row',
      )}
    >
      <div className="md:w-1/2 text-center md:text-start">
        {typeof index === 'number' && (
          <span className="font-mono text-xs text-regreen-400/80 tracking-widest">
            {String(index).padStart(2, '0')} <span className="text-neutral-600">{'//'}</span>
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2 mb-4 text-white">
          <FormattedMessage id={title} />
        </h2>
        <HighlightedText
          element="p"
          className="text-neutral-400 leading-relaxed md:text-[15px] max-w-xl mx-auto md:mx-0"
          text={formatMessage({ id: description })}
          attrs={{ className: 'code-chip' }}
        />
        {isShowButton && (
          <IntlLink href={link} passHref tabIndex={-1}>
            <Button variant={ButtonVariants.Primary} className="mt-6">
              <FormattedMessage id={buttonText} />
              <Icon icon={direction === 'rtl' ? 'arrow-left' : 'arrow-right'} size={14} />
            </Button>
          </IntlLink>
        )}
        {customButton?.({ className: 'mt-6' })}
      </div>
      <div className="md:w-1/2 flex justify-center">
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-[12%] rounded-full bg-regreen-400/10 blur-3xl"
          />
          <img
            src={image}
            loading="lazy"
            className="relative w-72 h-72 lg:w-[420px] lg:h-[420px] drop-shadow-2xl transition-transform duration-500 hover:-translate-y-1"
            alt={formatMessage({ id: imageAltText })}
          />
        </div>
      </div>
    </section>
  );
};

export default Section;
