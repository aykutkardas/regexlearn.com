import { useState } from "react";

import CheatsheetDemo from "../CheatsheetDemo";
import Icon from "../Icon";

import * as styles from "./Collapse.module.css";

function Collapse({ title, data }) {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  }

  return (
    <div className={styles.Collapse}>
        <div className={styles.CollapseTitle} onClick={toggle}>
            {title}
            <Icon
              className={styles.CollapseTitleIcon}
              icon={show ? "arrow-up" : "arrow-down"}
              style={{ color: show ? "var(--learn-white)" : "var(--learn-gray)"}}
              size={12}
            />
        </div>
        <div style={{ height: show ? 150 : 0}} className={styles.CollapseContent}>
            <div className={styles.CollapseContentInner}>
              <CheatsheetDemo data={data} />
            </div>
        </div>
    </div>
  );
}

export default Collapse;
