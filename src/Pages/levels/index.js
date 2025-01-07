import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../../Componets/Sidebar/index";
import  useTitle  from "../../Componets/Hook/useTitle";
import { useTokenHandling } from "../../Componets/token_handling/index";
import { BASE_URL } from '../../config';


function Settings() {
    const [minActiveUser, setMinActiveUser] = useState("");
    const [minAmount, setMinAmount] = useState("");
    const [profitMultiplier, setProfitMultiplier] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [levels, setLevels] = useState([]);
    const [editingLevel, setEditingLevel] = useState(null);
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

    const resetForm = () => {
        setMinActiveUser("");
        setMinAmount("");
        setProfitMultiplier("");
        setEditingLevel(null);
    };

    const handleLevelSubmit = async (e) => {
        e.preventDefault();
        if (!checkToken()) return;

        const token = localStorage.getItem("token");
        const data = {
            min_active_users: minActiveUser,
            min_amount: minAmount,
            profit_multiplier: profitMultiplier,
        };

        try {
            setIsLoading(true);
            Swal.fire({
                title: "Saving Level Settings...",
                text: "Please wait while your settings are being updated.",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            const response = await axios.post(`${BASE_URL}/api/v1/admin/levels`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data && response.data.msg) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: `${response.data.msg} (Level ID: ${response.data.level_id})`,
                });
                setLevels([...levels, response.data]);
                resetForm();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Failed to save settings.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateLevel = async (e) => {
        e.preventDefault();
        if (!checkToken()) return;

        const token = localStorage.getItem("token");
        const data = {
            min_active_users: minActiveUser,
            min_amount: minAmount,
            profit_multiplier: profitMultiplier,
        };

        try {
            setIsLoading(true);
            Swal.fire({
                title: "Updating Level...",
                text: "Please wait while the level is being updated.",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            await axios.put(`${BASE_URL}/api/v1/admin/levels/${editingLevel.id}`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "The level has been updated successfully.",
            });

            setLevels(
                levels.map((level) =>
                    level.id === editingLevel.id ? { ...level, ...data } : level
                )
            );
            resetForm();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Failed to update level.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const openUpdateModal = (level) => {
        setEditingLevel(level);
        setMinActiveUser(level.min_active_users);
        setMinAmount(level.min_amount);
        setProfitMultiplier(level.profit_multiplier);
    };

    return (
        <div className="flex bg-black h-screen">
            <Sidebar />
            <div className="ml-64 flex flex-col w-full p-4">
                <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-green-500 text-center mb-6">
                        Admin Settings
                    </h2>

                    {/* Create Level Button */}
                    <button
                        className="bg-blue-500 px-4 py-2 rounded-lg text-white mb-4 hover:bg-blue-600"
                        onClick={resetForm}
                    >
                        Create Level
                    </button>

                    {/* Add/Update Level Form */}
                    <form onSubmit={editingLevel ? handleUpdateLevel : handleLevelSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm mb-2">
                                Min Active Users
                            </label>
                            <input
                                type="number"
                                value={minActiveUser}
                                onChange={(e) => setMinActiveUser(e.target.value)}
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
                            {isLoading ? "Saving..." : editingLevel ? "Update Level" : "Save Level"}
                        </button>
                    </form>

                    {/* Display Levels */}
                    <table className="w-full mt-8 border border-gray-600 text-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-600 px-4 py-2">ID</th>
                                <th className="border border-gray-600 px-4 py-2">Min Active Users</th>
                                <th className="border border-gray-600 px-4 py-2">Min Amount</th>
                                <th className="border border-gray-600 px-4 py-2">Profit Multiplier</th>
                                <th className="border border-gray-600 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {levels.map((level) => (
                                <tr key={level.id} className="even:bg-gray-800 odd:bg-gray-700">
                                    <td className="border border-gray-700 px-4 py-2">{level.id}</td>
                                    <td className="border border-gray-700 px-4 py-2">
                                        {level.min_active_users}
                                    </td>
                                    <td className="border border-gray-700 px-4 py-2">
                                        {level.min_amount}
                                    </td>
                                    <td className="border border-gray-700 px-4 py-2">
                                        {level.profit_multiplier}
                                    </td>
                                    <td className="border border-gray-700 px-4 py-2 text-center">
                                        <button
                                            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
                                            onClick={() => openUpdateModal(level)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Settings;
