import "./alert.scss";

import { useState } from "react";

import Icon from "@components/Icon";

const Alert = ({ visible, children, ...props }) => {
  const [isVisible, setVisible] = useState(visible);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    isVisible && (
      <div className="alert" {...props}>
        <div className="alert-conten-item">{children}</div>
        <div
          className="alert-close-item"
          role="button"
          tabIndex="0"
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <Icon icon="close" size={10} color="#c4d9cb" />
        </div>
      </div>
    )
  );
};

export default Alert;
