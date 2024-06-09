import React from "react";
import styles from "./ExpenseTrackerProgress.module.css";

function ExpenseTrackerProgress({ title, progress }) {
  return (
    <div className={styles["expense"]}>
      <span className={styles["label"]}>{title}</span>
      <div className={styles["progress-bar"]}>
        <div
          className={styles["progress"]}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ExpenseTrackerProgress;
