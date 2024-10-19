import React from 'react';
import Sidebar from '../../Componets/Sidebar'; // Ensure you're importing the Sidebar component
import useTitle from '../../Componets/Hook/useTitle';

const TransactionList = () => {
  useTitle("Tranactions of user");
  const transactions = [
    { id: 1, userId: 1, type: 'Deposit', amount: 500, date: '2023-10-01' },
    { id: 2, userId: 1, type: 'Withdrawal', amount: 200, date: '2023-10-10' },
    { id: 3, userId: 2, type: 'Deposit', amount: 800, date: '2023-10-02' },
    { id: 4, userId: 3, type: 'Deposit', amount: 300, date: '2023-10-03' },
  ];

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
