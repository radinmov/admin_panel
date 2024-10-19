import React from 'react';
import Sidebar from '../../Componets/Sidebar/index';
import useTitle from '../../Componets/Hook/useTitle';

const UnconfirmedTransactions = () => {
    useTitle("admin_Login");
    const unconfirmedTransactions = [
        { id: 1, userId: 1, amount: 100, date: '2024-10-10', status: 'Pending' },
        { id: 2, userId: 2, amount: 200, date: '2024-10-11', status: 'Pending' },
        { id: 3, userId: 3, amount: 150, date: '2024-10-12', status: 'Pending' },
    ];

    return (
        <div className="flex">
            <Sidebar />


            <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Unconfirmed Transactions</h1>

                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Transaction ID</th>
                                <th className="px-4 py-2 text-left">User ID</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unconfirmedTransactions.map((transaction) => (
                                <tr key={transaction.id} className="border-b">
                                    <td className="px-4 py-2">{transaction.id}</td>
                                    <td className="px-4 py-2">{transaction.userId}</td>
                                    <td className="px-4 py-2">${transaction.amount}</td>
                                    <td className="px-4 py-2">{transaction.date}</td>
                                    <td className="px-4 py-2">{transaction.status}</td>
                                    <td className="px-4 py-2">
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UnconfirmedTransactions;
