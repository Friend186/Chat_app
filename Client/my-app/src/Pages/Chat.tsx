import React, { useEffect, useState, useRef, use } from 'react';
import  io  from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library for unique IDs
const socket = io('http://localhost:5050'); // Connect to the server

interface ChatProps {
    index: number;
}

interface Message {
    id: string; // Unique ID for each message
    sender: string;
    text: string;
    timestamp: number;
    room: number;
}

function Chat(props: ChatProps) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]); // Combined messages array
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const userId = useRef<string>(Math.random().toString(36).substring(2, 15)); // Generate a unique ID for the user
    const [room , setRoom] = useState(props.index);

    useEffect(() => {
        const handleIncomingMessage = (message: Message) => {
            setMessages((prev) => {
                // Avoid adding duplicate messages
                if (!prev.find((msg) => msg.id === message.id)) {
                    return [...prev, message];
                }
                return prev;
            });
        };
    
        socket.on('message', handleIncomingMessage);
    
        return () => {
            socket.off('message', handleIncomingMessage); // Clean up the listener
        };
    }, []);
    
    const handleSend = () => {
        if (input.trim() !== '') {
            const message: Message = {
                id: uuidv4(),
                sender: userId.current,
                text: input,
                timestamp: Date.now(),
                room, // Include the room in the message
            };
    
            socket.emit('message', message); // Send the message to the server
            setMessages((prev) => [...prev, message]); // Add the message to the local state
            setInput(''); // Clear the input field
        }
    };

    useEffect(() => {
        // Scroll to the bottom when the component is mounted
        messagesEndRef.current?.scrollIntoView();
    }, [messages]);

    useEffect(() => {
        const previousRoom = room;
        setRoom(props.index);
    
        // Leave previous room first (if it exists)
        if (previousRoom) {
            socket.emit('leave_room', previousRoom);
            console.log(`Left room: ${previousRoom}`);
        }
    
        // Join the new room
        socket.emit('join_room', props.index);
        console.log(`Joined room: ${props.index}`);
    
        // Clear local messages when switching rooms
        setMessages([]);
    
        return () => {
            // Cleanup on unmount
            socket.emit('leave_room', props.index);
            console.log(`Cleanup: left room ${props.index}`);
        };
    }, [props.index]);
    
    

    useEffect(() => {
        // Emit the join_room event to the server
       setRoom(props.index);
    
        // Clear the message history when the room changes
    
        // Optionally, you can fetch the message history for the new room here
        // Example: socket.emit('fetch_history', room);
    
    }, [props.index]);
    return (
        <div className="flex flex-col h-full w-[90%] bg-gray-50 items-center justify-center mx-auto rounded-2xl">
            {/* Messages */}
            <div className="flex flex-col w-full h-full overflow-y-auto p-5 space-y-4 hide-scrollbar border border-solid rounded-2xl border-gray">
                {messages
                    .sort((a, b) => a.timestamp - b.timestamp) // Sort messages by timestamp
                    .map((message) => (
                        <div
                            key={message.id} // Use the unique ID as the key
                            className={`flex ${
                                message.sender === userId.current
                                    ? 'justify-end'
                                    : 'justify-start'
                            }`}
                        >
                            <div
                                className={`p-2 rounded-lg max-w-xs ${
                                    message.sender === userId.current
                                        ? 'bg-blue-300 text-black'
                                        : 'bg-gray-200 text-black'
                                }`}
                            >
                                <div>{message.text}</div>
                                <div
                                    className={`text-xs mt-1 ${
                                        message.sender === userId.current
                                            ? 'text-black' // Black color for user's timestamp
                                            : 'text-gray-500' // Gray color for others' timestamp
                                    }`}
                                >
                                    {new Date(message.timestamp).toLocaleTimeString()} {/* Display timestamp */}
                                </div>
                            </div>
                        </div>
                    ))
                    }
                <div ref={messagesEndRef}></div>
            </div>
            <div className="flex w-full p-4 bg-white border-t border-gray-300">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                    onClick={handleSend}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSend(); // Trigger handleSend when Enter is pressed
                        }
                    }}
                    disabled={input.trim() === ''} // Disable button if input is empty
                    className={`ml-2 px-4 py-2 rounded-lg text-white ${
                        input.trim() === ''
                            ? 'bg-gray-400 cursor-not-allowed' // Disabled style
                            : 'bg-blue-500 hover:bg-blue-600' // Enabled style
                    }`}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chat;