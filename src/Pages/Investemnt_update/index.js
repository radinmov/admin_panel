import React, { useState, useEffect } from 'react';

export const UInvestment = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [investmentId, setInvestmentId] = useState('');
    const [amount, setAmount] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');


    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdateMessage(''); 
        try {
            const response = await fetch('http://46.100.94.88:3003/admin/investment/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: investmentId,
                    amount: parseFloat(amount),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update investment');
            }

            const result = await response.json();
            setUpdateMessage('Investment updated successfully');
        } catch (error) {
            setUpdateMessage(`Error: ${error.message}`);
        }
    };

    if (error) return <p>Error: {error}</p>;

    return (
        <div>

            <h3>Update Investment</h3>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>
                        Investment ID:
                        <input
                            type="text"
                            value={investmentId}
                            onChange={(e) => setInvestmentId(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Amount:
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Update Investment</button>
            </form>

            {updateMessage && <p>{updateMessage}</p>}
        </div>
    );
};
