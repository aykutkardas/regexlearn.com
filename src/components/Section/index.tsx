import { FormattedMessage, useIntl } from 'react-intl';
import cx from 'classnames';

import Button, { ButtonVariants } from 'src/components/Button';
import IntlLink from 'src/components/IntlLink';
import HighlightedText from 'src/components/HighlightedText';

import styles from './Section.module.css';

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
    <div className={cx('row', reverse ? styles.SectionReverse : styles.Section)}>
      <div className={cx('col-xs-12 col-sm-12 col-md-6', styles.SectionImageWrapper)}>
        <img
          src={image}
          loading="lazy"
          className={cx('img-responsive', styles.SectionImage)}
          alt={formatMessage({ id: imageAltText })}
        />
      </div>
      <div className={cx('col-xs-12 col-sm-12 col-md-6', styles.SectionContentWrapper)}>
        <div>
          <h2 className={styles.SectionTitle}>
            <FormattedMessage id={title} />
          </h2>
          <HighlightedText
            element="p"
            text={formatMessage({ id: description })}
            attrs={{ className: styles.SectionHighlight }}
          />
          {isShowButton && (
            <IntlLink href={link} passHref>
              <a>
                <Button variant={ButtonVariants.Primary} className={styles.SectionButton}>
                  <FormattedMessage id={buttonText} />
                </Button>
              </a>
            </IntlLink>
          )}
          {customButton?.({ className: styles.SectionButton })}
        </div>
      </div>
    </div>
  );
};

export default Section;
