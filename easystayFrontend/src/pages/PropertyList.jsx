import React, { useState, useEffect } from "react";
import PropertyCard from "../component/PropertyCard";

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Will fetch from backend later
        setProperties([
            { id: 1, title: "2BHK in Noida", price: "₹ 15,000 / month" },
            { id: 2, title: "1BHK in Delhi", price: "₹ 10,000 / month" },
            { id: 3, title: "Studio Flat Gurgaon", price: "₹ 12,000 / month" },
        ]);
    }, []);

    return (
        <div className="pt-24 container mx-auto px-6">
            <h1 className="text-3xl font-bold mb-6">Available Properties 🏠</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {properties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                ))}
            </div>
        </div>
    );
};

export default PropertyList;
