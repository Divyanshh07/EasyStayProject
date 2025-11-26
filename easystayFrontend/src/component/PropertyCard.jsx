import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
        <img
            src={`https://source.unsplash.com/400x250/?apartment,house,${property.title}`}
            alt={property.title}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
            <p className="text-indigo-600 font-bold mb-3">{property.price}</p>
            <Link
                to={`/property/${property.id}`}
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
                View Details
            </Link>
        </div>
    </div>
);

export default PropertyCard;
