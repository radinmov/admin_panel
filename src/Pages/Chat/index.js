import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config";

export const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null); // The currently selected chat
    const [messages, setMessages] = useState([]); // Merged messages grouped by user_id
    const [newMessage, setNewMessage] = useState(""); // The new message to send
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    // Fetch messages on mount
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

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Merge messages with the same user_id
                const mergedMessages = Object.values(
                    data.messages.reduce((acc, message) => {
                        if (!acc[message.user_id]) {
                            acc[message.user_id] = {
                                user_id: message.user_id,
                                username: message.username,
                                messages: [], // Initialize an array to hold all messages from this user
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
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
    }, [token]);

    // Handle sending a message
    const handleSendMessage = async () => {
        if (!newMessage.trim()) {
            return; // Prevent sending an empty message
        }

        if (!selectedChat) {
            Swal.fire({
                icon: "warning",
                title: "No Chat Selected",
                text: "Please select a chat before sending a message.",
            });
            return;
        }

        try {
            // Show the loader using Swal
            Swal.fire({
                title: "Sending Message...",
                text: "Please wait while your message is being sent.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading(); // Activate the loading spinner
                },
            });

            const response = await fetch(
                `${BASE_URL}/api/v1/admin/messages/${selectedChat.user_id}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ content: newMessage }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred.");
            }

            const result = await response.json();

            // Hide the loader and show success message
            Swal.fire({
                icon: "success",
                title: "Message Sent",
                text: result.message || "Your message has been sent successfully!",
            }).then(() => {
                // Refresh the page after the success message
                window.location.reload();
            });

        } catch (error) {
            console.error(error);

            // Hide the loader and show error message
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong. Please try again.",
            });
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r border-gray-300 overflow-y-auto">
                <Link to={"/admin/home"}>
                    <div className="p-4 font-bold text-lg text-gray-700">Back to Home</div>
                </Link>
                <div className="space-y-2">
                    {isLoading ? (
                        <div className="p-4 text-gray-500">Loading messages...</div>
                    ) : error ? (
                        <div className="p-4 text-red-500">Error: {error}</div>
                    ) : messages.length > 0 ? (
                        messages.map((chat) => (
                            <div
                                key={chat.user_id}
                                className={`flex items-center p-4 cursor-pointer ${
                                    selectedChat?.user_id === chat.user_id
                                        ? "bg-gray-200"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => setSelectedChat(chat)}
                            >
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                    {chat.username[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-gray-800 font-medium">{chat.username}</p>
                                    <p className="text-gray-500 text-sm truncate">
                                        {chat.messages[chat.messages.length - 1]?.content}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-gray-500">No messages available.</div>
                    )}
                </div>
            </div>

            {/* Main chat area */}
            <div className="flex-1 flex flex-col bg-white">
                {selectedChat ? (
                    <>
                        <div className="border-b border-gray-300 p-4 font-semibold text-gray-800">
                            Chat with {selectedChat.username} ({selectedChat.user_id})
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            {selectedChat.messages.map((msg, index) => (
                                <div key={msg.message_id || index} className="flex items-start mb-4">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                        {selectedChat.username[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-gray-700 bg-gray-100 p-2 rounded-lg">
                                            {msg.content}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(msg.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-300 flex items-center">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Send message on pressing Enter
                                placeholder="Type your message"
                                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600"
                            >
                                Send
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Select a chat to view messages
                    </div>
                )}
            </div>
        </div>
    );
};
