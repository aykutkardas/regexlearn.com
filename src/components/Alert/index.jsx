import { useState } from "react";
import Icon from "../Icon";
import "./alert.scss";

const Alert = ({ visible, children, ...props }) => {
  const [isVisible, setVisible] = useState(visible);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="alert" {...props}>
          <div className="alert-conten-item">{children}</div>
          <div className="alert-close-item" onClick={handleClose}>
            <Icon icon="close" size={10} color="#c4d9cb" />
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
