import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Componets/Sidebar'; // Import Sidebar
import useTitle from '../../Componets/Hook/useTitle';

export const Register = () => {
    useTitle("admin_register");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleRegister() {
        if (!username.trim() || !password.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Username and password cannot be empty!",
            });
            return;
        }

        fetch(`${BASE_URL}/api/v1/admin/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    if (response.status === 422) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Invalid input data");
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                if (result.access_token) {
                    localStorage.setItem('authToken', result.access_token);

                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: result.message || "Registration successful!",
                    });
                    navigate('/');
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: result.message || "Registration failed.",
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message || "Something went wrong. Please try again.",
                });
            });
    }

    return (
        <div className="flex">
            {/* Sidebar on the left */}
            <Sidebar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full ml-64">
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8 bg-white flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-gray-700">
                            Register a New Admin Account
                        </h2>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                            <span className="text-xs text-center text-gray-500 uppercase">here</span>
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                        </div>
                        <div className="mt-8 space-y-4">
                            <div>
                                <label className="block text-gray-700">Your Username</label>
                                <input
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    type="text"
                                    placeholder="Your username"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    placeholder="Your password"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                onClick={handleRegister}
                                className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
