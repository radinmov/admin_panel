import React from "react";
import { useNavigate } from "react-router-dom";
import { useTokenHandling } from "../token_handling";

const Sidebar = () => {
    const navigate = useNavigate();
    const { checkToken } = useTokenHandling(); 

    const handleNavigation = (url) => {
        if (!checkToken()) return; 
        navigate(url); 
    };

    return (
        <div className="w-64 h-screen bg-black text-lime-500 p-4 fixed">
            <div className="text-2xl font-bold mb-8 text-center uppercase border-b border-lime-500 pb-4 text-white">
                adminpanel
            </div>
            <nav>
                <ul className="space-y-6">
                    <li>
                        <button
                            onClick={() => navigate('/')}
                            className="hover:text-white font-bold text-lg w-full text-left"
                        >
                            Login
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation("/admin/home")}
                            className="hover:text-white font-bold text-lg w-full text-left"
                        >
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation("/admin/Investemnt")}
                            className="hover:text-white font-bold text-lg w-full text-left"
                        >
                            Investment
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation("/admin/Investemnt/update")}
                            className="hover:text-white font-bold text-lg w-full text-left"
                        >
                            Update Investment
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation("/admin/chat")}
                            className="hover:text-white font-bold text-lg w-full text-left"
                        >
                            Chat
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation("/admin/unconfirmed-transactions")}
                            className="hover:text-white font-bold text-lg w-full text-left"
                        >
                            Unconfirmed Transactions
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => handleNavigation("/admin/settings")}
                            className="hover:text-white font-bold text-lg w-full text-left"
                        >
                            Settings (levels)
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="absolute bottom-4 w-full text-center text-lime-500 text-sm">
                &copy; 2024 Admin Panel
            </div>
        </div>
    );
};

export default Sidebar;
