import { useRef } from 'react';
import cx from 'clsx';
import { Popover } from '@headlessui/react';
import useEventListener from '@use-it/event-listener';
import { FormattedMessage } from 'react-intl';

import Shortcut from 'src/components/Shortcut';
import shortcuts from 'src/shortcuts';

interface Props {
  regex: string[];
  flags: string;
  hiddenFlags?: boolean;
}

const Hint = ({ regex, flags, hiddenFlags }: Props) => {
  const popoverButtonRef = useRef<HTMLButtonElement>(null);

  const toggleShow = e => {
    e.preventDefault();
    const lastActiveElement = window.document.activeElement;

    if (e.altKey && e.key.toLowerCase() === 'h') {
      popoverButtonRef.current.click();
      (lastActiveElement as HTMLElement).focus();
    }
  };

  useEventListener('keyup', toggleShow);

  return (
    <Popover className="select-none cursor-pointer absolute right-2 top-1 md:top-auto md:bottom-1">
      <Popover.Button ref={popoverButtonRef} className="flex flex-col items-end text-[10px]">
        <Shortcut command={shortcuts.hint} />
        <FormattedMessage id="general.hintQuestion" />
      </Popover.Button>

      <Popover.Panel className="absolute w-32 text-center z-10 mt-2 p-2 border border-neutral-700 bg-neutral-800 shadow-md rounded-md">
        <div className="text-green-300 flex flex-col gap-3">
          {regex.map(answer => (
            <div className="mt-1 border border-neutral-800 text-neutral-500" key={answer}>
              <span
                data-flags={flags}
                className={cx('text-regreen-400 text-sm', {
                  "before:content-['/'] before:text-neutral-500 after:content-['/'_attr(data-flags)] after:text-neutral-500":
                    !hiddenFlags,
                })}
              >
                {answer}
              </span>
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default Hint;
