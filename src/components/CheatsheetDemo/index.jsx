import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import cx from 'classnames';

import * as styles from './CheatsheetDemo.module.css';

import checkRegex from '../../utils/checkRegex';
import tagWrapper from 'src/utils/tagWrapper';

function CheatsheetDemo({ data }) {
  const [regex] = useState(data.regex || '');
  const [content, setContent] = useState(null);
  const { formatMessage } = useIntl();
  const initialContent = data.content;

  const applyRegex = () => {
    const { $regex } = checkRegex(data, { regex, flags: 'gmi' });

    if ($regex) {
      setContent(tagWrapper(initialContent, $regex, styles.CheatsheetDemoResultTag));
    } else {
      setContent(initialContent);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(applyRegex, []);

  return (
    <div className={styles.CheatsheetDemo}>
      <div
        className={cx(styles.CheatsheetDemoBlock, styles.CheatsheetDemoBlockContent)}
        data-title={formatMessage({ id: 'general.text' })}
        dangerouslySetInnerHTML={{
          __html: (content || initialContent).replace(/\\n/gm, '<br />'),
        }}
      />
      <div
        className={cx(styles.CheatsheetDemoBlock, styles.CheatsheetDemoBlockRegex)}
        data-title={formatMessage({ id: 'general.regex' })}
      >
        <span className={styles.CheatsheetDemoHiglightText} data-flags={data.flags}>
          {regex}
        </span>
      </div>
    </div>
  );
}

export default CheatsheetDemo;
