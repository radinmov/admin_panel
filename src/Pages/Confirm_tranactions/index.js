import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useTitle from "../../Componets/Hook/useTitle";
import Sidebar from "../../Componets/Sidebar";
import { BASE_URL } from "../../config";
import Swal from "sweetalert2";

function ConfirmTransaction() {
    const { transactionId } = useParams(); // Retrieve transaction ID from the URL
    const [confirm, setConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useTitle("Confirm-transactions");

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            setIsLoading(true);
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
                title: "Transaction",
                text: response.data?.message || "The transaction was successfully confirmed.",
            });

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

    return (
        <>
            <Sidebar />
            <div className="h-screen flex items-center justify-center bg-black">
                <div className="bg-black shadow-lg rounded-lg p-8 text-white">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-lime-500">
                        Confirm Transaction
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-lime-500 text-sm mb-2">
                                Transaction ID
                            </label>
                            <input
                                type="text"
                                value={transactionId} 
                                readOnly 
                                className="w-full px-3 py-2 border rounded-lg text-black bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
                            />
                        </div>

                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                checked={confirm}
                                onChange={(e) => setConfirm(e.target.checked)}
                                className="mr-2 h-4 w-4 text-lime-500 focus:ring-lime-500"
                            />
                            <label className="text-lime-500 text-sm">
                                Confirm Transaction
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full text-black font-semibold py-2 rounded-lg transition duration-300 bg-lime-500 ${
                                isLoading ? "opacity-50" : "hover:bg-white hover:text-lime-500"
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
