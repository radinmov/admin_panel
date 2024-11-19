import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null); 
    const [messages, setMessages] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setIsLoading(true); 
                const response = await fetch('http://46.100.94.88:3003/api/v1/admin/messages', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setMessages(data.messages || []);
                setError(null); 
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchMessages();
    }, []);

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
                        messages.map((message) => (
                            <div
                                key={message.message_id}
                                onClick={() => setSelectedChat(message)}
                                className={`flex items-center p-4 cursor-pointer ${
                                    selectedChat?.message_id === message.message_id
                                        ? 'bg-gray-200'
                                        : 'hover:bg-gray-100'
                                }`}
                            >
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                    {message.username[0].toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">{message.username}</p>
                                    <p className="text-gray-500 text-sm truncate">{message.content}</p>
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
                            Chat with {selectedChat.username}
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            <div className="flex items-start mb-4">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                    {selectedChat.username[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-gray-700 bg-gray-100 p-2 rounded-lg">
                                        {selectedChat.content}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {new Date(selectedChat.created_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        Select a chat to view messages
                    </div>
                )}
                {/* Message input */}
                <div className="p-4 border-t border-gray-300 flex items-center">
                    <input
                        type="text"
                        placeholder="Type your message"
                        className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
