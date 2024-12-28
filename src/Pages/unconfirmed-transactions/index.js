import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../Componets/Sidebar/index';
import useTitle from '../../Componets/Hook/useTitle';
import Swal from 'sweetalert2';
import { useTokenHandling } from '../../Componets/token_handling';
import { BASE_URL } from '../../config';

const UnconfirmedTransactions = () => {
    useTitle("admin_Login");
    const navigate = useNavigate();
    const [unconfirmedTransactions, setUnconfirmedTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { checkToken } = useTokenHandling();

    useEffect(() => {
        const fetchUnconfirmedTransactions = () => {
            if (!checkToken()) return;

            const token = localStorage.getItem('token');

            fetch(`${BASE_URL}/api/v1/admin/unconfirmed-transactions`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => response.json()) 
            .then((data) => {
                setUnconfirmedTransactions(data.unconfirmed_transactions)
                 setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch unconfirmed transactions');
                setLoading(false);
                console.error('Error:', err);
            });
        };
        
        fetchUnconfirmedTransactions();
    }, []);

    const deleteTransaction = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('token');
                fetch(`${BASE_URL}/api/v1/admin/unc_tran/delete`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                .then((response) => {
                    if (response.ok) {
                        setUnconfirmedTransactions((prevTransactions) =>
                            prevTransactions.filter((transaction) => transaction.id !== id)
                        );
                        Swal.fire('Deleted!', 'The transaction has been deleted.', 'success');
                    } else {
                        Swal.fire('Failed!', 'Failed to delete the transaction.', 'error');
                    }
                })
                .catch((err) => {
                    Swal.fire('Failed!', 'Failed to delete the transaction.', 'error');
                    console.error('Error:', err);
                });
            }
        });
    };

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
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="w-16 h-16 border-4 border-lime-500 border-dotted rounded-full animate-spin"></div>
                <p className="ml-4 text-lime-500 text-lg">Loading unconfirmed transactions...</p>
            </div>
        );
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64 p-8 bg-black min-h-screen">
                <h1 className="text-2xl font-bold mb-4 text-lime-500">Unconfirmed Transactions</h1>
                <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-900">
                                <th className="px-4 py-2 text-left text-lime-500">Amount</th>
                                <th className="px-4 py-2 text-left text-lime-500">Description</th>
                                <th className="px-4 py-2 text-left text-lime-500">Request Date</th>
                                <th className="px-4 py-2 text-left text-lime-500">Type</th>
                                <th className="px-4 py-2 text-left text-lime-500">User ID</th>
                                <th className="px-4 py-2 text-left text-lime-500">Transaction ID</th>
                                <th className="px-4 py-2 text-left text-lime-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {unconfirmedTransactions.length > 0 ? (
                                unconfirmedTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-b border-lime-500">
                                        <td className="px-4 py-2 text-white">{transaction.amount}T</td>
                                        <td className="px-4 py-2 text-white">{transaction.description}</td>
                                        <td className="px-4 py-2 text-white">{transaction.request_date}</td>
                                        <td className="px-4 py-2 text-white">{transaction.type}</td>
                                        <td className="px-4 py-2 text-white">{transaction.user_id}</td>
                                        <td className="px-4 py-2 text-white">{transaction.id}</td>
                                        <td className="px-4 py-2 flex space-x-2">
                                            <button
                                                className="bg-lime-500 text-black px-4 py-2 border-2 border-white rounded hover:bg-white hover:text-lime-500"
                                                onClick={() => navigate(`/admin/confirm-transaction/${transaction.id}`)}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                className="bg-red-500 text-black px-4 py-2 border-2 border-white rounded hover:bg-white hover:text-red-500"
                                                onClick={() => deleteTransaction(transaction.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-4 py-2 text-center text-lime-500">
                                        No unconfirmed transactions found
                                    </td>
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
