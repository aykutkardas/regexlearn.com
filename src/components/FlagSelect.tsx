import useEventListener from 'src/utils/useEventListener';
import { Popover } from '@headlessui/react';

import Checkbox from 'src/components/Checkbox';
import Shortcut from 'src/components/Shortcut';
import HighlightedText from 'src/components/HighlightedText';
import shortcuts from 'src/shortcuts';
import Icon from 'src/components/Icon';

const flagList = [
  {
    name: 'global',
    code: 'g',
    command: shortcuts.flagGlobal,
    regex: /(g)/,
  },
  {
    name: 'multiline',
    code: 'm',
    command: shortcuts.flagMultiline,
    regex: /(m)/,
  },
  {
    name: 'case insensitive',
    code: 'i',
    command: shortcuts.flagCaseInsenstive,
    regex: /(i)/,
  },
];

interface FlagSelectProps {
  flags: string;
  setFlags: Function;
}

const FlagSelect = ({ flags, setFlags }: FlagSelectProps) => {
  const toggleFlag = flag => {
    const isActive = flags?.includes(flag);
    const newFlags = isActive ? flags.replace(flag, '') : `${flags || ''}${flag}`;

    setFlags(newFlags);
  };

  const handleFlagKey = event => {
    if (!event.ctrlKey) return;

    const key = event.key.toLowerCase();
    const isValidKey = 'gmi'.includes(key);

    if (isValidKey) {
      event.preventDefault();
      toggleFlag(key);
    }
  };

  useEventListener('keyup', handleFlagKey);

  return (
    <Popover className="relative select-none cursor-pointer">
      <Popover.Button
        aria-label="Flags"
        className="cursor-pointer text-neutral-300 hover:text-white hover:bg-white/[0.08] w-11 h-11 border border-white/10 bg-white/[0.03] flex items-center justify-center rounded-lg transition-colors"
      >
        <Icon icon="flag" size={14} />
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-20 mt-2 p-2 w-56 flex flex-col gap-1 rounded-xl border border-white/10 bg-ink-900 shadow-2xl">
        {flagList.map(({ name, code, command, regex }) => (
          <div className="flex w-full justify-between text-xs items-center px-2 py-1.5 rounded-lg hover:bg-white/[0.04]" key={name}>
            <Checkbox
              id={`flag-${name}`}
              checked={!!flags?.includes(code)}
              onChange={() => toggleFlag(code)}
            >
              <HighlightedText
                element="span"
                text={name}
                search={regex}
                attrs={{ className: 'text-regreen-400 font-semibold font-mono' }}
              />
            </Checkbox>
            <Shortcut command={command} />
          </div>
        ))}
      </Popover.Panel>
    </Popover>
  );
};

export default FlagSelect;
