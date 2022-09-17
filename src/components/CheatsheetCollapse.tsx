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
    <div className={cx('w-full mb-3', open ? 'border-b border-neutral-900/20' : '')}>
      <div
        onClick={toggle}
        onKeyDown={toggle}
        className={cx(
          'h-6 select-none cursor-pointer text-sm  hover:text-neutral-50 focus:text-neutral-50 outline-regreen-400',
          open ? 'text-neutral-50' : 'text-neutral-400',
        )}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-controls={`Collapse-${data.title}`}
      >
        <div className="w-14 inline-block">
          <span className="p-1 text-xs font-mono text-neutral-100 bg-[#333] rounded-md">
            {data.code}
          </span>
        </div>
        {title}
      </div>
      {open && (
        <div id={`Collapse-${data.title}`} className="h-auto mb-3 mt-2">
          {data.description && (
            <p className="text-xs text-neutral-400 mb-4 pl-14">
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
