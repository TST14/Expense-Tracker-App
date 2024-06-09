import React from "react";
import styles from "./ExpenseTrackerModal.module.css";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");
function ExpenseTrackerModal({ id, isOpen, children }) {
  return (
    <ReactModal
      id={id}
      isOpen={isOpen}
      className={styles["main-container"]}
      overlayClassName={styles.overlay}
      close
    >
      {children}
    </ReactModal>
  );
}

export default ExpenseTrackerModal;
