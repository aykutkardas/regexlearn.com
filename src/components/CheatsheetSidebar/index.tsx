import { useState, useEffect, Fragment } from 'react';
import { useIntl } from 'react-intl';
import { Scrollbars } from 'react-custom-scrollbars';

import Collapse from 'src/components/Collapse';
import CheatsheetSidebarItemInner from 'src/components/CheatsheetSidebarItemInner';

import data from 'src/data/cheatsheet.json';

import styles from './CheatsheetSidebar.module.css';

const CheatsheetSidebar = () => {
  const { formatMessage } = useIntl();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  const Wrapper = mounted ? Scrollbars : Fragment;
  const props = mounted
    ? {
        autoHide: true,
        style: {
          width: '100%',
          height: '100%',
          paddingRight: 30,
        },
      }
    : {};

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.CheatsheetSidebar}>
      <Wrapper {...props}>
        {data.map(row => (
          <div key={row.title}>
            <Collapse
              key={row.title}
              className={styles.CategoryTitle}
              openedClassName={styles.CategoryTitle}
              contentClassName={styles.CategoryContent}
              open={activeCategory === row.title}
              triggerDisabled={activeCategory !== row.title}
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
      </Wrapper>
    </div>
  );
};

export default CheatsheetSidebar;
