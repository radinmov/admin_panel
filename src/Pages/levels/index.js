import { useState, useEffect } from "react";
import axios from "axios";
import useTitle from "../../Componets/Hook/useTitle";
import Sidebar from "../../Componets/Sidebar";
import { BASE_URL } from "../../config";
import Swal from "sweetalert2";
import { useTokenHandling } from "../../Componets/token_handling";

function Settings() {
    const [minActiveUser, setMinActiveUser] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [profitMultiplier, setProfitMultiplier] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [levels, setLevels] = useState([]);
    useTitle("admin_setting");
    const { checkToken } = useTokenHandling(); 

    useEffect(() => {
        const fetchLevels = async () => {
            if (!checkToken()) return; 

            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${BASE_URL}/api/v1/admin/levels`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data) {
                    setLevels(response.data);
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "No Levels Found",
                        text: "There are no levels available.",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response?.data?.message || "Failed to fetch levels. Please try again.",
                });
            }
        };

        fetchLevels();
    }, [checkToken]);

    // Handle level update submission
    const handleLevelSubmit = async (e) => {
        e.preventDefault();
        if (!checkToken()) return; // Redirect if unauthorized

        const data = {
            min_active_users: minActiveUser,
            min_amount: minAmount,
            profit_multiplier: profitMultiplier,
        };
        const token = localStorage.getItem("token");

        try {
            setIsLoading(true);
            Swal.fire({
                title: "Saving Level Settings...",
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
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleLevelSubmit(e);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="h-screen flex items-center justify-center bg-black">
                <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-96">
                    <h2 className="text-3xl font-extrabold text-green-500 text-center mb-6">
                        Admin Settings
                    </h2>

                    {/* Form for Managing Levels */}
                    <form onSubmit={handleLevelSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm mb-2">
                                Min Active User
                            </label>
                            <input
                                type="number"
                                value={minActiveUser}
                                onChange={(e) => setMinActiveUser(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full px-3 py-2 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-black"
                                placeholder="Enter minimum active users"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm mb-2">
                                Min Amount
                            </label>
                            <input
                                type="number"
                                value={minAmount}
                                onChange={(e) => setMinAmount(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full px-3 py-2 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-black"
                                placeholder="Enter minimum amount"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm mb-2">
                                Profit Multiplier
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={profitMultiplier}
                                onChange={(e) => setProfitMultiplier(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full px-3 py-2 border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-black"
                                placeholder="Enter profit multiplier"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full text-white font-semibold py-2 rounded-lg transition duration-300 ${
                                isLoading ? "bg-gray-600" : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {isLoading ? "Saving..." : "Save Level Settings"}
                        </button>
                    </form>

                    {/* Display Levels Information */}
                    {levels.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-xl text-green-500">Current Level Information</h3>
                            <div className="text-gray-300">
                                <p>Min Active Users: {levels[0].min_active_users}</p>
                                <p>Min Amount: ${levels[0].min_amount}</p>
                                <p>Profit Multiplier: {levels[0].profit_multiplier}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Settings;
