import { useState } from 'react';

import Collapse from 'src/components/Collapse';
import CheatsheetItemTitle from 'src/components/CheatsheetItemTitle';
import CheatsheetDemo from 'src/components/CheatsheetDemo';

import * as styles from './CheatsheetSidebarItemInner.module.css';

const CheatsheetTitle = ({ ...props }) => <CheatsheetItemTitle {...props} />;

const CheatsheetSidebarItemInner = ({ data }) => {
  const [activeCheatsheet, setActiveCheatsheet] = useState();

  return (
    <div>
      {data.map(item => (
        <Collapse
          key={item.title}
          open={activeCheatsheet === item.title}
          triggerDisabled={activeCheatsheet !== item.title}
          description={item.description}
          className={styles.CheatsheetTitle}
          openedClassName={styles.CheatsheetTitleOpened}
          title={<CheatsheetTitle onClick={() => setActiveCheatsheet(item.title)} data={item} />}
        >
          <CheatsheetDemo data={item} />
        </Collapse>
      ))}
    </div>
  );
};

export default CheatsheetSidebarItemInner;
