import React from "react";
import { User, Mail, Phone, Shield, Edit, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const SellerProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <p className="text-center mt-10 text-gray-600">No user logged in.</p>;
    }

    return (
        <div className="relative max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">

            {/* Edit Button */}
            <Link
                to="/seller-dashboard/editprofile"
                className="absolute top-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2
                hover:bg-indigo-700 transition shadow"
            >
                <Edit size={18} /> Edit Profile
            </Link>

            <h2 className="text-3xl font-bold mb-8 text-gray-800 flex-items-center gap-3">
                <Shield className="text-indigo-600" /> Seller Profile
            </h2>

            <div className="space-y-4">

                {/* NAME */}
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <User className="text-indigo-600" size={28} />
                    <div>
                        <p className="text-gray-400 text-sm">Name</p>
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                    </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <Mail className="text-indigo-600" size={28} />
                    <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <h3 className="text-lg font-semibold">{user.email}</h3>
                    </div>
                </div>

                {/* MOBILE (sellerPhone) */}
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <Phone className="text-indigo-600" size={28} />
                    <div>
                        <p className="text-gray-400 text-sm">Mobile</p>
                        <h3 className="text-lg font-semibold">
                            {user.sellerPhone || "Not Provided"}
                        </h3>
                    </div>
                </div>

                {/* ADDRESS (sellerAddress) */}
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <MapPin className="text-indigo-600" size={28} />
                    <div>
                        <p className="text-gray-400 text-sm">Address</p>
                        <h3 className="text-lg font-semibold">
                            {user.sellerAddress || "Not Provided"}
                        </h3>
                    </div>
                </div>

                {/* ROLE */}
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <Shield className="text-indigo-600" size={28} />
                    <div>
                        <p className="text-gray-400 text-sm">Account Role</p>
                        <h3 className="text-lg font-semibold">{user.role}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerProfile;
