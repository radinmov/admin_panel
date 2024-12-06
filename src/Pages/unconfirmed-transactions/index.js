import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../Componets/Sidebar/index';
import useTitle from '../../Componets/Hook/useTitle';
import Swal from 'sweetalert2';

const UnconfirmedTransactions = () => {
    useTitle("admin_Login");
    const [unconfirmedTransactions, setUnconfirmedTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnconfirmedTransactions = async () => {
            try {
                const token = localStorage.getItem('token');

                if (!token) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Unauthorized',
                        text: 'Please log in first.',
                    });
                    return;
                }

                const response = await axios.get('http://46.100.94.88:3003/api/v1/admin/unconfirmed-transactions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Full Response Data: ", response.data);
                console.log("Transactions: ", response.data.transactions);

                const transactions = Array.isArray(response.data.unconfirmed_transactions)
                    ? response.data.unconfirmed_transactions
                    : [];

                if (transactions.length === 0) {
                    console.log("No unconfirmed transactions available.");
                }

                setUnconfirmedTransactions(transactions);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch unconfirmed transactions');
                setLoading(false);
            }
        };

        fetchUnconfirmedTransactions();
    }, []);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: `${error}`,
            });
        }
    }, [error]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
            <p className="ml-4 text-blue-600 text-lg">Loading unconfirmed transactions...</p>
        </div>;
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
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-left">Request Date</th>
                                <th className="px-4 py-2 text-left">Type</th>
                                <th className="px-4 py-2 text-left">User ID</th>
                                <th className="px-4 py-2 text-left">trans ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unconfirmedTransactions.length > 0 ? (
                                unconfirmedTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-b">
                                        <td className="px-4 py-2">{transaction.amount}T</td>
                                        <td className="px-4 py-2">{transaction.description}</td>
                                        <td className="px-4 py-2">{transaction.request_date}</td>
                                        <td className="px-4 py-2">{transaction.type}</td> {/* Fixed field */}
                                        <td className="px-4 py-2">{transaction.user_id}</td>
                                        <td className="px-4 py-2">{transaction.id}</td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-2 text-center">No unconfirmed transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UnconfirmedTransactions;
