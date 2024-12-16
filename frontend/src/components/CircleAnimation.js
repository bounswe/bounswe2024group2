import React from "react";
import "../styles/CircleAnimation.css";

const CircleAnimation = ({ relative = false }) => {
  return (
    <div data-testid="spinner-container" className={`spinner-container ${relative ? "spinner-container-relative" : ""}`}>
      <div data-testid="spinner" className={relative ? "spinner-relative" : "spinner"}></div>
    </div>
  );
};

export default CircleAnimation;
