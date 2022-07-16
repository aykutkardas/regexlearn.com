import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Scrollbars } from 'react-custom-scrollbars';

import Collapse from 'src/components/Collapse';
import CheatsheetSidebarItemInner from 'src/components/CheatsheetSidebarItemInner';
import EscapeWrapperSSR from '../EscapeWrapperSSR';

import data from 'src/data/cheatsheet.json';

import styles from './CheatsheetSidebar.module.css';

const CheatsheetSidebar = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const { formatMessage } = useIntl();

  return (
    <div className={styles.CheatsheetSidebar}>
      <EscapeWrapperSSR
        Component={Scrollbars}
        autoHide={true}
        style={{
          width: '100%',
          height: '100%',
          paddingRight: 30,
        }}
      >
        {data.map(row => (
          <div key={row.title}>
            <Collapse
              key={row.title}
              className={styles.CategoryTitle}
              openedClassName={styles.CategoryTitle}
              contentClassName={styles.CategoryContent}
              open={activeCategory === row.title}
              triggerDisabled={activeCategory !== row.title}
              triggerElementProps={{ id: row.title.toUpperCase() }}
              title={
                <div
                  className={styles.CategoryTitleInner}
                  onClick={() => setActiveCategory(row.title)}
                >
                  {formatMessage({ id: row.title })}
                </div>
              }
              description={undefined}
              titleClassName={undefined}
            >
              <CheatsheetSidebarItemInner data={row.data} />
            </Collapse>
          </div>
        ))}
      </EscapeWrapperSSR>
    </div>
  );
};

export default CheatsheetSidebar;
