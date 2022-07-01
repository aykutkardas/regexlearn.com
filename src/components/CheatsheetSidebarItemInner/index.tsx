import { useState } from 'react';

import Collapse from 'src/components/Collapse';
import CheatsheetItemTitle from 'src/components/CheatsheetItemTitle';
import CheatsheetDemo from 'src/components/CheatsheetDemo';
import { CheatsheetData } from 'src/types';

import styles from './CheatsheetSidebarItemInner.module.css';

interface Props {
  data: CheatsheetData[];
}

const CheatsheetSidebarItemInner = ({ data }: Props) => {
  const [activeCheatsheet, setActiveCheatsheet] = useState('');

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
