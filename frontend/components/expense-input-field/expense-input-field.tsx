import styles from './style.module.css';

interface ParameterType {
  id: string;
  label: string;
  type: string;
  name?: string;
  setter: any;
  value?: string;
  error?: string;
}
const ExpenseInputField = ({
  id,
  label,
  type,
  name,
  error,
  setter,
  value,
}: ParameterType) => {
  return (
    <div
      className={
        error ? styles.container + ' ' + styles.error : styles.container
      }
    >
      {error ? (
        <label htmlFor={id}>
          {label} - <span>{error}</span>
        </label>
      ) : (
        <label htmlFor={id}>{label}</label>
      )}

      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(event) => {
          setter(event.target.value); //whatever user type it, it will automatically set up
        }}
      />
    </div>
  );
};

export default ExpenseInputField;
