import { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";

import tagWrapper from "../../utils/tagWrapper";

function LandingRegexDemo() {
  const [regex, setRegex] = useState("\\d\\.\\s\\w+");
  const [flags] = useState("gmi");
  const [content, setContent] = useState(null);
  const regexInput = useRef(null);
  const { formatMessage } = useIntl();
  const initialContent = "1. Learn  2. Practice  3. Test   4. Share";

  const checkRegex = () => {
    try {
      let $regex = regex;
      [...$regex.matchAll(/\\(\d+)/g)].forEach((item) => {
        $regex = $regex.replace(
          `\\${item[1]}`,
          `\\${parseInt(item[1], 10) + 1}`
        );
      });

      const reg = new RegExp(`(${$regex})`, "gmi");

      if (regex) {
        setContent(
          tagWrapper(initialContent, reg, "landing-regex-demo-result-tag")
        );
      } else {
        setContent(initialContent);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const focusInput = () => {
    if (regexInput) {
      regexInput.current.focus();
    }
  };

  useEffect(focusInput, []);
  useEffect(checkRegex, [regex, initialContent]);

  return (
    <div className="landing-regex-demo">
      <div
        className="landing-regex-demo-block landing-regex-demo-block-content"
        data-title={formatMessage({ id: "general.text" })}
        dangerouslySetInnerHTML={{
          __html: (content || initialContent).replace(/\n/gm, "<br />"),
        }}
      />
      <div
        className="landing-regex-demo-block landing-regex-demo-block-regex"
        data-title={formatMessage({ id: "general.regex" })}
      >
        <div className="landing-regex-demo-input" data-flags={flags}>
          <input
            ref={regexInput}
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder={formatMessage({ id: "general.regex" }).toLowerCase()}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingRegexDemo;
