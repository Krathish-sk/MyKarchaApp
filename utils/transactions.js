import axios from "axios";
import { DATA_URL } from "@env";

export async function addTransaction(info) {
  const { amount, desc, date, catName } = info;
  const response = await axios.post(DATA_URL, { amount, desc, date, catName });
  return response;
}

export async function getAllTransactions() {
  const response = await axios.get(
    DATA_URL
  ); /* Here the response we get is an object so next we convert it into arrays of object */
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      catName: response.data[key].catName,
      desc: response.data[key].desc,
      date: response.data[key].date,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}
