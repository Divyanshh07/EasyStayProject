import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_BASE = "http://localhost:8081";

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadMessages = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/admin/messages`);
            setMessages(res.data);
        } catch (err) {
            console.error("Failed to load messages:", err);
        }
        setLoading(false);
    };

    const deleteMessage = async (id) => {
        if (!window.confirm("Delete this message?")) return;

        try {
            await axios.delete(`${API_BASE}/api/admin/messages/${id}`);
            setMessages(messages.filter((m) => m.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    if (loading)
        return <div className="text-center py-20 text-xl font-semibold">Loading messages…</div>;

    return (
        <div className="pt-20 max-w-6xl mx-auto px-6">
            <h1 className="text-4xl font-bold text-blue-700 mb-10 text-center">User Messages</h1>

            {messages.length === 0 ? (
                <div className="text-center text-gray-500 text-lg">No messages found.</div>
            ) : (
                <div className="grid gap-6">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white p-6 rounded-xl shadow-md border"
                        >
                            <div className="flex justify-between">
                                <h2 className="text-xl font-bold text-blue-600">{msg.subject || "No Subject"}</h2>
                                <button
                                    onClick={() => deleteMessage(msg.id)}
                                    className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>

                            <p className="mt-2 text-gray-700">
                                <strong>Name:</strong> {msg.name}
                            </p>
                            <p className="text-gray-700">
                                <strong>Email:</strong> {msg.email}
                            </p>

                            <p className="mt-3 text-gray-800 border-l-4 border-blue-600 pl-3">
                                {msg.message}
                            </p>

                            <p className="mt-4 text-gray-500 text-sm">
                                Received: {new Date(msg.createdAt).toLocaleString()}
                            </p>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminMessages;
