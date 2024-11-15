import { useState } from 'react';
import Swal from 'sweetalert2';

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister() {
        if (!username || !password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in both username and password!",
            });
            return;
        }

        fetch("http://46.100.94.88:3003/api/v1/admin/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Registration successful!",
                });
                // Optional: Clear inputs or redirect
                setUsername("");
                setPassword("");
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong. Please try again.",
                });
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
    );
};
