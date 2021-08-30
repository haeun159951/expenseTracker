import styles from './style.module.css';

import React from 'react';

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Expense Tracker</h1>
      <button>Log out</button>
    </div>
  );
};
export default Header;
