const Checkbox = ({ children, ...props }) => (
  <label className="checkbox" htmlFor={props.id}>
    <input type="checkbox" {...props} />
    <span className="checkbox-check" />
    <span className="checkbox-text">{children}</span>
  </label>
);

export default Checkbox;
