import * as styles from "./Shortcut.module.css";
import useOS from "src/utils/useOS";

const Shortcut = ({ command }) => {
  const { isDesktop } = useOS();

  if (!isDesktop) return null;

  const readableCommand = command
    .replace(/\+/g, " + ")
    .replace(/right/g, ">")
    .replace(/left/g, "<")
    .toUpperCase();

  return <div className={styles.shortcut}>{readableCommand}</div>;
};

export default Shortcut;
