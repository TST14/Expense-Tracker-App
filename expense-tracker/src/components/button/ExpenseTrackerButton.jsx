import React from "react";
import styles from "./ExpenseTrackerButton.module.css";

function ExpenseTrackerButton({ style, children, ...attributes }) {
  return (
    <button {...attributes} className={styles.btn} style={style}>
      {children}
    </button>
  );
}

export default ExpenseTrackerButton;
