import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';

import Icon from 'src/components/Icon';

import packageInfo from 'package.json';

const ReportPlayground = () => {
  const [body, setBody] = useState('');
  const { query } = useRouter();
  const { lang } = query;

  const title = encodeURI('[Playground]: Type the title here...');

  useEffect(() => {
    setBody(
      encodeURI(`
**Page:** \`Playground\`
**Language:** \`${lang}\`
**Version:** \`v${packageInfo.version}\`

**User Agent:** 
\`${window.navigator.userAgent.replace(/;/g, ',')}\`

---

**What is the problem you are experiencing?**
    
    
    `),
    );
  }, [lang]);

  return (
    <div className="tw-cursor-default tw-absolute -tw-bottom-6 tw-left-4 tw-select-none">
      <a
        className="tw-inline-flex tw-items-center tw-text-[10px] tw-text-neutral-400 hover:tw-text-green-300"
        href={`https://github.com/aykutkardas/regexlearn.com/issues/new?title=${title}&body=${body}`}
        target="_blank"
        rel="noreferrer"
      >
        <Icon icon="bell" size={10} className="tw-mr-2" />
        <FormattedMessage id="general.reportStep" />
      </a>
    </div>
  );
};

export default ReportPlayground;
