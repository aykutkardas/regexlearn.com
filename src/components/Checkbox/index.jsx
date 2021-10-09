import "./checkbox.scss";

const Checkbox = ({ children, ...props }) => (
  <label className="checkbox" htmlFor={props.id}>
    <input className="checkbox-item" type="checkbox" {...props} />
    <span className="checkmark" />
    {children}
  </label>
);

export default Checkbox;
