import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Mail, Shield, Plus, Edit, Trash2, X } from "lucide-react";

const RecentUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // MODAL STATES
    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        role: "USER",
        phone: "",
        password: "",
    });

    // Fetch ONLY USERS (no sellers, no admin)
    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/auth/all");

            // ONLY USERS
            const filtered = res.data.filter((u) => u.role === "USER");

            setUsers(filtered);
        } catch (err) {
            console.log("Error fetching users:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // -------------------------
    // HANDLE INPUT CHANGE
    // -------------------------
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // -------------------------
    // OPEN ADD USER MODAL
    // -------------------------
    const openAddModal = () => {
        setFormData({
            id: "",
            name: "",
            email: "",
            role: "USER", // fixed: user only
            phone: "",
            password: "",
        });
        setIsEdit(false);
        setModalOpen(true);
    };

    // -------------------------
    // OPEN EDIT MODAL
    // -------------------------
    const openEditModal = (u) => {
        setFormData({
            id: u.id,
            name: u.name,
            email: u.email,
            role: "USER", // fixed to USER
            phone: u.phone,
            password: "",
        });
        setIsEdit(true);
        setModalOpen(true);
    };

    // -------------------------
    // SAVE USER (ADD / EDIT)
    // -------------------------
    const saveUser = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await axios.put(
                    `http://localhost:8081/api/auth/update/${formData.id}`,
                    formData
                );
            } else {
                await axios.post("http://localhost:8081/api/auth/signup", formData);
            }

            setModalOpen(false);
            fetchUsers();
        } catch (error) {
            console.log("Error saving user:", error);
        }
    };

    // -------------------------
    // DELETE USER
    // -------------------------
    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`http://localhost:8081/api/auth/delete/${id}`);
            fetchUsers();
        } catch (err) {
            console.log("Error deleting user:", err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                    <User className="text-indigo-600" /> Manage Users
                </h3>

                {/* ADD USER BUTTON */}
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                    <Plus size={18} /> Add User
                </button>
            </div>

            {loading ? (
                <p className="text-gray-500 text-center py-4">Loading...</p>
            ) : users.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No users found.</p>
            ) : (
                <ul className="space-y-4">
                    {users.map((u) => (
                        <li
                            key={u.id}
                            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition"
                        >
                            <div>
                                <p className="font-semibold">{u.name}</p>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <Mail size={14} /> {u.email}
                                </p>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                    <Shield size={14} /> USER
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* EDIT BUTTON */}
                                <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => openEditModal(u)}
                                >
                                    <Edit size={18} />
                                </button>

                                {/* DELETE BUTTON */}
                                <button
                                    className="text-red-600 hover:text-red-800"
                                    onClick={() => deleteUser(u.id)}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {/* ---------------- ADD / EDIT USER MODAL ---------------- */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">

                        <button
                            className="absolute top-3 right-3"
                            onClick={() => setModalOpen(false)}
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4">
                            {isEdit ? "Edit User" : "Add New User"}
                        </h2>

                        <form onSubmit={saveUser} className="space-y-3">

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full border p-2 rounded"
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border p-2 rounded"
                                required
                            />

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full border p-2 rounded"
                            />

                            {/* ROLE is fixed to USER only */}
                            <input
                                type="text"
                                value="USER"
                                disabled
                                className="w-full border p-2 rounded bg-gray-100 text-gray-500"
                            />

                            {!isEdit && (
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            )}

                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                            >
                                {isEdit ? "Update User" : "Add User"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentUsers;
