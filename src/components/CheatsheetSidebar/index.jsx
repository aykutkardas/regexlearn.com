import { useState } from 'react';
import { useIntl } from 'react-intl';

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

  return (
    <div>
      {data.map(row => (
        <div key={row.title}>
          <Collapse
            key={row.title}
            className={styles.CheatsheetTitle}
            openedClassName={styles.CheatsheetTitle}
            open={activeCategory === row.title}
            triggerDisabled={activeCategory !== row.title}
            title={
              <CategoryTitle
                className={styles.CheatsheetTitleInner}
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
                title={<CheatsheetItemTitle data={item} />}
              >
                <CheatsheetDemo data={item} />
              </Collapse>
            ))}
          </Collapse>
        </div>
      ))}
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
