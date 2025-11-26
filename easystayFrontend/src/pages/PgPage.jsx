import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";

const PGPage = () => {
    const [properties, setProperties] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        city: "All",
        sort: "default",
    });

    // Fetch Data
    useEffect(() => {
        fetch("http://localhost:8081/api/properties/all")
            .then(res => res.json())
            .then(data => {
                // Filter only PG properties
                const pgProperties = data.filter(p => p.listingType === "PG");
                setProperties(pgProperties);
                setFiltered(pgProperties);
                setLoading(false);
            });
    }, []);

    // Apply Filters
    useEffect(() => {
        let updated = [...properties];

        // City Filter
        if (filters.city !== "All") {
            updated = updated.filter(p => p.city === filters.city);
        }

        // Sorting
        if (filters.sort === "low-high") {
            updated.sort((a, b) => a.price - b.price);
        } else if (filters.sort === "high-low") {
            updated.sort((a, b) => b.price - a.price);
        }

        setFiltered(updated);
    }, [filters, properties]);

    return (
        <div className="p-15 bg-gray-100 min-h-screen">

            {/* ---------------- HEADER ---------------- */}
            <div className="max-w-6xl mx-auto mb-6">
                <h1 className="text-3xl font-bold text-gray-800">PG Properties</h1>
                <p className="text-gray-600 mt-1">
                    Explore premium PG accommodations available in your preferred city.
                </p>
            </div>

            {/* ---------------- FILTER BAR ---------------- */}
            <div className="max-w-6xl mx-auto bg-white p-4 rounded-lg shadow flex flex-wrap gap-4">

                {/* City Filter */}
                <select
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    className="border p-2 rounded w-48"
                >
                    <option value="All">All Cities</option>
                    <option value="Noida">Noida</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>

                </select>

                {/* Sort */}
                <select
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                    className="border p-2 rounded w-48"
                >
                    <option value="default">Sort</option>
                    <option value="low-high">Price: Low → High</option>
                    <option value="high-low">Price: High → Low</option>
                </select>
            </div>

            {/* ---------------- PROPERTY LIST ---------------- */}
            <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {/* Skeleton Loader */}
                {loading &&
                    Array(6).fill().map((_, i) => (
                        <div
                            key={i}
                            className="bg-white p-4 rounded-lg shadow animate-pulse h-64"
                        ></div>
                    ))
                }

                {/* Property Cards */}
                {!loading && filtered.length === 0 && (
                    <p className="text-gray-600 col-span-full text-center">
                        No properties found with selected filters.
                    </p>
                )}

                {!loading &&
                    filtered.map(p => (
                        <PropertyCard key={p.id} p={p} />
                    ))
                }
            </div>
        </div>
    );
};

export default PGPage;
