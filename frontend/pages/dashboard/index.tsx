import React, { SyntheticEvent, useEffect, useState } from 'react';
import ExpenseSummary from '../../components/expense-summary/expense-summary';
import Transaction from '../../components/transaction/transaction';
import ExpenseHistory from '../../components/expense-history/expense-history';
import styles from './style.module.css';
import TransactionForm from '../../components/transaction-form/transaction-form';
import Header from '../../components/header/header';
import { Router, useRouter } from 'next/dist/client/router';
import {
  create_expense,
  Expense,
  retrieve_all_expenses,
} from '../../service/expense';
const Index = () => {
  const [transactions, setTransactions] = useState([] as Expense[]);
  const [error, setError] = useState('');

  const router = useRouter();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/sign-in');
      }
      try {
        const response = await retrieve_all_expenses(token as string);
        setTransactions(response.expenses);
      } catch (exception) {
        console.log(exception);
        const message = exception?.data?.message;

        if (message) {
          setError(message);
        } else {
          setError('server error');
        }
      }
    })();
  }, []);

  const handle_new_expense = async (name: string, amount: number) => {
    try {
      const token = localStorage.getItem('token');
      const transaction = await create_expense(token as string, name, amount);
      setTransactions([transaction, ...transactions]);
    } catch (exception) {
      const message = exception?.data?.message;
      if (message) {
        setError(message);
      } else {
        setError('server error');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Header />
        <ExpenseSummary transactions={transactions} />
        <ExpenseHistory transactions={transactions} />
        <TransactionForm handleSubmit={handle_new_expense} />
      </div>
    </div>
  );
};

export default Index;
