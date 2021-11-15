import { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import cx from "classnames";

import * as styles from "./CheatsheetDemo.module.css";

import tagWrapper from "../../utils/tagWrapper";

function CheatsheetDemo({ data }) {
  const [regex] = useState(data.regex || "");
  const [content, setContent] = useState(null);
  const { formatMessage } = useIntl();
  const initialContent = data.content;

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
          tagWrapper(initialContent, reg, styles.CheatsheetDemoResultTag)
        );
      } else {
        setContent(initialContent);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(checkRegex, []);

  return (
    <div className={styles.CheatsheetDemo}>
      <div
        className={cx(styles.CheatsheetDemoBlock, styles.CheatsheetDemoBlockContent)}
        data-title={formatMessage({ id: "general.text" })}
        dangerouslySetInnerHTML={{
          __html: (content || initialContent).replace(/\\n/gm, "<br />"),
        }}
      />
      <div
        className={cx(styles.CheatsheetDemoBlock, styles.CheatsheetDemoBlockRegex)}
        data-title={formatMessage({ id: "general.regex" })}
      >
        <span className={styles.CheatsheetDemoHiglightText} data-flags={data.flags}>{regex}</span>
      </div>
    </div>
  );
}

export default CheatsheetDemo;
