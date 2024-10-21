import React, { useState, useEffect } from 'react';
import Sidebar from '../../Componets/Sidebar'; // Ensure you're importing the Sidebar component
import useTitle from '../../Componets/Hook/useTitle';
import axios from 'axios';

const TransactionList = () => {
  useTitle("Transactions of user");

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('https://api.example.com/transactions')
      .then(response => {
        setTransactions(response.data); 
      })
      .catch(error => {
        console.error("There was an error fetching the transactions!", error);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-grow ml-64 p-8 w-full bg-white mt-6">
        <h1 className="text-2xl font-bold mb-4">Transaction List</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Transaction ID</th>
                <th className="px-4 py-2 text-left">User ID</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="px-4 py-2">{transaction.id}</td>
                  <td className="px-4 py-2">{transaction.userId}</td>
                  <td className="px-4 py-2">{transaction.type}</td>
                  <td className="px-4 py-2">${transaction.amount}</td>
                  <td className="px-4 py-2">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
