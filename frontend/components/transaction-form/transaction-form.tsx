import React, { useState } from 'react';
import ExpenseInputField from '../expense-input-field/expense-input-field';

import styles from './style.module.css';

interface ParameterType {
  handleSubmit: any;
}
const TransactionForm = ({ handleSubmit }: ParameterType) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);

  return (
    <form className={styles.container}>
      <p> add new transaction</p>
      <div className={styles.line}></div>
      <ExpenseInputField id='name' label='name' type='text' setter={setName} />
      <ExpenseInputField
        id='amount'
        label='amount'
        type='text'
        setter={setAmount}
      />
      <button
        onClick={(event) => {
          event.preventDefault();
          handleSubmit(name, amount);
        }}
      >
        save transaction
      </button>
    </form>
  );
};

export default TransactionForm;
