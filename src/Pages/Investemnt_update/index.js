import React, { useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../../Componets/Sidebar";
// import Tokenhandling
import { useNavigate } from "react-router-dom";
import { useTokenHandling } from "../../Componets/token_handling";
import { BASE_URL } from "../../config";

export const UInvestment = () => {
    const [investmentId, setInvestmentId] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const { checkToken } = useTokenHandling(); 


    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        if (!checkToken()) return; 
        try {
            setLoading(true);

            const response = await fetch(
                `http://${BASE_URL}/api/v1/admin/investment/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id: investmentId,
                        amount: parseFloat(amount),
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.msg || "Failed to update investment.");
            }

            Swal.fire({
                icon: "success",
                title: "Success",
                text: result.msg || "Investment updated successfully!",
            });

            setInvestmentId("");
            setAmount("");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Failed to update investment. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col md:flex-row bg-black border border-lime-400 shadow-lg rounded-lg overflow-hidden p-8">
                    <div className="p-6">
                        <h2 className="text-3xl font-bold text-lime-400 mb-6 text-center">Update Investment</h2>
                        <form className="space-y-6" onSubmit={handleUpdate}>
                            <div>
                                <label className="block text-lime-400">Investment ID</label>
                                <input
                                    onChange={(e) => setInvestmentId(e.target.value)}
                                    type="text"
                                    placeholder="Enter Investment ID"
                                    value={investmentId}
                                    className="w-full px-4 py-2 bg-black text-lime-400 border border-lime-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                />
                            </div>
                            <div>
                                <label className="block text-lime-400">Amount</label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={amount}
                                    className="w-full px-4 py-2 bg-black text-lime-400 border border-lime-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-2 rounded-lg text-black font-bold bg-lime-400 hover:bg-lime-500 transition ${
                                    loading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Update Investment"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
