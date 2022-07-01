import useEventListener from '@use-it/event-listener';

import Checkbox from 'src/components/Checkbox';
import Shortcut from 'src/components/Shortcut';
import HighlightedText from 'src/components/HighlightedText';
import shortcuts from 'src/shortcuts';

import styles from './FlagBox.module.css';

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
    if (!event.altKey) return;

    const key = event.key.toLowerCase();
    const isValidKey = 'gmi'.includes(key);

    if (isValidKey) {
      event.preventDefault();
      toggleFlag(key);
    }
  };

  useEventListener('keyup', handleFlagKey);

  return (
    <div className={styles.FlagBox}>
      {flagList.map(({ name, code, command, regex }) => (
        <div className={styles.FlagBoxItemWrapper} key={name}>
          <Checkbox
            id={`flag-${name}`}
            checked={!!flags?.includes(code)}
            onChange={() => toggleFlag(code)}
          >
            <div className={styles.FlagBoxItem}>
              <HighlightedText
                element="span"
                id={`flag-${name}`}
                text={name}
                search={regex}
                attrs={{ className: styles.FlagBoxItemHighlight }}
              />
            </div>
          </Checkbox>
          <div className={styles.FlagBoxShortcutWrapper}>
            <Shortcut command={command} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlagBox;
