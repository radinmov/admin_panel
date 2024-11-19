import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const Investment = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvestmentData = async () => {
            const token = localStorage.getItem('token'); 
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Unauthorized',
                    text: 'You need to log in to access this data.',
                });
                return;
            }

            try {
                const response = await fetch('http://46.100.94.88:3003/api/v1/admin/invesment', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch investment data');
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchInvestmentData();
    }, []);

    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!data) return <p className="text-gray-600">Loading...</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Investment Data</h2>
                <div className="bg-gray-100 p-4 rounded-lg overflow-auto">
                    <pre className="text-sm text-gray-700">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
};
