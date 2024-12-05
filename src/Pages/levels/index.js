import { useState } from "react";
import axios from "axios";
import useTitle from "../../Componets/Hook/useTitle";
import Sidebar from "../../Componets/Sidebar";
import { BASE_URL } from "../../config";
import Swal from "sweetalert2";

function Settings() {
    const [minActiveUser, setMinActiveUser] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [profitMultiplier, setProfitMultiplier] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    useTitle("admin_setting");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            min_active_users: minActiveUser,
            min_amount: minAmount,
            profit_multiplier: profitMultiplier,
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
                title: "Saving Settings...",
                text: "Please wait while your settings are being updated.",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            const response = await axios.post(
                `${BASE_URL}/api/v1/admin/levels`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data && response.data.level_id && response.data.msg) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: `${response.data.msg} (Level ID: ${response.data.level_id})`,
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Settings Updated",
                    text: "Your settings have been updated successfully.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Failed to update settings. Please try again.",
            });
        } finally {
            setIsLoading(false); // End loading state
        }
    };

    // Handle pressing Enter to submit the form
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
                        Admin Settings
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2">
                                Min Active User
                            </label>
                            <input
                                type="number"
                                value={minActiveUser}
                                onChange={(e) => setMinActiveUser(e.target.value)}
                                onKeyDown={handleKeyDown} // Handle Enter key
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter minimum active users"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2">
                                Min Amount
                            </label>
                            <input
                                type="number"
                                value={minAmount}
                                onChange={(e) => setMinAmount(e.target.value)}
                                onKeyDown={handleKeyDown} // Handle Enter key
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter minimum amount"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2">
                                Profit Multiplier
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={profitMultiplier}
                                onChange={(e) => setProfitMultiplier(e.target.value)}
                                onKeyDown={handleKeyDown} // Handle Enter key
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter profit multiplier"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading} // Disable button during loading
                            className={`w-full text-white font-semibold py-2 rounded-lg transition duration-300 ${
                                isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                            {isLoading ? "Saving..." : "Save Settings"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Settings;
