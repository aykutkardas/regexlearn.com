import { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import cx from "classnames";

import * as styles from "./CheatsheetDemo.module.css";

import Icon from "../Icon";

import tagWrapper from "../../utils/tagWrapper";

function CheatsheetDemo({ data }) {
  const [regex] = useState(data.regex || "");
  const [highlight, setHighlight] = useState(true);
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
          tagWrapper(initialContent, reg, "landing-regex-demo-result-tag")
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
          __html: !highlight ? initialContent : (content || initialContent).replace(/\\n/gm, "<br />"),
        }}
      />
      <div
        className={cx(styles.CheatsheetDemoBlock, styles.CheatsheetDemoBlockRegex)}
        data-title={formatMessage({ id: "general.regex" })}
      >
        <span className={styles.CheatsheetDemoHiglightText} data-flags={data.flags}>{regex}</span>
        <Icon
          icon={highlight ? "eye" : "eye-blocked"}
          style={{ color: highlight ? "var(--learn-white)" : "var(--learn-gray)"}}
          className={styles.CheatsheetDemoBlockRegexIcon}
          size={15}
          onClick={() => setHighlight(!highlight)}
        />
      </div>
    </div>
  );
}

export default CheatsheetDemo;
