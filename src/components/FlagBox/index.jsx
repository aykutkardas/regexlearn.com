import "./flag-box.scss";
import Checkbox from "../Checkbox";

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
      {flagList.map((flag) => (
        <Checkbox
          key={flag.name}
          id={"flag-" + flag.name}
          flag={flag.code}
          type="checkbox"
          checked={!!flags?.includes(flag.code)}
          onChange={handleClick}
        >
          <label className="flag-box-item" htmlFor={"flag-" + flag.name}>
            <span
              dangerouslySetInnerHTML={{
                __html: flag.name.replace(
                  flag.regex,
                  "<span class='flag-box-item-highlight'>$1</span>"
                ),
              }}
            />
          </label>
        </Checkbox>
      ))}
    </div>
  );
};

export default FlagBox;
