import axios from 'axios';

interface SignUpResponse {
  user: {
    _id: string;
    username: string;
    email: string;
    password_salt: string;
    password_hash: string;
  };
}

interface SignInResponse {
  token: string;
}

export const sign_up = async (
  username: string,
  email: string,
  password: string
): Promise<SignUpResponse> => {
  try {
    const response = await axios.post(
      ' https://hekim-expense-tracker.herokuapp.com/sign-up',
      {
        username,
        email,
        password,
      }
    );
    return response.data;
  } catch (exception) {
    throw exception.response;
  }
};

export const sign_in = async (
  username: string,
  password: string
): Promise<SignInResponse> => {
  try {
    const response = await axios.post(
      ' https://hekim-expense-tracker.herokuapp.com/sign-in',
      {
        username,
        password,
      }
    );
    return response.data;
  } catch (exception) {
    throw exception.response;
  }
};
