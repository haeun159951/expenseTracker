import React from 'react';
import styles from './style.module.css';

interface ParameterType {
  id: string;
  label: string;
  type: string;
  name?: string;
  error?: string;
  setter: any;
}

const InputField = ({
  id,
  label,
  type,
  name,
  error,
  setter,
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
        name={name}
        id={id}
        onChange={(event) => {
          setter(event.target.value);
        }}
      />
    </div>
  );
};

export default InputField;
