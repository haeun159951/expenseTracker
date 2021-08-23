import { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.css';
import InputField from '../../components/input_field/input_field';
import { sign_in } from '../../service/authentication';
import { useRouter } from 'next/dist/client/router';

const Index = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const router = useRouter();

  const submit = async (event: any) => {
    event.preventDefault();
    try {
      setError('');
      setUsernameErr('');
      setPasswordErr('');
      const response = await sign_in(username, password);
      localStorage.setItem('token', response.token);
      //router.push('/dashboard');
    } catch (exception) {
      if (exception?.status === 400) {
        const errors = exception?.data?.validation_errors;
        if (errors.username) {
          setUsernameErr(errors.username);
        }

        if (errors.password) {
          setPasswordErr(errors.password);
        }
      } else {
        setError('Server Error');
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.main}>
        <h1>Welcome Back!</h1>
        <p className={styles.error}>{error}</p>
        <InputField
          id='username'
          label='username'
          type='text'
          error={usernameErr}
          setter={setUsername}
        />
        <InputField
          id='password'
          label='password'
          type='password'
          error={passwordErr}
          setter={setPassword}
        />
        <button onClick={submit}>sign in</button>
        <span>
          Need an account? <Link href='/sign-up'>Sign up</Link>
        </span>
      </form>
    </div>
  );
};

export default Index;
