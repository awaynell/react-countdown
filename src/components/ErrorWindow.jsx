import React from "react";
import "../styles/App.css";

const ErrorWindow = ({ error }) => {
  return <div className="errorInfo">{error}</div>;
};

export default ErrorWindow;
