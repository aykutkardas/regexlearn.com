import { Fragment, useRef } from 'react';
import cx from 'clsx';
import { Popover, Transition } from '@headlessui/react';
import useEventListener from 'src/utils/useEventListener';
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

  const blockHintKey = e => {
    if (e.altKey && e.code === 'KeyH') {
      e.preventDefault();
    }
  };

  const toggleShow = e => {
    const lastActiveElement = window.document.activeElement;

    if (e.altKey && e.code === 'KeyH') {
      e.preventDefault();
      popoverButtonRef.current.click();
      (lastActiveElement as HTMLElement).focus();
    }
  };

  useEventListener('keydown', blockHintKey);
  useEventListener('keyup', toggleShow);

  return (
    <Popover className="relative select-none">
      <Popover.Button
        ref={popoverButtonRef}
        className="inline-flex items-center gap-2 text-[11px] text-neutral-400 hover:text-white transition-colors"
      >
        <FormattedMessage id="general.hintQuestion" />
        <Shortcut command={shortcuts.hint} />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition duration-150 ease-out"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-100 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Popover.Panel className="absolute right-0 min-w-[10rem] z-20 mt-2 p-1.5 rounded-xl border border-white/10 bg-ink-900 shadow-2xl">
          <div className="flex flex-col gap-1">
            {regex.map(answer => (
              <div
                className="px-3 py-2 rounded-lg bg-white/[0.03] text-center font-mono"
                key={answer}
              >
                <span
                  data-flags={flags}
                  className={cx('text-regreen-400 whitespace-nowrap text-sm', {
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
      </Transition>
    </Popover>
  );
};

export default Hint;
