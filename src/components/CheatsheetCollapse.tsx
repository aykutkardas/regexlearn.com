import { useState } from 'react';
import cx from 'classnames';

import CheatsheetDemo from './CheatsheetDemo';

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
    <div className={cx('tw-w-full tw-mb-3', open ? 'tw-border-b tw-border-neutral-900/20' : '')}>
      <div
        onClick={toggle}
        onKeyDown={toggle}
        className={cx(
          'tw-h-6 tw-mr-0 sm:tw-mr-8 tw-select-none tw-cursor-pointer tw-text-sm  dark:hover:tw-text-neutral-300 dark:focus:tw-text-neutral-300 tw-outline-green-400',
          open ? 'dark:tw-text-neutral-300' : 'dark:tw-text-neutral-400',
        )}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-controls={`Collapse-${data.title}`}
      >
        <div className="tw-w-14 tw-inline-block">
          <span className="tw-p-1 tw-text-xs tw-font-mono dark:tw-text-neutral-100 dark:tw-bg-[#333] tw-rounded-md">
            {data.code}
          </span>
        </div>
        {title}
      </div>
      {open && (
        <div id={`Collapse-${data.title}`} className="tw-h-auto tw-my-3 tw-mr-0 sm:tw-mr-8">
          <CheatsheetDemo data={data} />
        </div>
      )}
    </div>
  );
};

export default CheatsheetCollapse;
