import "./checkbox.scss";

const Checkbox = ({ ...props }) => {
  return (
      <label className="checkbox" {...props }>
        <input className="checkbox-item" type="checkbox" />
        <span className="checkmark" />
      </label>
  );
};

export default Checkbox;
