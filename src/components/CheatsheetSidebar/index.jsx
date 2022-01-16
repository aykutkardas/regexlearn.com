import { useState, useEffect, Fragment } from 'react';
import { useIntl } from 'react-intl';
import { Scrollbars } from 'react-custom-scrollbars';

import Collapse from 'src/components/Collapse';
import CheatsheetItemTitle from 'src/components/CheatsheetItemTitle';
import CheatsheetSidebarItemInner from 'src/components/CheatsheetSidebarItemInner';
import CheatsheetDemo from 'src/components/CheatsheetDemo';

import data from 'src/data/cheatsheet.json';

import * as styles from './CheatsheetSidebar.module.css';

const CategoryTitle = ({ label, ...props }) => <div {...props}>{label}</div>;

const CheatsheetSidebar = () => {
  const { formatMessage } = useIntl();
  const [activeCategory, setActiveCategory] = useState();
  const [mounted, setMounted] = useState(false);

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
              open={activeCategory === row.title}
              triggerDisabled={activeCategory !== row.title}
              title={
                <CategoryTitle
                  className={styles.CategoryTitleInner}
                  onClick={() => setActiveCategory(row.title)}
                  label={formatMessage({ id: row.title })}
                />
              }
              description={row.description}
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
