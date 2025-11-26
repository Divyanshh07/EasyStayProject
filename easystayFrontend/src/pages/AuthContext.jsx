import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Context provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ✅ Load user from localStorage when app starts
    useEffect(() => {
        const storedUser = localStorage.getItem("easystayUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // ✅ Login function
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("easystayUser", JSON.stringify(userData));
    };

    // ✅ Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("easystayUser");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
