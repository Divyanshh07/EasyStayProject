import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Shield } from "lucide-react";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("http://localhost:8081/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage("✅ Signup Successful! Redirecting...");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                const error = await res.json();
                setMessage(error.error || "❌ Signup failed.");
            }
        } catch (err) {
            setMessage("⚠️ Server not responding.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            {/* Card */}
            <div className="w-full max-w-3xl h-[70vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* LEFT IMAGE PANEL */}
                <div className="md:w-1/2 relative">
                    <img
                        src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg"
                        alt="Signup"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-3">
                        <h2 className="text-xl font-semibold leading-tight">Join EasyStay</h2>
                        <p className="text-gray-200 text-xs mt-1 max-w-[180px] leading-snug">
                            Verified properties & trusted sellers.
                        </p>
                    </div>
                </div>

                {/* RIGHT FORM PANEL */}
                <div className="md:w-1/2 p-5 flex flex-col justify-center">

                    <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
                        Create Account
                    </h2>

                    <form className="space-y-3" onSubmit={handleSubmit}>

                        {/* NAME */}
                        <div>
                            <label className="text-gray-600 text-xs">Full Name</label>
                            <div className="flex items-center border rounded-lg px-2 py-1 mt-1">
                                <User size={16} className="text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                    className="w-full ml-2 outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-gray-600 text-xs">Email Address</label>
                            <div className="flex items-center border rounded-lg px-2 py-1 mt-1">
                                <Mail size={16} className="text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    className="w-full ml-2 outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-gray-600 text-xs">Password</label>
                            <div className="flex items-center border rounded-lg px-2 py-1 mt-1">
                                <Lock size={16} className="text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className="w-full ml-2 outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* ROLE */}
                        <div>
                            <label className="text-gray-600 text-xs">Select Role</label>
                            <div className="flex items-center border rounded-lg px-2 py-1 mt-1">
                                <Shield size={16} className="text-gray-400" />
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full ml-2 outline-none bg-transparent text-sm"
                                >
                                    <option value="USER">User</option>
                                    <option value="SELLER">Seller</option>
                                </select>
                            </div>
                        </div>

                        {/* MESSAGE */}
                        {message && (
                            <p
                                className={`text-xs text-center ${
                                    message.startsWith("✅") ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {message}
                            </p>
                        )}

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium text-sm transition ${
                                loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        >
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="mt-2 text-center text-xs">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default Signup;
