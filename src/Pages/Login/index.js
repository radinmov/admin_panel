import { useState, useEffect, FormEvent } from 'react';
import Swal from 'sweetalert2';
import useTitle from '../../Componets/Hook/useTitle';

export default function Login() {
    const title = useTitle("admin_Login")
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const auth_inputs = [
            { name: "phone", value: phone },
            { name: "Code", value: code }
        ];

        for (const field of auth_inputs) {
            if (!field.value || field.value.length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You must enter something...",
                });
                return;
            }
        }

        const data = JSON.stringify({
            phone_number: phone,
            verify_code: code,
        });

        fetch("http://195.248.242.69:5006/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
            .then((response) => response.json())
            .then((result) => {
                let token = result.token;

                if (token) {
                    if (token.startsWith("b'") || token.startsWith('b"')) {
                        token = token.slice(2, -1);
                    }



                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Login successful!',
                    });
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
                            <label className="block text-gray-700">Your User Name</label>
                            <input
                                onChange={(e) => setPhone(e.target.value)}
                                type="text"
                                placeholder="Your phone number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">PassWord</label>
                            <input
                                onChange={(e) => setCode(e.target.value)}
                                type="text"
                                placeholder="Your code"
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
