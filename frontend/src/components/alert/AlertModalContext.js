import React, { createContext, useContext, useState } from "react";
import AlertModal from "./AlertModal";

// Create context
const AlertModalContext = createContext();

// Custom hook to use the context
export const useAlertModal = () => {
  return useContext(AlertModalContext);
};

export const AlertModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});
  const [isDanger, setIsDanger] = useState(false);
  const [textCancel, setTextCancel] = useState("Cancel");
  const [textConfirm, setTextConfirm] = useState("Confirm");


  const showModal = (message, onConfirmCallback, onCancelCallback, isDanger = false, textCancel = "Cancel", textConfirm = "Confirm") => {
    setMessage(message);
    setOnConfirm(() => onConfirmCallback);
    setOnCancel(() => onCancelCallback);
    setIsOpen(true);
    setIsDanger(isDanger);
    setTextCancel(textCancel);
    setTextConfirm(textConfirm);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  return (
    <AlertModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {isOpen && (
        <AlertModal
          message={message}
          onConfirm={() => {
            onConfirm();
            hideModal();
          }}
          onCancel={() => {
            onCancel();
            hideModal();
          }}
          isDanger={isDanger}
          textCancel={textCancel}
          textConfirm={textConfirm}
        />
      )}
    </AlertModalContext.Provider>
  );
};
