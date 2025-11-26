import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    Edit,
    Shield,
    XCircle,
    ArrowLeft
} from "lucide-react";

const AdminProfile = () => {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const [editModal, setEditModal] = useState(false);
    const [form, setForm] = useState({
        id: "",
        name: "",
        email: "",
        phone: ""
    });

    // FETCH ADMIN
    const fetchAdmin = async () => {
        try {
            const res = await fetch("http://localhost:8081/api/auth/all");
            const data = await res.json();

            const adminUser = data.find((u) => u.role === "ADMIN");

            if (adminUser) {
                setAdmin(adminUser);
                setForm(adminUser);
            }
        } catch (err) {
            console.error("Error loading admin:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmin();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const updateAdmin = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:8081/api/auth/update/${form.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            setEditModal(false);
            fetchAdmin();
        } catch (err) {
            console.error("Error updating admin:", err);
        }
    };

    if (loading)
        return <p className="p-6 text-center text-lg">Loading profile...</p>;

    if (!admin)
        return <p className="p-6 text-center text-red-600">Admin not found!</p>;

    return (
        <div className="p-6 space-y-8">

            {/* BACK BUTTON */}
            <button
                onClick={() => navigate("/admin-dashboard")}
                className="flex items-center gap-2 mb-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
                <ArrowLeft size={20} /> Back to Dashboard
            </button>

            {/* HEADER BANNER */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 rounded-xl shadow-md text-white flex items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur">
                    <User size={70} className="text-white" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold">{admin.name}</h1>
                    <p className="text-lg opacity-90">Administrator</p>
                </div>
            </div>

            {/* PROFILE DETAILS CARD */}
            <div className="bg-white p-8 rounded-xl shadow-md border">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Profile Information</h2>

                    <button
                        onClick={() => setEditModal(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                    >
                        <Edit size={18} /> Edit Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <ProfileItem
                        icon={<User size={24} />}
                        label="Full Name"
                        value={admin.name}
                    />

                    <ProfileItem
                        icon={<Mail size={24} />}
                        label="Email"
                        value={admin.email}
                    />

                    <ProfileItem
                        icon={<Phone size={24} />}
                        label="Phone"
                        value={admin.phone || "Not Provided"}
                    />

                    <ProfileItem
                        icon={<Shield size={24} />}
                        label="Role"
                        value={admin.role}
                    />

                </div>
            </div>

            {/* EDIT MODAL */}
            {editModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">
                    <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-xl relative">

                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                            onClick={() => setEditModal(false)}
                        >
                            <XCircle size={24} />
                        </button>

                        <h3 className="text-xl font-bold mb-4">Edit Admin Profile</h3>

                        <form onSubmit={updateAdmin} className="space-y-4">

                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                                placeholder="Full Name"
                            />

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                                placeholder="Email Address"
                            />

                            <input
                                type="text"
                                name="phone"
                                value={form.phone || ""}
                                onChange={handleChange}
                                className="w-full border p-3 rounded"
                                placeholder="Phone Number"
                            />

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 text-lg"
                            >
                                Update Profile
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const ProfileItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg border">
        <div className="text-indigo-600">{icon}</div>
        <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <p className="text-xl font-semibold">{value}</p>
        </div>
    </div>
);

export default AdminProfile;
