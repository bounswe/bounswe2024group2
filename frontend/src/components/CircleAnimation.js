import React from "react";
import "../styles/CircleAnimation.css";

const CircleAnimation = ({ relative = false }) => {
  return (
    <div className={`spinner-container ${relative ? "spinner-container-relative" : ""}`}>
      <div className={relative ? "spinner-relative" : "spinner"}></div>
    </div>
  );
};

export default CircleAnimation;
