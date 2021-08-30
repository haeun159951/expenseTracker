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
  delete_expense,
  edit_expense,
} from '../../service/expense';
import UpdateTransactionForm from '../../components/update-transaction/update-transaction';
const Index = () => {
  const [transactions, setTransactions] = useState([] as Expense[]);
  const [error, setError] = useState('');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

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

  const handle_delete_expense = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await delete_expense(token as string, id);
      const updatedTransactions = transactions.filter((t) => {
        if (t._id !== id) {
          return t;
        }
      });
      setTransactions(updatedTransactions);
    } catch (exception) {
      const message = exception?.data?.message;
      if (message) {
        setError(message);
      } else {
        setError('server error');
      }
    }
  };

  const select_expense = (id: string, name: string, amount: number) => {
    setId(id);
    setName(name);
    setAmount(amount);
  };

  const cancel_expense = (id: string, name: string, amount: number) => {
    setId('');
    setName('');
    setAmount(0);
  };
  const handle_update_expense = async (name?: string, amount?: number) => {
    try {
      const token = localStorage.getItem('token');
      await edit_expense(token as string, id, name, amount);
      const result = transactions.map((t) => {
        if (t._id === id) {
          if (name) t.name = name;
          if (amount) t.amount = amount;
        }
        return t;
      });
      setTransactions(result);
    } catch (exception) {
      console.log(exception);

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
        <ExpenseHistory
          handleDelete={handle_delete_expense}
          transactions={transactions}
          selectExpense={select_expense}
        />
        {id ? (
          <UpdateTransactionForm
            dname={name}
            damount={amount}
            handleSubmit={handle_update_expense}
            cancelUpdate={cancel_expense}
          />
        ) : (
          <TransactionForm handleSubmit={handle_new_expense} />
        )}
      </div>
    </div>
  );
};

export default Index;
