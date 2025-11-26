// ContactPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const API_BASE = "http://localhost:8081"; // ← change this to your backend URL

const ContactPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', text: '' }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setFeedback({ type: "error", text: "Please fill name, email and message." });
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setFeedback({ type: "error", text: "Please enter a valid email address." });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);
        if (!validate()) return;

        setLoading(true);
        try {
            const payload = {
                name: form.name.trim(),
                email: form.email.trim(),
                subject: form.subject.trim(),
                message: form.message.trim(),
            };

            await axios.post(`${API_BASE}/api/contact/send`, payload, {
                headers: { "Content-Type": "application/json" },
            });

            setFeedback({ type: "success", text: "Message sent — we'll get back to you shortly!" });
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (err) {
            console.error("Contact send error:", err);
            const serverMsg = err?.response?.data || err.message || "Failed to send message.";
            setFeedback({ type: "error", text: `Error: ${serverMsg}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 text-gray-800 pt-16">
            {/* HEADER */}
            <section className="bg-blue-600 text-white py-20 px-6 text-center shadow-md">
                <h1 className="text-4xl font-extrabold">Contact Us</h1>
                <p className="mt-3 text-lg opacity-90">We’re here to assist you with all your property needs.</p>
            </section>

            <section className="max-w-7xl mx-auto py-20 px-6">
                {/* INTRO */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-3xl font-bold text-blue-700 mb-4">Get In Touch</h2>
                    <p className="text-lg leading-8 text-gray-700">
                        Have a question? Need support? Our team is ready to help you with renting, buying, selling or agreements.
                    </p>
                </motion.div>

                {/* CONTACT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg border"
                    >
                        <h3 className="text-xl font-bold text-blue-600 mb-3">Email Us</h3>
                        <p className="text-gray-700 leading-7">support@easystay.com</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg border"
                    >
                        <h3 className="text-xl font-bold text-blue-600 mb-3">Call Us</h3>
                        <p className="text-gray-700 leading-7">+91 9876543210</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg border"
                    >
                        <h3 className="text-xl font-bold text-blue-600 mb-3">Office Address</h3>
                        <p className="text-gray-700 leading-7">Sector 62, Noida, Uttar Pradesh, India</p>
                    </motion.div>
                </div>

                {/* FORM */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 bg-blue-50 rounded-2xl p-10 shadow-inner border"
                >
                    <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Send Us a Message</h2>

                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Your Name</span>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-3 mt-2 border rounded-lg shadow-sm"
                                aria-label="Your name"
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Your Email</span>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full p-3 mt-2 border rounded-lg shadow-sm"
                                aria-label="Your email"
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Subject (optional)</span>
                            <input
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                type="text"
                                placeholder="Subject"
                                className="w-full p-3 mt-2 border rounded-lg shadow-sm"
                                aria-label="Subject"
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-gray-700">Message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows="6"
                                placeholder="Write your message..."
                                className="w-full p-3 mt-2 border rounded-lg shadow-sm"
                                aria-label="Message"
                                required
                            />
                        </label>

                        {feedback && (
                            <div
                                role="status"
                                className={
                                    feedback.type === "success"
                                        ? "text-green-700 bg-green-100 p-3 rounded"
                                        : "text-red-700 bg-red-100 p-3 rounded"
                                }
                            >
                                {feedback.text}
                            </div>
                        )}

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition mx-auto block disabled:opacity-60"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </motion.button>
                    </form>
                </motion.div>
            </section>
        </div>
    );
};

export default ContactPage;
