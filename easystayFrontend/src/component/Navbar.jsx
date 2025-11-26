import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [propertyOpen, setPropertyOpen] = useState(false); // Mobile dropdown
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 60);
            if (window.scrollY < lastScrollY) {
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (e.clientY < 100) setShowNavbar(true);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <AnimatePresence>
            {showNavbar && (
                <motion.nav
                    initial={{ y: -80 }}
                    animate={{ y: 0 }}
                    exit={{ y: -80 }}
                    transition={{ duration: 0.4 }}
                    className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                        isScrolled
                            ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200"
                            : "bg-transparent"
                    } font-[Poppins]`}
                >
                    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                        <Link
                            to="/"
                            className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                        >
                            EasyStay
                        </Link>

                        {/* -------------------- DESKTOP MENU -------------------- */}
                        <ul className="hidden md:flex space-x-10 text-gray-800 font-medium">

                            {/* Home */}
                            <li className="relative group">
                                <Link
                                    to="/"
                                    className={`transition-all ${
                                        location.pathname === "/" ? "text-indigo-600 font-semibold" : "hover:text-indigo-600"
                                    }`}
                                >
                                    Home
                                </Link>
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                            </li>


                            {/* Other normal links */}
                            <li>
                                <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
                            </li>
                            <li>
                                <Link to="/service" className="hover:text-indigo-600 transition">Service</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>
                            </li>

                            {/* -------------------- PROPERTY DROPDOWN -------------------- */}
                            <li className="relative group">
                                <button className="flex items-center gap-1 hover:text-indigo-600 transition-all">
                                    Property ▾
                                </button>

                                <div
                                    className="
                                        absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-3
                                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                        transition-all duration-300 z-50
                                    "
                                >
                                    <Link to="/buy" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600">
                                        Buy
                                    </Link>
                                    <Link to="/rent" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600">
                                        Rent
                                    </Link>
                                    <Link to="/pg" className="block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600">
                                        Pg/Hostel
                                    </Link>
                                </div>
                            </li>
                        </ul>

                        {/* Auth Buttons */}
                        <div className="hidden md:flex space-x-4 items-center">
                            <Link
                                to="/login"
                                className="px-4 py-2 text-gray-700 rounded-full hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all"
                            >
                                Sign Up
                            </Link>
                        </div>

                        {/* ----------- Mobile Hamburger ----------- */}
                        <button
                            className="md:hidden text-gray-800"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>

                    {/* -------------------- MOBILE MENU -------------------- */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-lg"
                            >
                                <ul className="flex flex-col text-center space-y-4 py-5 font-medium text-gray-800">

                                    <li>
                                        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                                    </li>

                                    {/* ----------- MOBILE PROPERTY DROPDOWN ----------- */}
                                    <li className="flex flex-col items-center">
                                        <button
                                            onClick={() => setPropertyOpen(!propertyOpen)}
                                            className="py-2 font-medium text-gray-800"
                                        >
                                            Property ▾
                                        </button>

                                        {propertyOpen && (
                                            <div className="flex flex-col w-full bg-white/90 py-2">
                                                <Link to="/buy" onClick={() => setMenuOpen(false)} className="py-2 hover:text-indigo-600">
                                                    Buy
                                                </Link>
                                                <Link to="/rent" onClick={() => setMenuOpen(false)} className="py-2 hover:text-indigo-600">
                                                    Rent
                                                </Link>
                                                <Link to="/commercial" onClick={() => setMenuOpen(false)} className="py-2 hover:text-indigo-600">
                                                    Commercial
                                                </Link>
                                            </div>
                                        )}
                                    </li>

                                    <li>
                                        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                                    </li>
                                    <li>
                                        <Link to="/service" onClick={() => setMenuOpen(false)}>Service</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                                    </li>

                                    {/* MOBILE LOGIN / SIGNUP */}
                                    <div className="flex justify-center gap-3 mt-3">
                                        <Link to="/login" onClick={() => setMenuOpen(false)} className="px-5 py-2 border border-gray-300 rounded-full">
                                            Login
                                        </Link>
                                        <Link to="/signup" onClick={() => setMenuOpen(false)} className="px-5 py-2 bg-indigo-600 text-white rounded-full">
                                            Sign Up
                                        </Link>
                                    </div>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
