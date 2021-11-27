import * as styles from './Checkbox.module.css';

const Checkbox = ({ children, ...props }) => (
  <label className={styles.Checkbox} htmlFor={props.id}>
    <input className={styles.CheckboxInput} type="checkbox" {...props} />
    <span className={styles.CheckboxCheck} />
    <span className={styles.CheckboxText}>{children}</span>
  </label>
);

export default Checkbox;
