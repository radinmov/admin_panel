import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../../Componets/Sidebar';
import useTitle from '../../Componets/Hook/useTitle';
import { BASE_URL } from '../../config';
import { useTokenHandling } from '../../Componets/token_handling';


const Investment = () => {
    useTitle("Investments");
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { checkToken } = useTokenHandling();


    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!checkToken()) return;


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
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="w-16 h-16 border-4 border-green-500 border-dotted rounded-full animate-spin"></div>
                <p className="ml-4 text-green-500 text-lg">Loading Investments...</p>
            </div>
        );
    }

    return (
        <div className="flex bg-black">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 p-8 bg-black min-h-screen">
                <h1 className="text-3xl font-extrabold text-lime-500 mb-6">Investments</h1>

                <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
                    <table className="min-w-full table-auto text-white">
                        <thead>
                            <tr className="bg-lime-800">
                                <th className="px-4 py-3 text-left font-semibold">Amount</th>
                                <th className="px-4 py-3 text-left font-semibold">Cycle Length</th>
                                <th className="px-4 py-3 text-left font-semibold">Start Time</th>
                                <th className="px-4 py-3 text-left font-semibold">Withdrawable Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {investments.length > 0 ? (
                                investments.map((investment) => (
                                    <tr
                                        key={investment.id}
                                        className="border-b hover:bg-gray-700 transition-colors"
                                    >
                                        <td className="px-4 py-3">${investment.amount.toLocaleString()}</td>
                                        <td className="px-4 py-3">{investment.cycle_length} days</td>
                                        <td className="px-4 py-3">{new Date(investment.start_time).toLocaleString()}</td>
                                        <td className="px-4 py-3">${investment.withdrawable_profit.toLocaleString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-3 text-center text-gray-400">
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
