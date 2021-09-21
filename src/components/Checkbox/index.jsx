import "./checkbox.scss";

const Checkbox = ({ children, ...props }) => {
  return (
    <label className="checkbox">
      <input className="checkbox-item" type="checkbox" {...props} />
      <span className="checkmark" />
      {children}
    </label>
  );
};

export default Checkbox;
