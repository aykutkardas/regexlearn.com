import useEventListener from '@use-it/event-listener';

import * as styles from './FlagBox.module.css';

import Checkbox from 'src/components/Checkbox';
import Shortcut from 'src/components/Shortcut';

import tagWrapper from 'src/utils/tagWrapper';
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

const FlagBox = ({ flags, setFlags, onChange }) => {
  const toggleFlag = flag => {
    if (flags?.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags((flags || '') + flag);
    }
    onChange?.(true);
  };

  const handleFlagKey = e => {
    if (!e.altKey) return;

    const key = e.key.toLowerCase();

    switch (key) {
      case 'g':
      case 'm':
      case 'i':
        e.preventDefault();
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
            type="checkbox"
            checked={!!flags?.includes(code)}
            onChange={() => toggleFlag(code)}
          >
            <div className={styles.FlagBoxItem}>
              <span
                id={`flag-${name}`}
                dangerouslySetInnerHTML={{
                  __html: tagWrapper({
                    value: name,
                    regex,
                    attributes: { class: styles.FlagBoxItemHighlight },
                  }),
                }}
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
