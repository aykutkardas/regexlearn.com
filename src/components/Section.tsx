import { FormattedMessage, useIntl } from 'react-intl';
import cx from 'classnames';

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
    <div className="w-full flex flex-col md:flex-row items-center mb-12">
      <div className={cx('md:w-1/2 order-1 md:order-2', reverse ? 'md:pl-10' : 'md:pr-10')}>
        <img
          src={image}
          loading="lazy"
          className="w-full"
          alt={formatMessage({ id: imageAltText })}
        />
      </div>
      <div
        className={cx('md:w-1/2 my-auto text-center md:text-left', reverse ? 'order-1' : 'order-2')}
      >
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">
            <FormattedMessage id={title} />
          </h2>
          <HighlightedText
            element="p"
            className="text-neutral-300"
            text={formatMessage({ id: description })}
            attrs={{ className: 'text-green-400' }}
          />
          {isShowButton && (
            <IntlLink href={link} passHref>
              <a>
                <Button variant={ButtonVariants.Primary} className="mt-4">
                  <FormattedMessage id={buttonText} />
                </Button>
              </a>
            </IntlLink>
          )}
          {customButton?.({ className: 'mt-4' })}
        </div>
      </div>
    </div>
  );
};

export default Section;
