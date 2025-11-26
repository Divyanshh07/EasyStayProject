// seller/SellerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Building2, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    // -------------------------------------------------
    // ✔ Correct fields from backend
    // -------------------------------------------------
    const sellerEmail = user?.sellerEmail || user?.email || "";
    const sellerPhone = user?.sellerPhone || user?.phone || "";

    useEffect(() => {
        if (!sellerEmail) {
            console.warn("⚠ No sellerEmail found in user object");
            setLoading(false);
            return;
        }
        loadData();
    }, []);

    // -------------------------------------------------
    // 🔥 Fetch properties added by this seller
    // -------------------------------------------------
    const loadData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8081/api/properties/seller/${sellerEmail}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setList(res.data);
        } catch (error) {
            console.error(
                "❌ Error loading seller properties:",
                error.response?.data || error
            );
        } finally {
            setLoading(false);
        }
    };

    // -------------------------------------------------
    // LOADING UI
    // -------------------------------------------------
    if (loading) {
        return (
            <p className="p-4 text-gray-500 text-center">
                Loading your properties...
            </p>
        );
    }

    // -------------------------------------------------
    // MISSING PHONE → Ask seller to complete profile
    // -------------------------------------------------
    if (!sellerPhone) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-600 mb-4">
                    Please complete your seller profile to view your properties.
                </p>
                <button
                    onClick={() => navigate("/seller-dashboard/editprofile")}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
                >
                    Complete Profile
                </button>
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">
                    Welcome, {user?.name}
                </h1>

                <button
                    onClick={() => navigate("/seller-dashboard/add-property")}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow"
                >
                    <PlusCircle size={20} />
                    Add Property
                </button>
            </div>

            {/* DASHBOARD STATS */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-indigo-600 text-white rounded-xl shadow-xl flex items-center gap-4"
                >
                    <Building2 size={40} />
                    <div>
                        <h2 className="text-3xl font-bold">{list.length}</h2>
                        <p>Your Listings</p>
                    </div>
                </motion.div>
            </div>

            {/* RECENTLY ADDED */}
            <h2 className="text-xl font-semibold mb-4">
                Added Properties
            </h2>

            {list.length === 0 ? (
                <p className="text-gray-500">
                    You have not added any property yet.
                </p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((p) => (
                        <motion.div
                            key={p.id}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white rounded-xl shadow-lg cursor-pointer"
                            onClick={() => navigate(`/property/${p.id}`)}
                        >
                            <img
                                src={p.imageUrl}
                                onError={(e) =>
                                    (e.target.src =
                                        "https://placehold.co/400x300?text=No+Image")
                                }
                                className="h-44 w-full object-cover rounded-t-xl"
                                alt={p.title}
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{p.title}</h3>
                                <p className="text-gray-600">{p.city}</p>
                                <p className="text-indigo-600 font-bold mt-1">
                                    ₹ {p.price}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SellerDashboard;
