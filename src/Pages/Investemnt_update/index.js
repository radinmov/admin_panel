import React, { useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../../Componets/Sidebar";

export const UInvestment = () => {
    const [investmentId, setInvestmentId] = useState("");
    const [amount, setAmount] = useState("");
    const [updateMessage, setUpdateMessage] = useState("");

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdateMessage("");

        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                icon: "error",
                title: "Unauthorized",
                text: "You need to log in to perform this action.",
            });
            return;
        }

        try {
            Swal.fire({
                title: "Updating Investment...",
                text: "Please wait while the update is being processed.",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            const response = await fetch(
                "http://46.100.94.88:3003/api/v1/admin/investment/update",
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
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message || "Failed to update investment. Please try again.",
            });
        }
    };

    return (
        <>
            <Sidebar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8 bg-white flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-gray-700">Update Investment</h2>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                            <span className="text-xs text-center text-gray-500 uppercase">
                                Update Details
                            </span>
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                        </div>
                        <form className="mt-8 space-y-4" onSubmit={handleUpdate}>
                            <div>
                                <label className="block text-gray-700">Investment ID</label>
                                <input
                                    onChange={(e) => setInvestmentId(e.target.value)}
                                    type="text"
                                    placeholder="Enter Investment ID"
                                    value={investmentId}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Amount</label>
                                <input
                                    onChange={(e) => setAmount(e.target.value)}
                                    type="number"
                                    placeholder="Enter Amount"
                                    value={amount}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
                            >
                                Update Investment
                            </button>
                        </form>
                        {updateMessage && (
                            <p className="mt-4 text-sm text-center text-gray-600">
                                {updateMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
