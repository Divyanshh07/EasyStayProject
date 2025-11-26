import React, { useState, useEffect } from "react";
import { Pencil, Trash2, UserPlus } from "lucide-react";

const Sellers = () => {

    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        sellerPhone: "",
        sellerAddress: "",
        password: "",
        role: "SELLER"
    });

    // -------------------------------
    // Fetch only SELLERS
    // -------------------------------
    const fetchSellers = async () => {
        try {
            const res = await fetch("http://localhost:8081/api/auth/role/SELLER");
            const data = await res.json();
            setSellers(data);
        } catch (error) {
            console.error("Error fetching sellers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []);


    // -------------------------------
    // Handle Inputs
    // -------------------------------
    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    // -------------------------------
    // Add Seller Modal
    // -------------------------------
    const openAddModal = () => {
        setEditMode(false);
        setFormData({
            id: "",
            name: "",
            email: "",
            sellerPhone: "",
            sellerAddress: "",
            password: "",
            role: "SELLER"
        });
        setModalOpen(true);
    };


    // -------------------------------
    // Edit Seller Modal
    // -------------------------------
    const openEditModal = (seller) => {
        setEditMode(true);
        setFormData({
            id: seller.id,
            name: seller.name,
            email: seller.email,
            sellerPhone: seller.sellerPhone,
            sellerAddress: seller.sellerAddress,
            password: "",
            role: "SELLER"
        });
        setModalOpen(true);
    };


    // -------------------------------
    // Save (Add / Update Seller)
    // -------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editMode) {
                // Update seller only name, phone & address
                await fetch(`http://localhost:8081/api/auth/seller/update/${formData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: formData.name,
                        sellerPhone: formData.sellerPhone,
                        sellerAddress: formData.sellerAddress
                    }),
                });
            } else {
                // ADD new seller
                await fetch("http://localhost:8081/api/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
            }

            fetchSellers();
            setModalOpen(false);

        } catch (error) {
            console.error("Error saving seller:", error);
        }
    };


    // -------------------------------
    // Delete Seller
    // -------------------------------
    const deleteSeller = async (id) => {
        if (!window.confirm("Are you sure you want to delete this seller?")) return;

        try {
            await fetch(`http://localhost:8081/api/auth/delete/${id}`, {
                method: "DELETE",
            });

            setSellers((prev) => prev.filter((s) => s.id !== id));

        } catch (error) {
            console.error("Error deleting seller:", error);
        }
    };


    // -------------------------------
    // UI
    // -------------------------------
    return (
        <div className="p-6">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Sellers</h2>

                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    <UserPlus size={20} /> Add Seller
                </button>
            </div>


            {/* Sellers Table */}
            <div className="bg-white shadow-md rounded-lg p-4">
                {loading ? (
                    <p className="text-center py-4">Loading sellers...</p>
                ) : sellers.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">No sellers found.</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Address</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {sellers.map((seller) => (
                            <tr key={seller.id} className="border-b">
                                <td className="p-3">{seller.name}</td>
                                <td className="p-3">{seller.email}</td>

                                {/* Correct fields */}
                                <td className="p-3">{seller.sellerPhone}</td>
                                <td className="p-3">{seller.sellerAddress}</td>

                                <td className="p-3 flex justify-center gap-3">
                                    <button
                                        onClick={() => openEditModal(seller)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <Pencil size={20} />
                                    </button>

                                    <button
                                        onClick={() => deleteSeller(seller.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>


            {/* ADD / EDIT MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-4">

                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">

                        <h3 className="text-xl font-bold mb-4">
                            {editMode ? "Edit Seller" : "Add Seller"}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-3">

                            <input
                                type="text"
                                name="name"
                                placeholder="Seller Name"
                                value={formData.name}
                                onChange={handleInput}
                                required
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInput}
                                required={!editMode}
                                disabled={editMode}
                                className="w-full border p-2 rounded bg-gray-100"
                            />

                            <input
                                type="text"
                                name="sellerPhone"
                                placeholder="Phone Number"
                                value={formData.sellerPhone}
                                onChange={handleInput}
                                required
                                className="w-full border p-2 rounded"
                            />

                            <input
                                type="text"
                                name="sellerAddress"
                                placeholder="Address"
                                value={formData.sellerAddress}
                                onChange={handleInput}
                                className="w-full border p-2 rounded"
                            />

                            {!editMode && (
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInput}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            )}

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    {editMode ? "Update" : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            )}

        </div>
    );
};

export default Sellers;
