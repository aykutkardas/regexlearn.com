import useEventListener from '@use-it/event-listener';

import Checkbox from 'src/components/Checkbox';
import Shortcut from 'src/components/Shortcut';
import HighlightedText from 'src/components/HighlightedText';
import shortcuts from 'src/shortcuts';

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

interface FlagBoxProps {
  flags: string;
  setFlags: Function;
}

const FlagBox = ({ flags, setFlags }: FlagBoxProps) => {
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
    <div className="flex flex-row items-start gap-5 select-none text-xs">
      {flagList.map(({ name, code, command, regex }) => (
        <div className="inline-flex items-center" key={name}>
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
    </div>
  );
};

export default FlagBox;
