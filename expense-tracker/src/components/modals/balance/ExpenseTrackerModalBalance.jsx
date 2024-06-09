import React, { useContext, useState } from "react";
import styles from "./ExpenseTrackerModalBalance.module.css";
import ExpenseTrackerCard from "../../card/ExpenseTrackerCard";
import ExpenseTrackerTitle from "../../title/ExpenseTrackerTitle";
import ExpenseTrackerInput from "../../input/ExpenseTrackerInput";
import ExpenseTrackerButton from "../../button/ExpenseTrackerButton";
import { useSnackbar } from "notistack";
import GlobalContext from "../../../contexts/GlobalContext";

function ExpenseTrackerModalBalance({ handleClose }) {
  const [balance, setBalance] = useState("");
  const globalContext = useContext(GlobalContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      globalContext.updateWallet(balance);
      enqueueSnackbar(`Balance added`, {
        variant: "success",
      });
      handleClose();
      setBalance("");
    } catch (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
    }
  };
  return (
    <ExpenseTrackerCard style={{ overflow: "hidden" }}>
      <section className={styles["main-container"]}>
        <ExpenseTrackerTitle
          title="Add Balance"
          style={{
            color: "var(--color-black)",
            fontSize: "1.9rem",
            marginBottom: "0.7rem",
          }}
        />
        <form onSubmit={handleSubmit} className={styles["form-container"]}>
          <ExpenseTrackerInput
            type="number"
            placeholder="Income Amount"
            min={0}
            required
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
          <ExpenseTrackerButton
            type="submit"
            style={{
              fontFamily: "var(--font-open-sans)",
              boxShadow: "0px 4px 4px 0px #00000040",
              paddingInline: "1rem",
              marginInline: "1rem",
            }}
          >
            Add Balance
          </ExpenseTrackerButton>
          <ExpenseTrackerButton
            style={{
              fontFamily: "var(--font-open-sans)",
              boxShadow: "0px 4px 4px 0px #00000040",
              paddingInline: "1.5rem",
              backgroundColor: "var(--color-btn-grey-bg)",
              color: "var(--color-black)",
              fontWeight: 400,
            }}
            onClick={handleClose}
          >
            Cancel
          </ExpenseTrackerButton>
        </form>
      </section>
    </ExpenseTrackerCard>
  );
}

export default ExpenseTrackerModalBalance;
