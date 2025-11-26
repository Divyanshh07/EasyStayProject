import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard, Home, Users, BarChart, Settings, UserCog, LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={22}/>, path: "/admin-dashboard" },
    { id: "properties", label: "Properties", icon: <Home size={22}/>, path: "/admin-dashboard/properties" },
    { id: "users", label: "Users", icon: <Users size={22}/>, path: "/admin-dashboard/users" },
    { id: "sellers", label: "Sellers", icon: <UserCog size={22}/>, path: "/admin-dashboard/sellers" },
    { id: "reports", label: "Reports", icon: <BarChart size={22}/>, path: "/admin-dashboard/reports" },
    { id: "settings", label: "Settings", icon: <Settings size={22}/>, path: "/admin-dashboard/settings" },
];

const Sidebar = ({ activePage, setActivePage }) => {
    const [expanded, setExpanded] = useState(true);
    const navigate = useNavigate();

    // LOGOUT HANDLER
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <motion.div
            animate={{ width: expanded ? 240 : 80 }}
            className="h-full bg-white shadow-2xl border-r border-gray-200 pt-6 flex flex-col relative"
        >

            {/* Logo */}
            <div className="text-center text-indigo-600 font-bold text-2xl">
                {expanded ? "EasyStay Admin" : "ES"}
            </div>

            {/* Menu */}
            <nav className="mt-10 flex flex-col gap-2 flex-grow">
                {menuItems.map((item) => (
                    <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => {
                            setActivePage(item.id);
                            navigate(item.path);    // ⭐ Navigate to page
                        }}
                        className={`cursor-pointer flex items-center gap-4 px-4 py-3 rounded-lg 
                            ${
                            activePage === item.id
                                ? "bg-indigo-600 text-white shadow-lg"
                                : "hover:bg-gray-100 text-gray-700"
                        }`}
                    >
                        {item.icon}
                        {expanded && <span className="font-medium">{item.label}</span>}
                    </motion.div>
                ))}
            </nav>

            {/* Logout Button */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="cursor-pointer flex items-center gap-4 px-4 py-3 mb-6 mx-3 rounded-lg
                bg-red-500 text-white shadow-lg hover:bg-red-600"
            >
                <LogOut size={22} />
                {expanded && <span className="font-medium">Logout</span>}
            </motion.div>

            {/* Collapse Button */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="absolute -right-3 top-8 bg-indigo-600 text-white p-2 rounded-full shadow-lg"
            >
                {expanded ? "<" : ">"}
            </button>
        </motion.div>
    );
};

export default Sidebar;
