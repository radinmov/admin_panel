import { useState, FormEvent, useEffect } from 'react';
import Swal from 'sweetalert2';
import useTitle from '../../Componets/Hook/useTitle';
import {  useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';

export default function Login() {
    useTitle("admin_Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            Swal.fire({
                icon: 'question',
                title: 'You are already logged in',
                text: 'Do you want to continue with the current session?',
                showCancelButton: true,
                confirmButtonText: 'Yes, take me to the dashboard',
                cancelButtonText: 'No, log in again',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/admin/home');
                } else {
                    localStorage.removeItem('token');
                }
            });
        }
    }, [navigate]);

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

        const data = JSON.stringify({ username, password });

        fetch(`${BASE_URL}/api/v1/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
            .then((response) => response.json())
            .then((result) => {
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
        <div className="h-screen bg-black text-lime-500 flex items-center justify-center">
            <div className="flex flex-col bg-black shadow-lg rounded-lg overflow-hidden max-w-md w-full border border-lime-500 h-[350px] w-[390px]">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-lime-500 text-center">Login to Your Admin Account</h2>
                    <form className="mt-8 space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-lime-500">Your Username</label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Your username"
                                className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-lime-500"
                            />
                        </div>
                        <div>
                            <label className="block text-lime-500">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Your password"
                                className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-lime-500"
                            />
                        </div>
                        <button type="submit" className="w-full bg-lime-500 text-black py-2 rounded-lg text-sm hover:bg-lime-400">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
