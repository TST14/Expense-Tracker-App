import React from "react";
import styles from "./ExpenseTrackerInput.module.css";

function ExpenseTrackerInput({ style, ...attrs }) {
  return <input {...attrs} className={styles["form-field"]} style={style} />;
}

export default ExpenseTrackerInput;
