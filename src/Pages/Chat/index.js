import React, { useState } from 'react';

export const Chat = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    // List of contacts (example data)
    const contacts = [
        { id: 1, name: 'hidekimatsui', message: 'Can you help me?' },
        { id: 2, name: 'dexterfowler', message: 'I’d like to...' },
        { id: 3, name: 'stephenspeilborghs', message: 'How do I...?' },
        { id: 4, name: 'dantebichette', message: 'My balance is too high' },
        { id: 5, name: 'mattholliday', message: 'Nothing yet...' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar for chat list */}
            <div className="w-1/4 bg-white border-r border-gray-300 overflow-y-auto">
                <div className="p-4 font-bold text-lg text-gray-700">Administrator</div>
                <div className="space-y-2">
                    {/* Chat contacts */}
                    {contacts.map((contact) => (
                        <div 
                            key={contact.id} 
                            onClick={() => setSelectedChat(contact)} // Set selected chat on click
                            className={`flex items-center p-4 cursor-pointer ${selectedChat?.id === contact.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                        >
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                {contact.name[0].toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-800 font-medium">Chat with {contact.name}</p>
                                <p className="text-gray-500 text-sm truncate">{contact.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main chat area */}
            <div className="flex-1 flex flex-col bg-white">
                {selectedChat ? (
                    <>
                        <div className="border-b border-gray-300 p-4 font-semibold text-gray-800">
                            Chat with {selectedChat.name}
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            {/* Messages */}
                            <div className="flex items-start mb-4">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                                    {selectedChat.name[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-gray-700 bg-gray-100 p-2 rounded-lg">
                                        {selectedChat.message}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">Today at 5:17 PM</p>
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
