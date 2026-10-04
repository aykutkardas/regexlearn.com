import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

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
              'mx-0.5 px-1 py-px rounded-md bg-regreen-400 text-ink-950 inline-block',
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
    <div dir="ltr" className="font-mono flex flex-col gap-2">
      <div className="rounded-lg bg-ink-950/60 border border-white/[0.05] overflow-hidden">
        <div className="px-3 pt-2 text-[9px] uppercase tracking-[0.16em] text-neutral-500 font-sans font-medium">
          {formatMessage({ id: 'general.text' })}
        </div>
        <div
          className="px-3 pb-3 pt-1 text-xs leading-6 text-neutral-400 tracking-wide text-center"
          dangerouslySetInnerHTML={{ __html: readableContent }}
        />
      </div>
      <div className="rounded-lg bg-ink-950/60 border border-white/[0.05] overflow-hidden">
        <div className="px-3 pt-2 text-[9px] uppercase tracking-[0.16em] text-neutral-500 font-sans font-medium">
          {formatMessage({ id: 'general.regex' })}
        </div>
        <div className="flex flex-wrap items-center justify-center px-3 pb-3 pt-1 text-xs">
          <span className="before:content-['/'] after:content-['/'] before:text-neutral-500 after:text-neutral-500 text-regreen-400">
            {data.regex}
          </span>
          <span className="text-regreen-400">{data.flags}</span>
        </div>
      </div>
    </div>
  );
};

export default CheatsheetDemo;
