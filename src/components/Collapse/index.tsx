import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Collapsible from 'react-collapsible';
import cx from 'classnames';

import Icon from 'src/components/Icon';

import styles from './Collapse.module.css';

interface Props {
  title: any;
  className?: string;
  openedClassName?: string;
  open?: boolean;
  triggerDisabled?: boolean;
  description: string;
  children: any;
  titleClassName?: string;
  contentClassName?: string;
  triggerElementProps?: { id: string };
}

const Collapse = ({
  title,
  description,
  children,
  titleClassName,
  contentClassName,
  ...props
}: Props) => {
  const [show, setShow] = useState(false);

  return (
    <Collapsible
      transitionTime={300}
      onOpening={() => setShow(true)}
      onClosing={() => setShow(false)}
      {...props}
      trigger={
        <div className={cx(styles.CollapseTitle, titleClassName)}>
          {title}
          <Icon
            className={cx(show ? styles.CollapseTitleIconActive : styles.CollapseTitleIcon)}
            icon="caret-down"
            size={12}
          />
        </div>
      }
    >
      <div className={cx(styles.CollapseContent, contentClassName)}>
        {description && (
          <p className={styles.CollapseDescription}>
            <FormattedMessage id={description} />
          </p>
        )}
        {children}
      </div>
    </Collapsible>
  );
};

export default Collapse;
