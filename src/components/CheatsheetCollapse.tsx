import { useState } from 'react';
import cx from 'clsx';

import CheatsheetDemo from './CheatsheetDemo';
import { FormattedMessage } from 'react-intl';

interface CheatsheetCollapseProps {
  title: string;
  data: any;
}

const CheatsheetCollapse = ({ title, data }: CheatsheetCollapseProps) => {
  const [open, setOpen] = useState(false);

  const toggle = e => {
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') {
      return;
    }

    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div
      className={cx(
        'w-full rounded-xl transition-colors',
        open ? 'bg-white/[0.04]' : 'hover:bg-white/[0.03]',
      )}
    >
      <div
        onClick={toggle}
        onKeyDown={toggle}
        className={cx(
          'flex items-center gap-3 px-2.5 py-2 select-none cursor-pointer text-sm rounded-xl transition-colors',
          open ? 'text-white' : 'text-neutral-400 hover:text-neutral-100',
        )}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-controls={`Collapse-${data.title}`}
      >
        <span className="w-14 shrink-0">
          <span
            className={cx(
              'inline-block px-1.5 py-0.5 text-xs font-mono rounded-md border transition-colors',
              open
                ? 'text-regreen-400 bg-regreen-400/10 border-regreen-400/20'
                : 'text-neutral-100 bg-white/[0.06] border-white/[0.06]',
            )}
            dir="ltr"
          >
            {data.code}
          </span>
        </span>
        <span className="flex-1 truncate">{title}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden
          className={cx('shrink-0 opacity-50 transition-transform duration-200', {
            'rotate-180': open,
          })}
        >
          <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      {open && (
        <div id={`Collapse-${data.title}`} className="h-auto px-2.5 pb-3 pt-1 animate-fade-up">
          {data.description && (
            <p className="text-xs text-neutral-400 leading-relaxed mb-3 ltr:pl-[4.25rem] rtl:pr-[4.25rem]">
              <FormattedMessage id={data.description} />
            </p>
          )}
          <CheatsheetDemo data={data} />
        </div>
      )}
    </div>
  );
};

export default CheatsheetCollapse;
