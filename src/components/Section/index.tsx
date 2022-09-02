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
    <div className="row tw-flex tw-items-center tw-mb-12">
      <div className="col-xs-12 col-sm-12 col-md-6 tw-order-2">
        <img
          src={image}
          loading="lazy"
          className="tw-w-full"
          alt={formatMessage({ id: imageAltText })}
        />
      </div>
      <div className={cx('col-xs-12 col-sm-12 col-md-6', { 'tw-order-2': !reverse })}>
        <div>
          <h2 className="tw-text-2xl tw-font-bold tw-mb-4 dark:tw-text-white">
            <FormattedMessage id={title} />
          </h2>
          <HighlightedText
            element="p"
            className="dark:tw-text-neutral-300"
            text={formatMessage({ id: description })}
            attrs={{ className: 'dark:tw-text-green-400' }}
          />
          {isShowButton && (
            <IntlLink href={link} passHref>
              <a>
                <Button variant={ButtonVariants.Primary} className="tw-mt-4">
                  <FormattedMessage id={buttonText} />
                </Button>
              </a>
            </IntlLink>
          )}
          {customButton?.({ className: 'tw-mt-4' })}
        </div>
      </div>
    </div>
  );
};

export default Section;
