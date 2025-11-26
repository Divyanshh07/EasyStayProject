// seller/SellerDashboardLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";

const SellerDashboardLayout = () => {
    const [activePage, setActivePage] = useState("dashboard");

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <SellerSidebar activePage={activePage} setActivePage={setActivePage} />

            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default SellerDashboardLayout;
