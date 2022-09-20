import useEventListener from '@use-it/event-listener';
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
    <Popover className="select-none cursor-pointer">
      <Popover.Button className="cursor-pointer text-neutral-300 hover:bg-neutral-700 mr-[2px] ml-3 w-9 border-dashed border p-2 text-sm h-9 flex items-center justify-center rounded-md border-neutral-600 focus:ring-0 focus:bg-neutral-700">
        <Icon icon="flag" size={14} />
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-10 mt-2 p-2 border w-48 border-neutral-700 bg-neutral-800 shadow-md rounded-md">
        {flagList.map(({ name, code, command, regex }) => (
          <div className="inline-flex w-full justify-between text-xs items-center" key={name}>
            <Checkbox
              id={`flag-${name}`}
              checked={!!flags?.includes(code)}
              onChange={() => toggleFlag(code)}
            >
              <HighlightedText
                element="span"
                text={name}
                search={regex}
                attrs={{ className: 'text-green-500' }}
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
