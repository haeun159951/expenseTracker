import { useEffect, useState } from 'react';
import { Expense } from '../../service/expense';
import styles from './style.module.css';

interface ParameterType {
  transactions: Expense[];
}

const ExpenseSummary = ({ transactions }: ParameterType) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  console.log(transactions);
  useEffect(() => {
    let value = 0;
    transactions.forEach((transaction) => {
      if (transaction.amount > 0) {
        value += transaction.amount;
      }
    });
    setIncome(value);
    value = 0;
    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        value += transaction.amount;
      }
    });
    setExpense(value);
  }, [transactions]);

  return (
    <div className={styles.container}>
      <div className={styles.balance}>
        <p>Your Balance</p>
        <p>${income + expense}</p>
      </div>
      <div className={styles.summary}>
        <div className={styles.income}>
          <p>income</p>
          <p>${income}</p>
        </div>
        <div className={styles.expense}>
          <p>expense</p>
          <p>${expense}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
