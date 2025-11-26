import React from "react";
import PropertyCard from "./PropertyCard";

const RecommendationSection = () => {
    const demoProperties = [
        { id: 1, title: "2 BHK in Noida", price: "₹ 15,000 / month" },
        { id: 2, title: "Studio Apartment Gurgaon", price: "₹ 12,000 / month" },
        { id: 3, title: "Luxury Flat Delhi", price: "₹ 22,000 / month" },
    ];

    return (
        <section className="py-16 container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
                Recommended for You ✨
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
                {demoProperties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                ))}
            </div>
        </section>
    );
};

export default RecommendationSection;
