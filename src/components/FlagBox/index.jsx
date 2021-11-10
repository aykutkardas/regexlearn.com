import { useCallback, useEffect, useMemo } from "react";

import Checkbox from "../Checkbox";
import Shortcut from "../Shortcut";

import Mousetrap from "../../utils/mousetrap";
import tagWrapper from "../../utils/tagWrapper";
import shortcuts from "../../shortcuts";

const FlagBox = ({ flags, setFlags, onChange }) => {
  const flagList = useMemo(
    () => [
      {
        name: "global",
        code: "g",
        command: shortcuts.flagGlobal,
        regex: /(g)/,
      },
      {
        name: "multiline",
        code: "m",
        command: shortcuts.flagMultiline,
        regex: /(m)/,
      },
      {
        name: "case insensitive",
        code: "i",
        command: shortcuts.flagCaseInsenstive,
        regex: /(i)/,
      },
    ],
    []
  );

  const toggleFlag = useCallback(
    (flag) => {
      if (flags?.includes(flag)) {
        setFlags(flags.replace(flag, ""));
      } else {
        setFlags((flags || "") + flag);
      }
      onChange(true);
    },
    [flags, setFlags, onChange]
  );

  const handleClick = ({ target }) => {
    const flag = target.getAttribute("flag");
    toggleFlag(flag);
  };

  useEffect(() => {
    flagList.forEach((flag) => {
      Mousetrap.bindGlobal(flag.command, (e) => {
        e.preventDefault();

        toggleFlag(flag.code);
      });
    });

    return () => {
      flagList.forEach((flag) => {
        Mousetrap.unbind(flag.code);
      });
    };
  }, [flagList, toggleFlag]);

  return (
    <div className="flag-box">
      {flagList.map(({ name, code, command, regex }) => (
        <Checkbox
          key={name}
          id={`flag-${name}`}
          flag={code}
          type="checkbox"
          checked={!!flags?.includes(code)}
          onChange={handleClick}
        >
          <div className="flag-box-item">
            <span
              id={`flag-${name}`}
              dangerouslySetInnerHTML={{
                __html: tagWrapper(name, regex, "flag-box-item-highlight"),
              }}
            />
            <Shortcut command={command} />
          </div>
        </Checkbox>
      ))}
    </div>
  );
};

export default FlagBox;
