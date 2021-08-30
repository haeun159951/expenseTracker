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
    return response.data.expense;
  } catch (exception) {
    throw exception.reponse;
  }
};

export const edit_expense = async (
  token: string,
  id: string,
  name?: string,
  amount?: number
): Promise<Expense> => {
  try {
    let updates: any = {};
    updates._id = id;
    if (name) updates.name = name;
    if (amount) updates.amount = amount;

    const response = await axios.put(
      `http://localhost:8080/expense`,
      {
        ...updates,
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

export const delete_expense = async (
  token: string,
  id: string
): Promise<Expense> => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/expense/${id}`,

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
