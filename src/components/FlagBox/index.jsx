import "./flag-box.scss";

import Checkbox from "../Checkbox";
import tagWrapper from "../../utils/tagWrapper";

const FlagBox = ({ flags, setFlags }) => {
  const flagList = [
    {
      name: "global",
      code: "g",
      regex: /(g)/,
    },
    {
      name: "multiline",
      code: "m",
      regex: /(m)/,
    },
    {
      name: "case insensitive",
      code: "i",
      regex: /(i)/,
    },
  ];

  const handleClick = ({ target }) => {
    const flag = target.getAttribute("flag");
    if (flags?.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags((flags || "") + flag);
    }
  };

  return (
    <div className="flag-box">
      {flagList.map(({ name, code, regex }) => (
        <Checkbox
          key={name}
          id={"flag-" + name}
          flag={code}
          type="checkbox"
          checked={!!flags?.includes(code)}
          onChange={handleClick}
        >
          <label className="flag-box-item" htmlFor={"flag-" + name}>
            <span
              dangerouslySetInnerHTML={{
                __html: tagWrapper(name, regex, "flag-box-item-highlight"),
              }}
            />
          </label>
        </Checkbox>
      ))}
    </div>
  );
};

export default FlagBox;
