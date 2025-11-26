import React from "react";
import { Bell, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
    const navigate = useNavigate();

    return (
        <div className="h-16 bg-white shadow flex justify-between items-center px-6">
            <h2 className="text-xl font-semibold">Admin Panel</h2>

            <div className="flex items-center gap-6">

                {/* 🔔 Notification Bell – Go to Messages Page */}
                <Bell
                    className="text-gray-600 cursor-pointer hover:text-indigo-600"
                    size={26}
                    onClick={() => navigate("/admin-dashboard/messages")}  // ⭐ Now working
                />

                {/* 👤 Profile Button */}
                <UserCircle
                    className="text-gray-600 cursor-pointer hover:text-indigo-600"
                    size={32}
                    onClick={() => navigate("/admin-dashboard/profile")}
                />

            </div>
        </div>
    );
};

export default Topbar;
