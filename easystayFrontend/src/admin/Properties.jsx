import React, { useEffect, useState } from "react";
import axios from "axios";
import AddPropertyModal from "./AddPropertyModel";
import { Pencil, Trash2 } from "lucide-react";

const Properties = () => {
    const [open, setOpen] = useState(false);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all properties
    const fetchProperties = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/properties/all");
            setProperties(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching properties:", err);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    // Delete Property
    const deleteProperty = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this property?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8081/api/properties/delete/${id}`);
            alert("Property deleted successfully!");
            fetchProperties();
        } catch (err) {
            alert("Error deleting property.");
            console.log(err);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Properties</h2>

                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
                >
                    + Add Property
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full">
                    <thead className="bg-gray-200">
                    <tr className="text-left">
                        <th className="p-3">Title</th>
                        <th className="p-3">City</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="text-center p-4">Loading...</td>
                        </tr>
                    ) : properties.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center p-4 text-gray-500">
                                No properties available.
                            </td>
                        </tr>
                    ) : (
                        properties.map((p) => (
                            <tr key={p.id} className="border-b hover:bg-gray-50">
                                <td className="p-3 font-medium">{p.title}</td>
                                <td className="p-3">{p.city}</td>
                                <td className="p-3">{p.listingType}</td>
                                <td className="p-3">₹ {p.price.toLocaleString()}</td>
                                <td className="p-3">{p.status}</td>

                                {/* Actions */}
                                <td className="p-3 flex justify-center gap-3">
                                    {/* Edit Button */}
                                    <button
                                        className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded text-white"
                                    >
                                        <Pencil size={18} />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => deleteProperty(p.id)}
                                        className="p-2 bg-red-500 hover:bg-red-600 rounded text-white"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Add Property Modal */}
            {open && <AddPropertyModal close={() => setOpen(false)} refresh={fetchProperties} />}
        </div>
    );
};

export default Properties;
