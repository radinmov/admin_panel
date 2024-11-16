import { useState } from "react";
import axios from "axios";
import useTitle from "../../Componets/Hook/useTitle";
import Sidebar from "../../Componets/Sidebar";

function ConfirmTransaction() {
    const [transactionId, setTransactionId] = useState("");
    const [confirm, setConfirm] = useState(false);
    useTitle("Confirm-transactions");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            transaction_id: transactionId,
            confirm: confirm,
        };

        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const response = await axios.post(
                "http://46.100.94.88:3003/api/v1/admin/confirm-transaction",data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );
            console.log("Transaction confirmed:", response.data);
        } catch (error) {
            console.error("Error confirming transaction:", error);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Confirm Transaction
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2">
                                Transaction ID
                            </label>
                            <input
                                type="text"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter transaction ID"
                                required
                            />
                        </div>

                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                checked={confirm}
                                onChange={(e) => setConfirm(e.target.checked)}
                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="text-gray-700 text-sm">
                                Confirm Transaction
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ConfirmTransaction;
