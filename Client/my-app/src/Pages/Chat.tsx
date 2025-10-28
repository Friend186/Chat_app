import React, { useEffect, useState, useContext, useRef } from 'react';
import io from 'socket.io-client';
import { AuthContext } from './App';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchMessages, sentMessage } from '../API/Message';

const socket = io('http://localhost:5050');

export interface Message {
    receiver: string;
    sender: string;
    text: string;
    image: string;
    createdAt?: string;
}

interface ChatProps {
    id: string;
}

function Chat({ id: receiverId }: ChatProps) {
    const { user } = useContext(AuthContext);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [room, setRoom] = useState<string>('');

    // Fetch previous messages
    const { data } = useQuery({
        queryKey: ['messages', receiverId],
        queryFn: () => fetchMessages(receiverId),
    });

    const mutation = useMutation({
        mutationFn: sentMessage,
        onError: (error) => {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        },
    });

    // Socket listener
    useEffect(() => {
        const handleIncomingMessage = (message: Message) => {
            setMessages((prev) => {
                if (
                    !prev.find(
                        (msg) =>
                            msg.sender === message.sender &&
                            msg.text === message.text &&
                            msg.createdAt === message.createdAt
                    )
                ) {
                    return [...prev, message];
                }
                return prev;
            });
        };
        socket.on('message', handleIncomingMessage);
        return () => {
            socket.off('message', handleIncomingMessage);
        };
    }, []);

    // Join room
    useEffect(() => {
        if (user) {
            const roomId = [user._id, receiverId].sort().join('_');
            setRoom(roomId);
            socket.emit('join_room', roomId);
            setMessages([]);
        }
        return () => {
            if (room) socket.emit('leave_room', room);
        };
    }, [receiverId, user]);

    // Populate messages from backend
    useEffect(() => {
        if (data) setMessages(data as Message[]);
    }, [data]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Send message
    const handleSend = () => {
        if (input.trim() !== '' && user) {
            const message: Message = {
                receiver: receiverId,
                sender: user._id,
                text: input,
                image: '',
                createdAt: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, message]);
            mutation.mutate(message);
            socket.emit('message', message);
            setInput('');
        }
    };

    return (
        
        <div className="flex flex-col h-full w-full bg-gray-100 rounded-2xl">
        {/* Message list — scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => {
            const isMine = msg.sender === user?._id;
            return (
              <div
                key={idx}
                className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                    isMine
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border rounded-bl-none'
                  }`}
                >
                  <div className="text-sm leading-relaxed">{msg.text}</div>
                  {msg.createdAt && (
                    <div
                      className={`text-xs mt-1 ${
                        isMine ? 'text-blue-200' : 'text-gray-400'
                      } text-right`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      
        {/* Input bar — always visible */}
        <div className="p-4 bg-white border-t shadow-sm flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
      
      );
      
      
}      

export default Chat;
