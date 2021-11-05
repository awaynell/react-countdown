import React from "react";
import "../styles/App.css";

const ErrorWindow = ({ error, style }) => {
  return (
    <div className="errorInfo" style={style}>
      {error}
    </div>
  );
};

export default ErrorWindow;
