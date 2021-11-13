import * as styles from "./Shortcut.module.css";
import useOS from "src/utils/useOS";

const Shortcut = ({ command }) => {
  const { isMacOS, isDesktop } = useOS();

  if (!isDesktop) return null;

  const readableCommand = command
    .replace(/\+/g, " + ")
    .replace(/alt/g, isMacOS ? "option" : "alt")
    .toUpperCase();

  return <div className={styles.shortcut}>{readableCommand}</div>;
};

export default Shortcut;
