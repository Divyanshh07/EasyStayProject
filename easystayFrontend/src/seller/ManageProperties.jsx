import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, X } from "lucide-react";

const ManageProperties = () => {
    const [list, setList] = useState([]);
    const [editData, setEditData] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const sellerEmail = user?.email || "";

    useEffect(() => {
        if (sellerEmail) loadData();
        else setLoading(false);
    }, []);

    // ------------------------------------------------
    // 🔥 LOAD ALL PROPERTIES ADDED BY SELLER
    // ------------------------------------------------
    const loadData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8081/api/properties/seller/${sellerEmail}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            setList(res.data);
        } catch (error) {
            console.error("❌ Error loading properties:", error);
        } finally {
            setLoading(false);
        }
    };

    // ------------------------------------------------
    // 🔥 HANDLE EDIT FIELD
    // ------------------------------------------------
    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // ------------------------------------------------
    // 🔥 UPDATE PROPERTY
    // ------------------------------------------------
    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://localhost:8081/api/properties/update/${editData.id}`,
                editData,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            loadData();
            setEditData(null);
            alert("Property updated successfully!");
        } catch (err) {
            console.log(err);
            alert("Update failed!");
        }
    };

    // ------------------------------------------------
    // 🔥 DELETE PROPERTY
    // ------------------------------------------------
    const handleDelete = async () => {
        try {
            await axios.delete(
                `http://localhost:8081/api/properties/delete/${deleteId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            loadData();
            setDeleteId(null);
            alert("Property deleted successfully!");
        } catch (err) {
            console.log(err);
            alert("Delete failed!");
        }
    };

    if (loading)
        return (
            <p className="text-center py-6 text-gray-500">
                Loading properties...
            </p>
        );

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Manage Your Listings</h2>

            {/* -------------------- TABLE -------------------- */}
            <table className="w-full bg-white rounded-xl shadow overflow-hidden">
                <thead className="bg-gray-100 text-left">
                <tr>
                    <th className="p-3">Image</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Actions</th>
                </tr>
                </thead>

                <tbody>
                {list.map((p) => (
                    <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                        <td className="p-3">
                            <img
                                src={p.imageUrl}
                                onError={(e) =>
                                    (e.target.src = "https://placehold.co/300x200?text=No+Image")
                                }
                                alt=""
                                className="w-20 h-16 object-cover rounded"
                            />
                        </td>

                        <td className="p-3 font-semibold">{p.title}</td>
                        <td className="p-3">{p.city}</td>

                        <td className="p-3 text-indigo-600 font-semibold">
                            ₹{p.price}
                        </td>

                        <td className="p-3 flex gap-4">
                            <button
                                onClick={() => setEditData(p)}
                                className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                                <Pencil size={18} /> Edit
                            </button>

                            <button
                                onClick={() => setDeleteId(p.id)}
                                className="text-red-600 hover:underline flex items-center gap-1"
                            >
                                <Trash2 size={18} /> Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* -------------------- EDIT MODAL -------------------- */}
            <AnimatePresence>
                {editData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl"
                        >
                            {/* Header */}
                            <div className="flex justify-between mb-4">
                                <h3 className="text-lg font-bold">Edit Property</h3>
                                <button onClick={() => setEditData(null)}>
                                    <X size={24} />
                                </button>
                            </div>

                            {/* SCROLLABLE FORM AREA */}
                            <div
                                className="grid gap-3 pr-2"
                                style={{
                                    maxHeight: "70vh",
                                    overflowY: "auto"
                                }}
                            >

                                <input name="title" value={editData.title || ""} onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="Title" />

                                <input name="city" value={editData.city || ""} onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="City" />

                                <input name="locality" value={editData.locality || ""} onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="Locality" />

                                <input name="fullAddress" value={editData.fullAddress || ""} onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="Full Address" />

                                <input name="price" value={editData.price || ""} onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="Price" />

                                <input name="securityDeposit" value={editData.securityDeposit || ""}
                                       onChange={handleEditChange}
                                       className="border p-2 rounded"
                                       placeholder="Security Deposit" />

                                <input name="type" value={editData.type || ""} onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="Type (Flat, PG, House)" />

                                <input name="listingType" value={editData.listingType || ""} onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="Listing Type (Buy/Rent/PG)" />

                                <textarea name="description" value={editData.description || ""} onChange={handleEditChange}
                                          rows={3} className="border p-2 rounded" placeholder="Description"></textarea>

                                <input name="imageUrl" value={editData.imageUrl || ""} onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="Image URL" />

                                <input name="locationUrl" value={editData.locationUrl || ""}
                                       onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="Google Maps URL" />

                                <input name="latitude" value={editData.latitude || ""} onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="Latitude" />

                                <input name="longitude" value={editData.longitude || ""} onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="Longitude" />

                                <input name="status" value={editData.status || ""} onChange={handleEditChange}
                                       className="border p-2 rounded" placeholder="Status" />

                            </div>

                            <button
                                onClick={handleUpdate}
                                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg w-full"
                            >
                                Update
                            </button>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* -------------------- DELETE MODAL -------------------- */}
            <AnimatePresence>
                {deleteId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center"
                        >
                            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>

                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this property?
                            </p>

                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={() => setDeleteId(null)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageProperties;
