import axios from 'axios';

export interface Expense {
  _id: string;
  name: string;
  amount: number;
  user: string;
}

interface RetrieveAllExpenseResponse {
  expenses: Expense[];
}

export const create_expense = async (
  token: string,
  name: string,
  amount: number
): Promise<Expense> => {
  try {
    const response = await axios.post(
      'http://localhost:8080/expense',
      {
        name,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (exception) {
    throw exception.reponse;
  }
};

export const retrieve_all_expenses = async (
  token: string
): Promise<RetrieveAllExpenseResponse> => {
  try {
    const response = await axios.get('http://localhost:8080/expenses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (exception) {
    throw exception.reponse;
  }
};
