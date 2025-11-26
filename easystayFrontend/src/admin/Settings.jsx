import React, { useEffect, useState } from "react";
import { Save, Eye, EyeOff, Settings2 } from "lucide-react";

const Settings = () => {
    const [loading, setLoading] = useState(false);

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [toggles, setToggles] = useState({
        darkMode: false,
        notifications: true,
        maintenance: false,
    });

    // --------------------------
    // Fetch Admin Settings
    // --------------------------
    const fetchSettings = async () => {
        try {
            const res = await fetch("http://localhost:8080/api/admin/settings");
            const data = await res.json();

            setProfile({
                name: data.name,
                email: data.email,
                phone: data.phone,
            });

            setToggles({
                darkMode: data.darkMode,
                notifications: data.notifications,
                maintenance: data.maintenance,
            });

        } catch (error) {
            console.error("Error fetching settings:", error);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    // --------------------------
    // Handle Input Change
    // --------------------------
    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleToggle = (key) => {
        setToggles({ ...toggles, [key]: !toggles[key] });
    };

    // --------------------------
    // Save Profile
    // --------------------------
    const saveProfile = async () => {
        setLoading(true);
        try {
            await fetch("http://localhost:8080/api/admin/settings/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            });

            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating profile:", err);
        }
        setLoading(false);
    };

    // --------------------------
    // Save Password
    // --------------------------
    const savePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            await fetch("http://localhost:8080/api/admin/settings/password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passwordData),
            });

            alert("Password updated successfully!");
            setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            console.error("Error updating password:", err);
        }
        setLoading(false);
    };

    // --------------------------
    // Save Toggle Settings
    // --------------------------
    const saveToggles = async () => {
        setLoading(true);
        try {
            await fetch("http://localhost:8080/api/admin/settings/toggles", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(toggles),
            });

            alert("Settings saved!");
        } catch (error) {
            console.error("Error saving toggles:", error);
        }
        setLoading(false);
    };

    return (
        <div className="p-6">

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Settings2 size={26} /> Admin Settings
            </h2>

            {/* ---------------- PROFILE SETTINGS ---------------- */}
            <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
                <h3 className="text-xl font-semibold mb-4">Profile Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleProfileChange}
                        placeholder="Full Name"
                        className="border p-2 rounded"
                    />

                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        placeholder="Email Address"
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        placeholder="Phone Number"
                        className="border p-2 rounded"
                    />
                </div>

                <button
                    onClick={saveProfile}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <Save size={18} /> Save Profile
                </button>
            </div>

            {/* ---------------- PASSWORD SETTINGS ---------------- */}
            <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
                <h3 className="text-xl font-semibold mb-4">Change Password</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={handlePasswordChange}
                            placeholder="Old Password"
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="New Password"
                            className="border p-2 w-full rounded"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirm New Password"
                            className="border p-2 w-full rounded"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2 text-gray-600"
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                </div>

                <button
                    onClick={savePassword}
                    className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
                >
                    <Save size={18} /> Update Password
                </button>
            </div>

            {/* ---------------- TOGGLE SETTINGS ---------------- */}
            <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
                <h3 className="text-xl font-semibold mb-4">Preferences</h3>

                <div className="space-y-4">

                    {/* DARK MODE */}
                    <label className="flex justify-between items-center cursor-pointer">
                        <span className="text-gray-700">Dark Mode</span>
                        <input
                            type="checkbox"
                            checked={toggles.darkMode}
                            onChange={() => handleToggle("darkMode")}
                            className="toggle-checkbox"
                        />
                    </label>

                    {/* NOTIFICATIONS */}
                    <label className="flex justify-between items-center cursor-pointer">
                        <span className="text-gray-700">Enable Notifications</span>
                        <input
                            type="checkbox"
                            checked={toggles.notifications}
                            onChange={() => handleToggle("notifications")}
                        />
                    </label>

                    {/* MAINTENANCE MODE */}
                    <label className="flex justify-between items-center cursor-pointer">
                        <span className="text-gray-700">Maintenance Mode</span>
                        <input
                            type="checkbox"
                            checked={toggles.maintenance}
                            onChange={() => handleToggle("maintenance")}
                        />
                    </label>

                </div>

                <button
                    onClick={saveToggles}
                    className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700"
                >
                    <Save size={18} /> Save Preferences
                </button>
            </div>

        </div>
    );
};

export default Settings;
