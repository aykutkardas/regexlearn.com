import { useState, useEffect, Fragment } from 'react';
import { useIntl } from 'react-intl';
import { Scrollbars } from 'react-custom-scrollbars';

import Collapse from 'src/components/Collapse';
import CheatsheetItemTitle from 'src/components/CheatsheetItemTitle';

import data from 'src/data/cheatsheet.json';

import { locales } from 'src/localization';
import CheatsheetDemo from '../CheatsheetDemo';

import * as styles from './CheatsheetSidebar.module.css';

const CategoryTitle = ({ label, ...props }) => <div {...props}>{label}</div>;

export default function Cheatsheet() {
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
              {row.data.map(item => (
                <Collapse
                  key={item.title}
                  description={item.description}
                  className={styles.CheatsheetTitle}
                  title={<CheatsheetItemTitle data={item} />}
                >
                  <CheatsheetDemo data={item} />
                </Collapse>
              ))}
            </Collapse>
          </div>
        ))}
      </Wrapper>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: locales.map(lang => ({
      params: {
        lang,
      },
    })),
  };
}
