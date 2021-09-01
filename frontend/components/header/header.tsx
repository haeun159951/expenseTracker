import styles from './style.module.css';

import React from 'react';
import { useRouter } from 'next/dist/client/router';

const Header = () => {
  const router = useRouter();

  const handle_logout = () => {
    localStorage.clear();
    router.push('/sign-in');
  };
  return (
    <div className={styles.header}>
      <h1>Expense Tracker</h1>
      <button onClick={handle_logout}>Log out</button>
    </div>
  );
};
export default Header;
