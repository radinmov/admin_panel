import { useState, FormEvent } from 'react';
import Swal from 'sweetalert2';
import useTitle from '../../Componets/Hook/useTitle';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';
import Sidebar from '../../Componets/Sidebar';

export default function Login() {
    useTitle("admin_Login");
    const [username, setUsername] = useState(""); // Changed from phone to username
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!username || !password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must enter both username and password!",
            });
            return;
        }

        const data = JSON.stringify({
            "username": username,
            "password": password
        });

        fetch(`${BASE_URL}/api/v1/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                
                const token = result.access_token;
                if (token) {
                    localStorage.setItem('token', token);

                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Login successful!',
                    });
                    navigate("/admin/home");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${result.msg}`,
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
    }

    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />
            <div className="w-1/4 bg-white border-r border-gray-300 p-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Admin Panel</h2>
                <ul>
                    <li className="mb-4">
                        <Link to="/admin/home" className="text-blue-600 hover:text-blue-800">Home</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/admin/transactions" className="text-blue-600 hover:text-blue-800">Transactions</Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/admin/messages" className="text-blue-600 hover:text-blue-800">Messages</Link>
                    </li>
                    {/* Add other sidebar items here */}
                </ul>
            </div>

            {/* Main content area */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-700">Login to your admin Account</h2>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                            <span className="text-xs text-center text-gray-500 uppercase">here</span>
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                        </div>
                        <form className="mt-8 space-y-4" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-gray-700">Your Username</label>
                                <input
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    placeholder="Your username"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" // Changed type to password for security
                                    placeholder="Your password"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm">
                                Login
                            </button>
                            <Link to={"/register"} className="text-blue-600 hover:text-blue-800 mt-4 block text-center">
                                You don't have an account?
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
