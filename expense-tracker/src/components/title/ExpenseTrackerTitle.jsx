import React from "react";
import styles from "./ExpenseTrackerTitle.module.css";

function ExpenseTrackerTitle({ title, style }) {
  return (
    <div>
      <h1 className={styles["txt-title"]} style={style}>
        {title}
      </h1>
    </div>
  );
}

export default ExpenseTrackerTitle;
