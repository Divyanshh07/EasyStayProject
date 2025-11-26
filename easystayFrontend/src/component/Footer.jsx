import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-3">EasyStay AI</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Discover, list, and manage properties with the power of Artificial Intelligence.
                        EasyStay makes real estate simple, smart, and efficient.
                    </p>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="hover:text-indigo-400 transition">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="hover:text-indigo-400 transition">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="hover:text-indigo-400 transition">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="hover:text-indigo-400 transition">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-indigo-400 transition">Home</a></li>
                        <li><a href="/about" className="hover:text-indigo-400 transition">About Us</a></li>
                        <li><a href="/contact" className="hover:text-indigo-400 transition">Contact</a></li>
                        <li><a href="/service" className="hover:text-indigo-400 transition">Service</a></li>
                        <li><a href="/allproperties" className="hover:text-indigo-400 transition">Properties</a></li>
                    </ul>
                </div>

                {/* Useful Info */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="/free-listing" className="hover:text-indigo-400 transition">Free Listing</a></li>
                        <li><a href="/avoid-brokers" className="hover:text-indigo-400 transition">Avoid Brokers</a></li>
                        <li><a href="/rental-agreement" className="hover:text-indigo-400 transition">Rental Agreement</a></li>
                        <li><a href="/terms" className="hover:text-indigo-400 transition">Terms & Conditions</a></li>
                        <li><a href="/privacy" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                    <p className="text-gray-400 mb-3">
                        Subscribe to our newsletter and stay updated on the latest properties & offers.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-md bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition w-full sm:w-auto"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
                <p>
                    © {new Date().getFullYear()} <span className="text-indigo-400 font-semibold">EasyStay AI</span>. All rights reserved.
                </p>
                <p className="mt-1">Crafted with ❤️ by the Divyansh</p>
            </div>
        </footer>
    );
};

export default Footer;
