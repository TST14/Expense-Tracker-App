import React from "react";
import styles from "./ExpenseTrackerCard.module.css";

function ExpenseTrackerCard({ style, children }) {
  return (
    <section className={styles["card-container"]} style={style}>
      {children}
    </section>
  );
}

export default ExpenseTrackerCard;
