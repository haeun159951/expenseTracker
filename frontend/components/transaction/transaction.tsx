import React from 'react';
import styles from './style.module.css';

export interface ParameterType {
  name: string;
  amount: number;
}

const Transaction = ({ name, amount }: ParameterType) => {
  return (
    <div
      className={
        amount > 0
          ? styles.container + ' ' + styles.income
          : styles.container + ' ' + styles.expense
      }
    >
      <p>{name}</p>
      <p>{amount}</p>
    </div>
  );
};
export default Transaction;
