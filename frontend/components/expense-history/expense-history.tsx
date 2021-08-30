import Transaction from '../transaction/transaction';
import styles from './style.module.css';
import transaction, {
  ParameterType as TransactionType,
} from '../transaction/transaction';
import { Expense } from '../../service/expense';

interface ParameterType {
  handleDelete: any;
  selectExpense: any;
  transactions: Expense[];
}

const ExpenseHistory = ({
  transactions,
  handleDelete,
  selectExpense,
}: ParameterType) => {
  return (
    <div className={styles.container}>
      <h1>History</h1>
      <div className={styles.line}></div>
      {transactions.map((transaction) => (
        <Transaction
          key={transaction._id}
          name={transaction.name}
          amount={transaction.amount}
          handleDelete={() => {
            handleDelete(transaction._id);
          }}
          selectExpense={() =>
            selectExpense(transaction._id, transaction.name, transaction.amount)
          }
        />
      ))}
    </div>
  );
};
export default ExpenseHistory;
