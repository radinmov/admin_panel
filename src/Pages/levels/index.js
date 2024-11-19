import { useState } from "react";
import axios from "axios";
import useTitle from "../../Componets/Hook/useTitle";
import Sidebar from "../../Componets/Sidebar";

function Settings() {
    const [minActiveUser, setMinActiveUser] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [profitMultiplier, setProfitMultiplier] = useState("");
    useTitle("admin_setting");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            min_active_user: minActiveUser,
            min_amount: minAmount,
            profit_multiplier: profitMultiplier,
        };
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. Please log in.");
            return;
        }

        try {
            const response = await axios.post(
                "http://46.100.94.88:3003/api/v1/admin/levels",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Settings updated:", response.data);
        } catch (error) {
            console.error("Error updating settings:", error);
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
                                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter profit multiplier"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Save Settings
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Settings;
