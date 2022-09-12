import { FormattedMessage, useIntl } from 'react-intl';
import cx from 'clsx';

import Button, { ButtonVariants } from 'src/components/Button';
import IntlLink from 'src/components/IntlLink';
import HighlightedText from 'src/components/HighlightedText';

interface Props {
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
  const isShowButton = Boolean(link && buttonText);

  return (
    <div
      className={cx(
        'w-full flex flex-col-reverse  items-center mb-12',
        reverse ? 'md:flex-row-reverse' : 'md:flex-row',
      )}
    >
      <div className="md:w-1/2 my-auto text-center md:text-left">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            <FormattedMessage id={title} />
          </h2>
          <HighlightedText
            element="p"
            className="text-neutral-300"
            text={formatMessage({ id: description })}
            attrs={{ className: 'text-regreen-400' }}
          />
          {isShowButton && (
            <IntlLink href={link} passHref>
              <a tabIndex={-1}>
                <Button variant={ButtonVariants.Primary} className="mt-4">
                  <FormattedMessage id={buttonText} />
                </Button>
              </a>
            </IntlLink>
          )}
          {customButton?.({ className: 'mt-4' })}
        </div>
      </div>
      <div className={cx('md:w-1/2 order-1 md:order-2', reverse ? 'md:pr-10' : 'md:pl-10')}>
        <img
          src={image}
          loading="lazy"
          className="w-80 h-80 lg:w-[450px] lg:h-[450px] drop-shadow-2xl"
          alt={formatMessage({ id: imageAltText })}
        />
      </div>
    </div>
  );
};

export default Section;
