import React, { useState } from 'react';
import { Expense } from '../../service/expense';
import ExpenseInputField from '../expense-input-field/expense-input-field';

import styles from './style.module.css';

interface ParameterType {
  handleSubmit: any;
  dname: string;
  damount: number;
  cancelUpdate: any;
}
const UpdateTransactionForm = ({
  dname,
  damount,
  handleSubmit,
  cancelUpdate,
}: ParameterType) => {
  const [name, setName] = useState(dname);
  const [amount, setAmount] = useState(damount);

  return (
    <form className={styles.container}>
      <p> Update transaction</p>
      <div className={styles.line}></div>
      <ExpenseInputField
        value={name}
        id='name'
        label='name'
        type='text'
        setter={setName}
      />
      <ExpenseInputField
        id='amount'
        label='amount'
        type='text'
        setter={setAmount}
        value={amount.toString()}
      />
      <button
        onClick={(event) => {
          event.preventDefault();
          handleSubmit(name, amount);
        }}
      >
        save transaction
      </button>

      <button
        onClick={(event) => {
          event.preventDefault();
          cancelUpdate();
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default UpdateTransactionForm;
