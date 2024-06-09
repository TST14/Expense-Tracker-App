import React, { useContext, useState } from "react";
import ExpenseTrackerCard from "../../card/ExpenseTrackerCard";
import ExpenseTrackerTitle from "../../title/ExpenseTrackerTitle";
import styles from "./ExpenseTrackerModalExpense.module.css";
import ExpenseTrackerInput from "../../input/ExpenseTrackerInput";
import ExpenseTrackerButton from "../../button/ExpenseTrackerButton";
import ExpenseTrackerSelect from "../../select/ExpenseTrackerSelect";
import GlobalContext from "../../../contexts/GlobalContext";
import { useSnackbar } from "notistack";

function ExpenseTrackerModalExpense({ handleClose, asEdit }) {
  const globalContext = useContext(GlobalContext);
  const { enqueueSnackbar } = useSnackbar();
  const { categoryData } = useContext(GlobalContext);
  const [formData, setFormData] = useState(
    asEdit ?? {
      title: "",
      amount: "",
      categoryId: -1,
      date: "",
    }
  );

  const clearForm = () => {
    setFormData({
      title: "",
      amount: 0,
      categoryId: -1,
      date: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      asEdit
        ? globalContext.updateExpense({ ...asEdit, ...formData })
        : globalContext.addExpense(
            formData.title,
            formData.categoryId,
            formData.amount,
            formData.date
          );
      enqueueSnackbar(`Expense ${asEdit ? "Updated" : "Added"}`, {
        variant: "success",
      });
      handleClose();
      clearForm();
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
          title={`${asEdit ? "Edit" : "Add"} Expenses`}
          style={{
            color: "var(--color-black)",
            fontSize: "1.9rem",
            marginBottom: "0.7rem",
          }}
        />
        <form onSubmit={handleSubmit} className={styles["form-container"]}>
          <ExpenseTrackerInput
            style={{ marginBottom: "1.3rem" }}
            type="text"
            placeholder="Title"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <ExpenseTrackerInput
            style={{ marginBottom: "1.3rem" }}
            type="number"
            placeholder="Price"
            min={0}
            required
            value={formData.amount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, amount: e.target.value }))
            }
          />
          <ExpenseTrackerSelect
            style={{ marginBottom: "1.3rem" }}
            placeholder="Select Category"
            required
            value={formData.categoryId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, categoryId: e.target.value }))
            }
          >
            <option value={-1} disabled>
              Select Category
            </option>
            {categoryData.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </ExpenseTrackerSelect>
          <ExpenseTrackerInput
            style={{ marginBottom: "1.3rem" }}
            type="date"
            min={0}
            required
            value={formData.date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date: e.target.value }))
            }
          />
          <ExpenseTrackerButton
            type="submit"
            style={{
              fontFamily: "var(--font-open-sans)",
              boxShadow: "0px 4px 4px 0px #00000040",
              paddingInline: "1rem",
            }}
          >
            {`${asEdit ? "Edit" : "Add"} Expenses`}
          </ExpenseTrackerButton>
          <section>
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
          </section>
        </form>
      </section>
    </ExpenseTrackerCard>
  );
}

export default ExpenseTrackerModalExpense;
