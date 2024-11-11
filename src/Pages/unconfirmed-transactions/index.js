import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../Componets/Sidebar/index';
import useTitle from '../../Componets/Hook/useTitle';

const UnconfirmedTransactions = () => {
    useTitle("admin_Login");
    const [unconfirmedTransactions, setUnconfirmedTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnconfirmedTransactions = async () => {
            try {
                const response = await axios.get('https://1544-151-244-159-138.ngrok-free.app/api/v1/admin/unconfirmed-transactions');
                setUnconfirmedTransactions(response.data.transactions); // Adjust based on the actual response structure
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch unconfirmed transactions');
                setLoading(false);
            }
        };

        fetchUnconfirmedTransactions();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
