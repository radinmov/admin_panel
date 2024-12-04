import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../../Componets/Sidebar';
import useTitle from '../../Componets/Hook/useTitle';
import { BASE_URL } from '../../config';

const Investment = () => {
    useTitle("Investments");
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvestments = async () => {
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

                const response = await axios.get(`${BASE_URL}/api/v1/admin/investments`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data.investments || [];
                setInvestments(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch investments');
                setLoading(false);
            }
        };

        fetchInvestments();
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
        return <div>Loading...</div>;
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Investments</h1>

                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Cycle Length</th>
                                <th className="px-4 py-2 text-left">Start Time</th>
                                <th className="px-4 py-2 text-left">Withdrawable Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investments.length > 0 ? (
                                investments.map((investment) => (
                                    <tr key={investment.id} className="border-b">
                                        <td className="px-4 py-2">{investment.amount}</td>
                                        <td className="px-4 py-2">{investment.cycle_length}</td>
                                        <td className="px-4 py-2">{new Date(investment.start_time).toLocaleString()}</td>
                                        <td className="px-4 py-2">{investment.withdrawable_profit}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-2 text-center">
                                        No investments found
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

export default Investment;
