import { useState, FormEvent } from 'react';
import Swal from 'sweetalert2';
import useTitle from '../../Componets/Hook/useTitle';
import { useNavigate } from 'react-router-dom';

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
            username: username,
            password: password, 
        });

        fetch("https://1544-151-244-159-138.ngrok-free.app/api/v1/admin/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
            .then((response) => response.json())
            .then((result) => {
                const token = result.token;
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
                        text: `${result.message}`,
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-8 bg-white flex flex-col justify-center">
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
                            <p>username</p>
                        </div>
                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" // Changed type to password for security
                                placeholder="Your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p>password</p>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
