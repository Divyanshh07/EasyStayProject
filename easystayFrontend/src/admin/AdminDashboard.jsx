import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import DashboardHome from "./DashboardHome";
import Properties from "./Properties";
import RecentUsers from "./RecentUsers";
import Sellers from "./Sellers";
import Reports from "./Reports";
import Settings from "./Settings";

import { AnimatePresence, motion } from "framer-motion";

const AdminDashboard = () => {
    const [activePage, setActivePage] = useState("dashboard");

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden font-[Poppins]">

            {/* Sidebar */}
            <Sidebar activePage={activePage} setActivePage={setActivePage} />

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col">

                {/* TOP NAV */}
                <Topbar />

                {/* PAGE CONTENT */}
                <div className="p-6 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePage}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.4 }}
                        >
                            {activePage === "dashboard" && <DashboardHome />}
                            {activePage === "properties" && <Properties />}
                            {activePage === "users" && <RecentUsers />}
                            {activePage === "sellers" && <Sellers />}
                            {activePage === "reports" && <Reports />}
                            {activePage === "settings" && <Settings />}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
