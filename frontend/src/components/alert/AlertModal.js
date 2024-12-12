import React, { useEffect } from "react";
import "../../styles/AlertModal.css";

const AlertModal = ({ message, onConfirm, onCancel, isDanger, textCancel = "Cancel", textConfirm = "Confirm" }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <h2>{message}</h2>
        <div className="custom-modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            {textCancel}
          </button>
          <button className={isDanger ? "danger-btn" : "confirm-btn"} onClick={onConfirm}>
            {textConfirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;