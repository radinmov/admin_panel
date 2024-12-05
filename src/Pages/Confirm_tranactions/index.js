import { useState } from "react";
import axios from "axios";
import useTitle from "../../Componets/Hook/useTitle";
import Sidebar from "../../Componets/Sidebar";
import { BASE_URL } from "../../config";
import Swal from "sweetalert2";

function ConfirmTransaction() {
    const [transactionId, setTransactionId] = useState("");
    const [confirm, setConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    useTitle("Confirm-transactions");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input validation
        if (!transactionId.trim() || !confirm) {
            Swal.fire({
                icon: "warning",
                title: "Missing Information",
                text: "Please fill in the transaction ID and confirm the transaction before submitting.",
            });
            return;
        }

        const data = {
            transaction_id: transactionId,
            confirm: confirm,
        };

        const token = localStorage.getItem("token");

        if (!token) {
            Swal.fire({
                icon: "error",
                title: "Authentication Error",
                text: "No token found. Please log in.",
            });
            return;
        }

        try {
            setIsLoading(true); // Start loading state
            Swal.fire({
                title: "Processing Transaction...",
                text: "Please wait while the transaction is being confirmed.",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            const response = await axios.post(
                `${BASE_URL}/api/v1/admin/confirm-transaction`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Swal.fire({
                icon: "success",
                title: "Transaction Confirmed",
                text: response.data?.message || "The transaction was successfully confirmed.",
            });

            setTransactionId(""); 
            setConfirm(false); 
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Failed to confirm the transaction. Please try again.",
            });
        } finally {
            setIsLoading(false); 
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e);
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
                                onKeyDown={handleKeyDown} // Handle Enter key
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter transaction ID"
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
                            disabled={isLoading} // Disable button during loading
                            className={`w-full text-white font-semibold py-2 rounded-lg transition duration-300 ${
                                isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                            {isLoading ? "Processing..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ConfirmTransaction;
