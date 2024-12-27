import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config";
import useTitle from "../../Componets/Hook/useTitle";

export const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useTitle("Admin Chat");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/api/v1/admin/messages`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 401) {
                    throw new Error("Unauthorized. Please log  in again.");
                    navigate("/");
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                const mergedMessages = Object.values(
                    data.messages.reduce((acc, message) => {
                        if (!acc[message.user_id]) {
                            acc[message.user_id] = {
                                user_id: message.user_id,
                                username: message.username,
                                messages: [],
                            };
                        }
                        acc[message.user_id].messages.push({
                            content: message.content,
                            created_at: message.created_at,
                            message_id: message.message_id,
                        });
                        return acc;
                    }, {})
                );

                setMessages(mergedMessages);
                setError(null);
            } catch (err) {
                if (err.message === "Unauthorized. Please log in again.") {
                    Swal.fire({
                        icon: "error",
                        title: "Unauthorized",
                        text: "Your session has expired. Please log in again.",
                        confirmButtonText: "OK",
                    }).then(() => {
                        localStorage.removeItem("token"); // Clear the token
                    });
                } else {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, [token]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Empty Message",
                text: "You cannot send an empty message. Please type something!",
                showConfirmButton: true,
            });
            return;
        }

        if (!selectedChat || !selectedMessage) {
            Swal.fire({
                icon: "warning",
                title: "No Chat or Message Selected",
                text: "Please select a chat and a specific message before sending a new message.",
                showConfirmButton: true,
                allowOutsideClick: false,
            });
            return;
        }

        try {
            Swal.fire({
                title: "Sending Message...",
                text: "Please wait while your message is being sent.",
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading(),
            });

            const response = await fetch(
                `${BASE_URL}/api/v1/admin/messages/${selectedMessage.message_id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ content: newMessage }),
                }
            );

            if (response.status === 401) {
                throw new Error("Unauthorized. Please log in again.");
                navigate("/");
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred.");
            }

            const result = await response.json();

            Swal.fire({
                icon: "success",
                title: "Message Sent",
                text: result.message || "Your message has been sent successfully!",
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            if (error.message === "Unauthorized. Please log in again.") {
                Swal.fire({
                    icon: "error",
                    title: "Unauthorized",
                    text: "Your session has expired. Please log in again.",
                    confirmButtonText: "OK",
                }).then(() => {
                    localStorage.removeItem("token");
                    navigate("/");
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message || "Something went wrong. Please try again.",
                });
            }
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900">
            {/* Sidebar */}
            <div className="w-1/3 bg-gray-200 text-gray-900 border-r border-gray-800 overflow-y-auto">
                <Link to="/admin/home">
                    <div className="p-4 text-lg font-bold text-center hover:bg-gray-800 transition">
                        Back to Home
                    </div>
                </Link>
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="w-12 h-12 border-4 border-green-500 border-dotted rounded-full animate-spin"></div>
                            <p className="ml-4 text-green-400 text-lg">Loading Chats...</p>
                        </div>
                    ) : error ? (
                        <div className="p-4 text-red-500 text-center">Error: {error}</div>
                    ) : messages.length > 0 ? (
                        messages.map((chat) => (
                            <div
                                key={chat.user_id}
                                className={`flex items-center p-4 cursor-pointer rounded-lg transition ${selectedChat?.user_id === chat.user_id
                                        ? "bg-gray-700"
                                        : "hover:bg-gray-800"
                                    }`}
                                onClick={() => setSelectedChat(chat)}
                            >
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                    {chat.username[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-medium">{chat.username}</p>
                                    <p className="text-gray-400 text-sm truncate">
                                        {chat.messages[chat.messages.length - 1]?.content}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-gray-500 text-center">No messages available.</div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-100">
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b border-gray-300 text-lg font-semibold">
                            Chat with {selectedChat.username}
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                            {selectedChat.messages.map((msg) => (
                                <div
                                    key={msg.message_id}
                                    className={`flex items-start mb-4 ${selectedMessage?.message_id === msg.message_id
                                            ? "bg-gray-200 rounded-lg p-3"
                                            : ""
                                        }`}
                                    onClick={() => setSelectedMessage(msg)}
                                >
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                        {selectedChat.username[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="bg-gray-100 p-3 rounded-lg text-gray-800 shadow-sm">
                                            {msg.content}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(msg.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-gray-100 border-t border-gray-300">
                            <textarea
                                className="w-full p-3 border rounded-lg focus:outline-none"
                                placeholder="Type your message here..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-green-600"
                                onClick={handleSendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select a chat to start messaging.
                    </div>
                )}
            </div>
        </div>
    );
};
