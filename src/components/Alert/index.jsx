import "./alert.scss";

import { useState } from "react";
import lookie from "lookie";

import Icon from "@components/Icon";

const Alert = ({ children, ...props }) => {
  const visible = lookie.get("devAlertStatus") !== "hidden";
  const [isVisible, setVisible] = useState(visible);

  const handleClose = () => {
    setVisible(false);
    lookie.set("devAlertStatus", "hidden", "1h");
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
