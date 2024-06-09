import "./Dashboard.css";
import ExpenseTrackerTitle from "../../components/title/ExpenseTrackerTitle";
import ExpenseTrackerBalanceCard from "../../components/balance-card/ExpenseTrackerBalanceCard";
import ExpenseTrackerCard from "../../components/card/ExpenseTrackerCard";
import ExpenseTrackerChart from "../../components/chart/ExpenseTrackerChart";
import ExpenseTrackerProgress from "../../components/progress/ExpenseTrackerProgress";
import ExpenseTrackerTransaction from "../../components/transaction/ExpenseTrackerTransaction";
import ExpenseTrackerButton from "../../components/button/ExpenseTrackerButton";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import ExpenseTrackerModal from "../../components/modals/modal/ExpenseTrackerModal";
import ExpenseTrackerModalBalance from "../../components/modals/balance/ExpenseTrackerModalBalance";
import { useContext, useEffect, useState } from "react";
import ExpenseTrackerModalExpense from "../../components/modals/expense/ExpenseTrackerModalExpense";
import { useSnackbar } from "notistack";
import GlobalContext from "../../contexts/GlobalContext";

const secondaryTitleStyle = {
  fontStyle: "italic",
  fontSize: "1.75rem",
};

const paginationBtnStyle = {
  padding: 0,
  width: "2rem",
  height: "2rem",
  backgroundColor: "var(--color-smoke-grey)",
  boxShadow: "0px 4px 4px 0px #00000040",
  borderRadius: "0.8rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--color-black-alt)",
};

function Dashboard() {
  const globalContext = useContext(GlobalContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isBalanceModalOpened, setBalanceModalOpenState] = useState(false);
  const [isExpenseModalOpened, setExpenseModalOpenState] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);

  const [paginationData, setPaginationData] = useState({
    current: 0,
    expensePerPage: 3,
  });

  const generateCurrentPageExpenses = () => {
    setExpenses(() => [
      ...[...globalContext.expenses]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .splice(
          paginationData.current * paginationData.expensePerPage,
          paginationData.expensePerPage
        ),
    ]);
  };

  const handleNavigation = (moveTo) => {
    setPaginationData((prev) => ({ ...prev, current: prev.current + moveTo }));
  };

  const extractExpenseCategory = (id) => {
    return globalContext.categoryData.find((cat) => cat.id === parseInt(id));
  };
  const handleExpAction = (expense, type) => {
    switch (type) {
      case "EDIT":
        setEditExpense(expense);
        break;
      case "DELETE":
        try {
          globalContext.deleteExpense(expense.id);
          enqueueSnackbar(`Expense Deleted`, {
            variant: "success",
          });
        } catch (error) {
          enqueueSnackbar(error, {
            variant: "error",
          });
        }
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    generateCurrentPageExpenses();
  }, [paginationData, globalContext.expenses]);

  return (
    <section className="main-container">
      <ExpenseTrackerTitle title="Expense Tracker" />
      <ExpenseTrackerCard
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <section className="statistics-container">
          <section className="balance-card-container">
            <ExpenseTrackerBalanceCard
              title="Wallet Balance"
              amount={globalContext.balance}
              amountColor="var(--color-bright-green)"
              btnBg="linear-gradient(90deg, var(--color-yellow-green) 0%, var(--color-bright-green) 100%)"
              btnTitle="+ Add Income"
              btnClick={() => setBalanceModalOpenState(true)}
            />
            <ExpenseTrackerBalanceCard
              title="Expenses"
              amount={globalContext.totalExpense}
              amountColor="var(--color-button-bg)"
              btnBg="linear-gradient(90deg, var(--color-light-red) 0%, var(--color-bright-red) 80%, var(--color-red) 100%)"
              btnTitle="+ Add Expense"
              btnClick={() => setExpenseModalOpenState(true)}
            />
          </section>
          <section className="chart-container">
            <ExpenseTrackerChart
              ratio={Object.values(globalContext.expenseRatio)}
            />
          </section>
        </section>
      </ExpenseTrackerCard>
      <section className="bottom-container">
        <section className="txn-container">
          <ExpenseTrackerTitle
            title="Recent Transactions"
            style={secondaryTitleStyle}
          />
          <ExpenseTrackerCard style={{ padding: "1rem", paddingBottom: 0 }}>
            <section className="txn-body">
              {expenses.map((expense) => (
                <ExpenseTrackerTransaction
                  key={expense.id}
                  CatLogo={extractExpenseCategory(expense.categoryId).logo}
                  title={expense.title}
                  date={new Date(expense.date)}
                  amount={expense.amount}
                  handleAction={(type) => {
                    handleExpAction(expense, type);
                  }}
                />
              ))}
            </section>
            <footer className="txn-footer">
              <ExpenseTrackerButton
                disabled={paginationData.current === 0}
                style={paginationBtnStyle}
                onClick={() => handleNavigation(-1)}
              >
                <LiaLongArrowAltLeftSolid />
              </ExpenseTrackerButton>
              <span className="page-count">{paginationData.current + 1}</span>
              <ExpenseTrackerButton
                disabled={
                  paginationData.current ===
                  Math.ceil(
                    globalContext.expenses.length /
                      paginationData.expensePerPage
                  ) -
                    1
                }
                style={paginationBtnStyle}
                onClick={() => handleNavigation(1)}
              >
                <LiaLongArrowAltRightSolid />
              </ExpenseTrackerButton>
            </footer>
          </ExpenseTrackerCard>
        </section>
        <section className="progress-container">
          <ExpenseTrackerTitle
            title="Top Expenses"
            style={secondaryTitleStyle}
          />
          <ExpenseTrackerCard>
            <section className="expense-container">
              <ExpenseTrackerProgress
                title="Entertainment"
                progress={globalContext.expenseRatio.entertainment.value}
              />
              <ExpenseTrackerProgress
                title="Food"
                progress={globalContext.expenseRatio.food.value}
              />
              <ExpenseTrackerProgress
                title="Travel"
                progress={globalContext.expenseRatio.travel.value}
              />
            </section>
          </ExpenseTrackerCard>
        </section>
      </section>
      <ExpenseTrackerModal id="BalanceModal" isOpen={isBalanceModalOpened}>
        <ExpenseTrackerModalBalance
          handleClose={() => setBalanceModalOpenState(false)}
        />
      </ExpenseTrackerModal>
      <ExpenseTrackerModal
        id="ExpenseModal"
        isOpen={isExpenseModalOpened || editExpense ? true : false}
      >
        <ExpenseTrackerModalExpense
          handleClose={() =>
            editExpense ? setEditExpense(null) : setExpenseModalOpenState(false)
          }
          asEdit={editExpense}
        />
      </ExpenseTrackerModal>
    </section>
  );
}

export default Dashboard;
