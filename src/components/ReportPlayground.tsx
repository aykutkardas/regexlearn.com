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
    <a
      className="inline-flex items-center text-xs px-2 py-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.04] transition-colors"
      href={`https://github.com/aykutkardas/regexlearn.com/issues/new?title=${title}&body=${body}`}
      target="_blank"
      rel="noreferrer"
    >
      <Icon icon="chat-bubble" size={14} className="ltr:mr-1.5 rtl:ml-1.5" />
      <FormattedMessage id="general.reportStep" />
    </a>
  );
};

export default ReportPlayground;
