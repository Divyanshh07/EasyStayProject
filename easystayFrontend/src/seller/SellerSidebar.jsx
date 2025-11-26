// seller/SellerSidebar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, PlusCircle, Building2, UserCog, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ activePage, setActivePage }) => {
    const [expanded, setExpanded] = useState(true);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const menu = [
        { id: "dashboard", label: "Dashboard", icon: <Home />, to: "/seller-dashboard" },
        { id: "add-property", label: "Add Property", icon: <PlusCircle />, to: "/seller-dashboard/add-property" },
        { id: "manage-properties", label: "Manage Listings", icon: <Building2 />, to: "/seller-dashboard/manage-properties" },
        { id: "profile", label: "Profile", icon: <UserCog />, to: "/seller-dashboard/profile" }
    ];

    return (
        <motion.div
            animate={{ width: expanded ? 240 : 80 }}
            className="h-full bg-white shadow-xl border-r p-4 flex flex-col relative"
        >
            <h2 className="text-center text-indigo-600 font-bold text-xl mb-8">
                {expanded ? "Seller Panel" : "SP"}
            </h2>

            <nav className="flex flex-col gap-2 flex-grow">
                {menu.map((m) => (
                    <Link
                        key={m.id}
                        to={m.to}
                        onClick={() => setActivePage(m.id)}
                        className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-lg
                            ${activePage === m.id ? "bg-indigo-600 text-white" : "hover:bg-gray-100 text-gray-700"}`}
                    >
                        {m.icon}
                        {expanded && <span>{m.label}</span>}
                    </Link>
                ))}
            </nav>

            {/* Logout */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-lg shadow"
            >
                <LogOut size={20} />
                {expanded && "Logout"}
            </motion.button>

            {/* Collapse Button */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="absolute -right-3 top-6 bg-indigo-600 text-white p-2 rounded-full shadow"
            >
                {expanded ? "<" : ">"}
            </button>
        </motion.div>
    );
};

export default Sidebar;
