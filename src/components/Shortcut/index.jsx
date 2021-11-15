import * as styles from "./Shortcut.module.css";
import cx from "classnames";

import useOS from "src/utils/useOS";

const Shortcut = ({ command }) => {
  const { isMacOS, isDesktop } = useOS();

  if (!isDesktop) return null;

  const readableCommand = command
    .replace(/\+/g, " + ")
    .replace(/alt/g, isMacOS ? "option" : "alt")
    .toUpperCase();

  return (
    <div
      role="button"
      className={cx(styles.Shortcut, "visible-md visible-lg")}
    >
      {readableCommand}
    </div>
  );
};

export default Shortcut;
