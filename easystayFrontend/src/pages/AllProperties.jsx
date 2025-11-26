import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const ITEMS_PER_LOAD = 24;

const AllProperties = () => {
    const [properties, setProperties] = useState([]);
    const [filtered, setFiltered] = useState([]);

    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

    const [loading, setLoading] = useState(true); // only for first API load

    const [selectedType, setSelectedType] = useState("All");
    const [selectedCity, setSelectedCity] = useState("All");
    const [search, setSearch] = useState("");

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get Query Params from HomePage
    const queryListingType = searchParams.get("listingType");
    const queryCity = searchParams.get("city");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    useEffect(() => {
        loadProperties();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const loadProperties = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/properties/all");

            const list = res.data.map((p) => ({
                ...p,
                price: Number(p.price) || 0,
            }));

            setProperties(list);
            setFiltered(list);
            setLoading(false);

            applyQueryFilters(list);
        } catch (err) {
            console.error("API Error:", err);
            setLoading(false);
        }
    };

    // ---------------- APPLY HOME PAGE FILTER ----------------
    const applyQueryFilters = (list) => {
        let updated = [...list];

        if (queryListingType) {
            updated = updated.filter(
                (p) =>
                    p.listingType?.toLowerCase() === queryListingType.toLowerCase()
            );
            setSelectedType(
                queryListingType.charAt(0).toUpperCase() + queryListingType.slice(1)
            );
        }

        if (queryCity) {
            updated = updated.filter((p) =>
                p.city?.toLowerCase().includes(queryCity.toLowerCase())
            );
            setSelectedCity(queryCity);
        }

        if (minPrice) {
            updated = updated.filter((p) => p.price >= Number(minPrice));
        }

        if (maxPrice) {
            updated = updated.filter((p) => p.price <= Number(maxPrice));
        }

        setFiltered(updated);
        setVisibleCount(ITEMS_PER_LOAD);
    };

    // ---------------- LOGIN CHECK ----------------
    const handlePropertyClick = (id) => {
        const loggedIn = localStorage.getItem("token");

        if (!loggedIn) {
            alert("Please login to view property details.");
            navigate("/login");
            return;
        }

        navigate(`/property/${id}`);
    };

    // ---------------- MANUAL FILTER APPLY ----------------
    useEffect(() => {
        applyManualFilters();
    }, [selectedType, selectedCity, search]);

    const applyManualFilters = () => {
        let data = [...properties];

        if (selectedType !== "All") {
            data = data.filter(
                (p) =>
                    p.listingType.toLowerCase() === selectedType.toLowerCase()
            );
        }

        if (selectedCity !== "All") {
            data = data.filter((p) =>
                p.city.toLowerCase().includes(selectedCity.toLowerCase())
            );
        }

        if (search.trim() !== "") {
            data = data.filter(
                (p) =>
                    p.title.toLowerCase().includes(search.toLowerCase()) ||
                    p.type?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (minPrice) {
            data = data.filter((p) => p.price >= Number(minPrice));
        }

        if (maxPrice) {
            data = data.filter((p) => p.price <= Number(maxPrice));
        }

        setFiltered(data);
        setVisibleCount(ITEMS_PER_LOAD);
    };

    // --------------- INFINITE SCROLL LOGIC -----------------
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 10 >=
            document.documentElement.scrollHeight
        ) {
            loadMore();
        }
    };

    const loadMore = () => {
        setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, filtered.length)
        );
    };

    // ---------------- SKELETON LOADER ----------------
    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-10">
                {Array(12)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 animate-pulse rounded-lg h-60 w-full"
                        ></div>
                    ))}
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen p-15 bg-gray-50">
            <h1 className="text-3xl font-bold text-center mb-6">All Properties</h1>

            {/* FILTER BAR */}
            <div className="flex flex-wrap gap-3 justify-center mb-6">

                {/* TYPE FILTER */}
                {["All", "Buy", "Rent", "PG"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setSelectedType(t)}
                        className={`px-4 py-2 rounded-lg border ${
                            selectedType === t
                                ? "bg-blue-600 text-white"
                                : "bg-white"
                        }`}
                    >
                        {t}
                    </button>
                ))}

                {/* CITY FILTER */}
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
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

                {/* SEARCH BOX */}
                <input
                    type="text"
                    placeholder="Search flat, pg, room..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded-lg w-60"
                />
            </div>

            {/* PROPERTY LIST */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {filtered.slice(0, visibleCount).map((property) => (
                    <div
                        key={property.id}
                        className="bg-white shadow-md rounded-lg p-3 cursor-pointer hover:shadow-xl transition"
                        onClick={() => handlePropertyClick(property.id)}
                    >
                        <img
                            src={
                                property.imageUrl ||
                                "https://via.placeholder.com/300"
                            }
                            alt="property"
                            className="h-40 w-full object-cover rounded-md"
                        />

                        <h2 className="text-lg font-bold mt-2">
                            {property.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {property.city}
                        </p>

                        <p className="font-semibold text-blue-700 mt-1">
                            ₹ {property.price.toLocaleString()}
                        </p>

                        <span className="mt-2 inline-block px-3 py-1 bg-gray-200 rounded-full text-sm">
                            {property.listingType}
                        </span>
                    </div>
                ))}
            </div>

            {/* LOADING MORE INDICATOR */}
            {visibleCount < filtered.length && (
                <p className="text-center text-gray-600 mt-6">Loading more…</p>
            )}
        </div>
    );
};

export default AllProperties;
