import { useState, FormEvent } from 'react';
import Swal from 'sweetalert2';
import useTitle from '../../Componets/Hook/useTitle';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    useTitle("admin_Login");
    const [phone, setPhone] = useState("");
    const navigate =useNavigate()
    const [password, setpassword] = useState("");

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!phone || !password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must enter both phone number and password!",
            });
            return;
        }

        const data = JSON.stringify({
            phone_number: phone,
            verify_password: password,
        });

        fetch("/api/admin", {
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
                    navigate("/admin/home")
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
                            <label className="block text-gray-700">Your Phone Number</label>
                            <input
                                onChange={(e) => setPhone(e.target.value)}
                                type="text"
                                placeholder="Your phone number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">password</label>
                            <input
                                onChange={(e) => setpassword(e.target.value)}
                                type="text"
                                placeholder="Your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
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
