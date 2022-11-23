import React from "react";

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div className={`toast show position-fixed text-light ${bgColor}`} style={{ top: "5px", right: "5px", minWidth: "200px", zIndex: 50 }}>
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="me-auto  text-light">{msg}</strong>
        <button
          className="ml-2 mb-1 btn-close text-light"
          aria-label="close"
          data-disimiss="toast"
          style={{ outline: "none" }}
          onClick={handleShow}
        ></button>
      </div>
    </div>
  );
};

export default Toast;
