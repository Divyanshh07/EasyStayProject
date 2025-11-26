import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    if (!user)
        return (
            <div className="pt-24 text-center">
                <h2 className="text-2xl">Please login to access your dashboard.</h2>
            </div>
        );

    return (
        <div className="pt-24 container mx-auto px-6">
            <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}! 👋</h1>
            <p className="mb-4 text-gray-600">Manage your account and properties here.</p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">My Listings</h3>
                    <p>You currently have no listings. Add one soon!</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">AI Recommendations</h3>
                    <p>Our AI will recommend properties based on your activity.</p>
                </div>
            </div>
            <button
                onClick={logout}
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
