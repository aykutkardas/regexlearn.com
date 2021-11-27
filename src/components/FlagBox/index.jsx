import { useCallback, useEffect, useMemo } from 'react';

import * as styles from './FlagBox.module.css';

import Checkbox from '../Checkbox';
import Shortcut from '../Shortcut';

import Mousetrap from 'src/utils/mousetrap';
import tagWrapper from 'src/utils/tagWrapper';
import shortcuts from 'src/shortcuts';

const FlagBox = ({ flags, setFlags, onChange }) => {
  const toggleFlag = useCallback(
    flag => {
      if (flags?.includes(flag)) {
        setFlags(flags.replace(flag, ''));
      } else {
        setFlags((flags || '') + flag);
      }
      onChange(true);
    },
    [flags, setFlags, onChange],
  );

  const handleClick = ({ target }) => {
    const flag = target.getAttribute('flag');
    toggleFlag(flag);
  };

  const flagList = useMemo(
    () => [
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
    ],
    [],
  );

  useEffect(() => {
    flagList.forEach(flag => {
      Mousetrap.bindGlobal(flag.command, e => {
        e.preventDefault();

        toggleFlag(flag.code);
      });
    });

    return () => {
      flagList.forEach(flag => {
        Mousetrap.unbind(flag.code);
      });
    };
  }, [flagList, toggleFlag]);

  const style = {};

  return (
    <div className={styles.FlagBox}>
      {flagList.map(({ name, code, command, regex }) => (
        <div className={styles.FlagBoxItemWrapper} key={name}>
          <Checkbox
            id={`flag-${name}`}
            flag={code}
            type="checkbox"
            checked={!!flags?.includes(code)}
            onChange={handleClick}
          >
            <div className={styles.FlagBoxItem}>
              <span
                id={`flag-${name}`}
                dangerouslySetInnerHTML={{
                  __html: tagWrapper(name, regex, styles.FlagBoxItemHighlight),
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
