import { useState } from 'react';

import Collapse from 'src/components/Collapse';
import CheatsheetItemTitle from 'src/components/CheatsheetItemTitle';
import CheatsheetDemo from 'src/components/CheatsheetDemo';

import styles from './CheatsheetSidebarItemInner.module.css';

const CheatsheetSidebarItemInner = ({ data }) => {
  const [activeCheatsheet, setActiveCheatsheet] = useState<string | null>(null);

  return (
    <div>
      {data.map(item => (
        <Collapse
          key={item.title}
          open={activeCheatsheet === item.title}
          triggerDisabled={activeCheatsheet !== item.title}
          description={item.description}
          className={styles.CheatsheetTitle}
          contentClassName={styles.CheatsheetContent}
          openedClassName={styles.CheatsheetTitleOpened}
          title={
            <CheatsheetItemTitle onClick={() => setActiveCheatsheet(item.title)} data={item} />
          }
        >
          <CheatsheetDemo data={item} />
        </Collapse>
      ))}
    </div>
  );
};

export default CheatsheetSidebarItemInner;
