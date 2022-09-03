import { useIntl } from 'react-intl';
import cx from 'classnames';

import CheatsheetCollapse from 'src/components/CheatsheetCollapse';

import data from 'src/data/cheatsheet.json';

import styles from './CheatsheetSidebar.module.css';

const CheatsheetSidebar = () => {
  const { formatMessage } = useIntl();

  return (
    <div
      className={cx(
        'tw-h-full tw-overflow-y-hidden hover:tw-overflow-y-scroll tw-rounded-md',
        styles.CheatsheetSidebar,
      )}
    >
      {data.map(row => (
        <div key={row.title} className="tw-bg-neutral-800 tw-p-3 tw-mb-3 tw-rounded-md">
          <div className="tw-mb-3">{formatMessage({ id: row.title })}</div>
          {row.data.map(item => (
            <CheatsheetCollapse
              key={item.title}
              title={formatMessage({ id: item.title })}
              data={item}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CheatsheetSidebar;
