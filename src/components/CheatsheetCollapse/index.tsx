import { useState } from 'react';
import cx from 'classnames';

import CheatsheetDemo from '../CheatsheetDemo';

interface CheatsheetCollapseProps {
  title: string;
  data: any;
}

const CheatsheetCollapse = ({ title, data }: CheatsheetCollapseProps) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <div className={cx('tw-w-full tw-mb-3 ', open ? 'tw-border-b tw-border-neutral-900/20' : '')}>
      <div
        onClick={toggle}
        className={cx(
          ' tw-h-6 tw-select-none tw-cursor-pointer tw-text-sm  dark:hover:tw-text-neutral-300',
          open ? 'dark:tw-text-neutral-300' : 'dark:tw-text-neutral-400',
        )}
      >
        <div className="tw-w-14 tw-inline-block">
          <span className="tw-p-1 tw-text-xs tw-font-mono dark:tw-text-neutral-100 dark:tw-bg-[#333] tw-rounded-md">
            {data.code}
          </span>
        </div>
        {title}
      </div>
      {open && (
        <div className="tw-h-auto tw-my-3">
          <CheatsheetDemo data={data} />
        </div>
      )}
    </div>
  );
};

export default CheatsheetCollapse;
