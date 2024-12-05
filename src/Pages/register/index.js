import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Componets/Sidebar';
import useTitle from '../../Componets/Hook/useTitle';

export const Register = () => {
    useTitle("admin_register");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!username.trim() || !password.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Username and password cannot be empty!",
            });
            return;
        }

        if (username.length < 2) {
            Swal.fire({
                icon: "error",
                title: "Invalid Username",
                text: "Username must be at least 2 characters long.",
            });
            return;
        }

        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Invalid Password",
                text: "Password must be at least 6 characters long.",
            });
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/v1/admin/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || "Registration failed.");
            }

            const result = await response.json();
            if (result.access_token) {
                localStorage.setItem('token', result.access_token);

                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Registration successful!",
                });
                navigate('/admin/home');
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full ml-64">
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8 bg-white flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-gray-700">
                            Register a New Admin Account
                        </h2>
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
