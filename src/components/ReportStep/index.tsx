import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import Icon from 'src/components/Icon';

import packageInfo from 'package.json';

import styles from './ReportStep.module.css';

type ReportStepProps = {
  title?: string;
  step: number;
};

const ReportStep = ({ title: stepTitle, step }: ReportStepProps) => {
  const { query } = useRouter();
  const { lang } = query;

  const title = encodeURI('[Learn]: Type the title here...');
  const body = encodeURI(`
**Step Number:** \`${step}\`
**Step Name:** \`${stepTitle}\`
**Language:** \`${lang}\`
**Version:** \`v${packageInfo.version}\`

**User Agent:** 
\`${window.navigator.userAgent.replace(/;/g, ',')}\`

---

**What is the problem you are experiencing?**


`);

  return (
    <div className={styles.ReportStep}>
      <a
        className={styles.ReportStepLink}
        href={`https://github.com/aykutkardas/regexlearn.com/issues/new?title=${title}&body=${body}`}
        target="_blank"
        rel="noreferrer"
      >
        <Icon icon="bell" size={10} />
        <span>
          <FormattedMessage id="general.reportStep" />
        </span>
      </a>
    </div>
  );
};

export default ReportStep;
