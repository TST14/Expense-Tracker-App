import React from "react";
import styles from "./ExpenseTrackerSelect.module.css";

function ExpenseTrackerSelect({ style, children, ...attrs }) {
  return (
    <select {...attrs} className={styles["form-field"]} style={style}>
      {children}
    </select>
  );
}

export default ExpenseTrackerSelect;
