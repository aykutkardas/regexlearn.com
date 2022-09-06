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
            class: 'shadow-sm mx-1 my-[1px] px-1 py-[2px] rounded-md text-white bg-green-500',
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
    <div className="font-mono">
      <div
        className={cx(
          'flex bg-neutral-800 rounded-md p-3 my-1 items-center justify-center relative mb-3 text-xs text-neutral-400',
          'before:content-[attr(data-title)] before:block before:absolute before:-top-2 before:right-2 before:text-[9px] before:bg-neutral-700 before:px-2 before:rounded-md before:text-neutral-400 tracking-wide ',
        )}
        data-title={formatMessage({ id: 'general.text' })}
        dangerouslySetInnerHTML={{ __html: readableContent }}
      />
      <div
        className={cx(
          'flex flex-wrap bg-neutral-800 rounded-md p-3 my-1 items-center justify-center relative text-xs',
          'before:content-[attr(data-title)] before:block before:absolute before:-top-2 before:right-2 before:text-[9px] before:bg-neutral-700 before:px-2 before:rounded-md before:text-neutral-400',
        )}
        data-title={formatMessage({ id: 'general.regex' })}
      >
        <span
          className={cx(
            "p-1 before:content-['/'] after:content-['/'_attr(data-flags)] before:text-neutral-500 after:text-neutral-500 text-regreen-400",
          )}
        >
          {data.regex}
        </span>
        <span className="text-regreen-400">{data.flags}</span>
      </div>
    </div>
  );
};

export default CheatsheetDemo;
