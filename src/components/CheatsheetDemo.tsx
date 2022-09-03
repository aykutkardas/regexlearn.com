import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import cx from 'classnames';

import checkRegex from 'src/utils/checkRegex';
import tagWrapper from 'src/utils/tagWrapper';
import { CheatsheetData } from 'src/types';

interface Props {
  data: CheatsheetData;
}

const CheatsheetDemo = ({ data }: Props) => {
  const [content, setContent] = useState('');
  const { formatMessage } = useIntl();
  const initialContent = data.content;

  const applyRegex = () => {
    const { regex } = checkRegex(data, { regex: data.regex, flags: 'gmi' });

    if (regex) {
      setContent(
        tagWrapper({
          regex,
          value: initialContent,
          attributes: {
            class:
              'tw-bg-emerald-400/70 tw-px-1 tw-py-[1px] tw-h-4 tw-mx-1 tw-rounded-md dark:tw-text-neutral-50',
          },
        }),
      );
    } else {
      setContent(initialContent);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(applyRegex, []);

  const readableContent = (content || initialContent).replace(/\\n/gm, '<br />');

  return (
    <div className="tw-font-mono">
      <div
        className={cx(
          'tw-flex dark:tw-bg-neutral-800 tw-rounded-md tw-p-3 tw-my-1 tw-items-center tw-justify-center tw-relative tw-mb-3 tw-text-xs dark:tw-text-neutral-400',
          'before:tw-content-[attr(data-title)] before:tw-block before:tw-absolute before:-tw-top-2 before:tw-right-2 before:tw-text-[9px] before:tw-bg-neutral-700 before:tw-px-2 before:tw-rounded-md before:tw-text-neutral-400 tw-tracking-wide ',
        )}
        data-title={formatMessage({ id: 'general.text' })}
        dangerouslySetInnerHTML={{ __html: readableContent }}
      />
      <div
        className={cx(
          'tw-flex tw-flex-wrap dark:tw-bg-neutral-800 tw-rounded-md tw-p-3 tw-my-1 tw-items-center tw-justify-center tw-relative tw-text-xs',
          'before:tw-content-[attr(data-title)] before:tw-block before:tw-absolute before:-tw-top-2 before:tw-right-2 before:tw-text-[9px] before:tw-bg-neutral-700 before:tw-px-2 before:tw-rounded-md before:tw-text-neutral-400',
        )}
        data-title={formatMessage({ id: 'general.regex' })}
      >
        <span
          className={cx(
            "tw-p-1 before:tw-content-['/'] after:tw-content-['/'_attr(data-flags)] before:tw-text-neutral-500 after:tw-text-neutral-500 tw-text-green-400",
          )}
        >
          {data.regex}
        </span>
        <span className="tw-text-green-400">{data.flags}</span>
      </div>
    </div>
  );
};

export default CheatsheetDemo;
