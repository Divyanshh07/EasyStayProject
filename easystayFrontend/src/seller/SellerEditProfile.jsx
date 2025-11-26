// SellerEditProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SellerEditProfile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        name: "",
        sellerPhone: "",
        sellerAddress: ""
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                sellerPhone: user.sellerPhone || "",
                sellerAddress: user.sellerAddress || ""
            });
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setSaving(true);

        try {
            const res = await axios.put(
                `http://localhost:8081/api/auth/seller/update/${user.id}`,
                form,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            // Backend returns { message, seller }
            localStorage.setItem("user", JSON.stringify(res.data.seller));

            alert("Profile updated successfully!");
            navigate("/seller-dashboard");

        } catch (error) {
            console.error("Update failed:", error.response?.data || error);
            alert("Failed to update profile.");
        }

        setSaving(false);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">

            <button
                className="flex items-center gap-1 text-gray-600 mb-4 hover:text-black"
                onClick={() => navigate(-1)}
            >
                <ArrowLeft size={20} /> Back
            </button>

            <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-5">

                <div>
                    <label className="font-semibold">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                    />
                </div>

                <div>
                    <label className="font-semibold">Phone Number</label>
                    <input
                        type="text"
                        name="sellerPhone"
                        value={form.sellerPhone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                    />
                </div>

                <div>
                    <label className="font-semibold">Address</label>
                    <textarea
                        name="sellerAddress"
                        value={form.sellerAddress}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1"
                        rows="3"
                    ></textarea>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 flex items-center justify-center gap-2"
                >
                    {saving ? "Saving..." : (<><Save size={20}/> Save Changes</>)}
                </button>

            </div>
        </div>
    );
};

export default SellerEditProfile;
