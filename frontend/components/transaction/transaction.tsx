import React from 'react';
import styles from './style.module.css';
import Image from 'next/image';
import trash from '../../public/trash.png';
import edit from '../../public/edit.png';

export interface ParameterType {
  name: string;
  amount: number;
  handleDelete: any;
  selectExpense: any;
}

const Transaction = ({
  name,
  amount,
  handleDelete,
  selectExpense,
}: ParameterType) => {
  return (
    <div
      className={
        amount > 0
          ? styles.container + ' ' + styles.income
          : styles.container + ' ' + styles.expense
      }
    >
      <div className={styles.main}>
        <p>{name}</p>
        <p>{amount}</p>
      </div>
      <button onClick={selectExpense}>
        <Image src={edit}></Image>
      </button>
      <button onClick={handleDelete}>
        <Image src={trash}></Image>
      </button>
    </div>
  );
};
export default Transaction;
