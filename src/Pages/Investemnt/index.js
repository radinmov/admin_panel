import React, { useState, useEffect } from 'react';

export const Investemnt = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvestmentData = async () => {
            try {
                const response = await fetch('http://46.100.94.88:3003/admin/invesment/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchInvestmentData();
    }, []);

    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Loading...</p>;

    return (
        <div>
            this the invesment page 
            <h2>Investment Data</h2>
            {/* Display the investment data here */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};
