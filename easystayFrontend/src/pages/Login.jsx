import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8081/api/auth/login", form);
            const user = res.data.user;
            const token = res.data.token;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setMessage("Login Successful 🎉");

            setTimeout(() => {
                if (user.role === "ADMIN") navigate("/admin-dashboard");
                else if (user.role === "SELLER") navigate("/seller-dashboard");
                else navigate("/");
            }, 1000);

        } catch (err) {
            setMessage("Invalid Email or Password ❌");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            {/* Card */}
            <div className="w-full max-w-3xl h-[70vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* LEFT IMAGE PANEL */}
                <div className="md:w-1/2 relative">
                    <img
                        src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
                        alt="login"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-3">
                        <h2 className="text-xl font-semibold leading-tight">Welcome Back</h2>
                        <p className="text-gray-200 text-xs mt-1 max-w-[180px] leading-snug">
                            Login to continue exploring verified homes.
                        </p>
                    </div>
                </div>

                {/* RIGHT FORM PANEL */}
                <div className="md:w-1/2 p-5 flex flex-col justify-center">

                    <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
                        Login to EasyStay
                    </h2>

                    <form className="space-y-3" onSubmit={handleLogin}>

                        {/* EMAIL */}
                        <div>
                            <label className="text-gray-600 text-xs">Email Address</label>
                            <div className="flex items-center border rounded-lg px-2 py-1 mt-1">
                                <Mail size={16} className="text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
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
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your password"
                                    className="w-full ml-2 outline-none text-sm"
                                />
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium text-sm transition"
                        >
                            Login
                        </button>
                    </form>

                    {/* MESSAGE */}
                    {message && (
                        <p
                            className={`text-xs text-center mt-2 ${
                                message.includes("Successful")
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {message}
                        </p>
                    )}

                    {/* SIGNUP LINK */}
                    <p className="mt-3 text-center text-xs">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-indigo-600 hover:underline"
                        >
                            Create Account
                        </Link>
                    </p>

                </div>
            </div>

        </div>
    );
};

export default Login;
