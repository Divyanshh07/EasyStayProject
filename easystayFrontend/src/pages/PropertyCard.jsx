import React from "react";
import { MdLocationPin, MdHome } from "react-icons/md";
import { Link } from "react-router-dom";

const PropertyCard = ({ p }) => {
    const user = JSON.parse(localStorage.getItem("user")); // Check login

    return (
        <div
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-3 cursor-pointer"
            style={{ width: "100%" }}
        >
            {/* Image */}
            <img
                src={p.imageUrl}
                alt={p.title}
                className="w-full h-48 object-cover rounded-lg"
            />

            <div className="mt-3">
                <h3 className="text-lg font-semibold text-gray-800">{p.title}</h3>

                <p className="flex items-center text-gray-600 mt-1 text-sm">
                    <MdLocationPin className="text-red-500 text-lg" />
                    {p.locality}, {p.city}
                </p>

                {/* ONLY SHOW DETAILS IF USER IS LOGGED IN */}
                {user ? (
                    <>
                        {/* Property Type */}
                        <p className="flex items-center text-gray-500 text-sm mt-1">
                            <MdHome className="text-blue-600 text-lg" />
                            {p.type}
                        </p>

                        {/* Price */}
                        <p className="text-xl font-bold text-green-600 mt-2">
                            ₹ {p.price.toLocaleString()}
                            <span className="text-sm text-gray-500 font-normal">
                                {" "} / {p.listingType}
                            </span>
                        </p>

                        {/* View Details Button */}
                        <Link
                            to={`/property/${p.id}`}
                            className="block w-full text-center mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            View Details
                        </Link>
                    </>
                ) : (
                    <>
                        {/* Blur Price */}
                        <p className="text-xl font-bold text-gray-400 mt-3 blur-sm select-none">
                            ₹ {p.price.toLocaleString()} / {p.listingType}
                        </p>

                        {/* Login Prompt */}
                        <Link
                            to="/login"
                            className="block w-full text-center mt-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Login to View Full Details
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default PropertyCard;
