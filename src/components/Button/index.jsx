import "./button.scss";

const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
