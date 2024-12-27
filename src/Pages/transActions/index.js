import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../../Componets/Sidebar";
import useTitle from "../../Componets/Hook/useTitle";
import { BASE_URL } from "../../config";

const UserTransactions = () => {
    useTitle("User Transactions");
    const { userId } = useParams();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true); 
                const token = localStorage.getItem("token");

                if (!token) {
                    Swal.fire({
                      title: "Unauthorized",
                      text: "You need to log in to access this page.",
                      icon: "warning",
                      confirmButtonText: "Log In",
                    }).then(() => {
                      navigate("/");
                    });
                    return;
                  }

                const response = await axios.get(`${BASE_URL}/api/v1/admin/users/${userId}/transactions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data.transactions || [];
                setTransactions(data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch transactions.");
            } finally {
                setIsLoading(false); // Stop loader
            }
        };

        fetchTransactions();
    }, [userId, navigate]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error,
            });
        }
    }, [error]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                <p className="ml-4 text-blue-600 text-lg">Loading transactions...</p>
            </div>
        );
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">User Transactions</h1>

                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Transaction ID</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-b">
                                        <td className="px-4 py-2">{transaction.id}</td>
                                        <td className="px-4 py-2">{transaction.amount}</td>
                                        <td className="px-4 py-2">{new Date(transaction.date).toLocaleString()}</td>
                                        <td className="px-4 py-2">{transaction.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-2 text-center">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <button
                    onClick={() => navigate("/admin/home")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
                >
                    Back to User List
                </button>
            </div>
        </div>
    );
};

export default UserTransactions;
