import React from "react";
import styles from "./ExpenseTrackerBalanceCard.module.css";
import ExpenseTrackerCard from "../card/ExpenseTrackerCard";
import ExpenseTrackerButton from "../button/ExpenseTrackerButton";

function ExpenseTrackerBalanceCard({
  title,
  amount,
  amountColor,
  btnTitle,
  btnClick,
  btnBg,
}) {
  return (
    <ExpenseTrackerCard
      style={{
        backgroundColor: "var(--color-card-bg)",
      }}
    >
      <section className={styles["main-container"]}>
        <div className={styles["text-container"]}>
          <span>{title}: </span>
          <span className={styles.balance} style={{ color: amountColor }}>
            ₹{amount}
          </span>
        </div>
        <ExpenseTrackerButton
          style={{
            background: btnBg,
          }}
          onClick={btnClick}
        >
          {btnTitle}
        </ExpenseTrackerButton>
      </section>
    </ExpenseTrackerCard>
  );
}

export default ExpenseTrackerBalanceCard;
