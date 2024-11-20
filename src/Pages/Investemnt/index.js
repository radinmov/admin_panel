import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const Investment = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvestmentData = async () => {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Unauthorized',
                    text: 'You need to log in to access this data.',
                });
                return;
            }

            try {
                const response = await fetch('https://08c3-202-43-6-53.ngrok-free.app/api/v1/admin/investments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Log the status and headers
                console.log('Response Status:', response.status);
                console.log('Response Headers:', response.headers);

                // Get the raw response text
                const rawText = await response.text();
                console.log('Raw Response:', rawText);

                // Check if the Content-Type is JSON
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const result = JSON.parse(rawText); // Parse JSON if the response is valid
                    setData(result);
                } else {
                    throw new Error(`Unexpected response type: Expected JSON but got ${contentType}`);
                }
            } catch (error) {
                console.error('Fetch Error:', error.message);
                setError(error.message);

                // Show a user-friendly error message
                Swal.fire({
                    icon: 'error',
                    title: 'Error fetching data',
                    text: error.message,
                });
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
