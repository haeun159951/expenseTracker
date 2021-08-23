import { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.css';
import InputField from '../../components/input_field/input_field';
import { sign_up } from '../../service/authentication';
import { useRouter } from 'next/dist/client/router';

const Index = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameErr, serUsernameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const submit = async (event: any) => {
    event.preventDefault();
    try {
      serUsernameErr('');
      setEmailErr('');
      setPasswordErr('');
      setError('');
      await sign_up(username, email, password);
      router.push('/sign-in');
    } catch (exception) {
      if (exception?.status === 400) {
        const errors = exception?.data?.validation_errors;
        if (errors.username) {
          serUsernameErr(errors.username);
        }
        if (errors.email) {
          setEmailErr(errors.email);
        }
        if (errors.password) {
          setPasswordErr(errors.password);
        }
      } else {
        setError('Server error');
      }
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.main}>
        <h1>Create an account</h1>
        <p className={styles.error}>{error}</p>
        <InputField
          id='username'
          label='username'
          type='text'
          error={usernameErr}
          setter={setUsername}
        />
        <InputField
          id='email'
          label='email'
          type='email'
          error={emailErr}
          setter={setEmail}
        />
        <InputField
          id='password'
          label='password'
          type='password'
          error={passwordErr}
          setter={setPassword}
        />
        <button onClick={submit}>sign up</button>
        <span>
          Already have an account? <Link href='/sign-in'>Sign in</Link>
        </span>
      </form>
    </div>
  );
};

export default Index;
