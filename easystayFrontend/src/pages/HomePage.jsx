import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Building, MapPin, Users } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";


const HomePage = () => {
    const [propertyType, setPropertyType] = useState("buy");
    const [city, setCity] = useState("");
    const [budget, setBudget] = useState("");
    const [activeTab, setActiveTab] = useState("buy");
    const [activeSection, setActiveSection] = useState("hero");

    const handleSearch = (e) => {
        e.preventDefault();

        const query = new URLSearchParams();

        if (propertyType) query.append("listingType", propertyType);
        if (city) query.append("city", city);

        // Convert price into min and max
        if (budget) {
            const [min, max] = budget.split("-");
            query.append("minPrice", min);
            if (max) query.append("maxPrice", max);
        }

        navigate(`/allproperties?${query.toString()}`);
    };


    const navigate = useNavigate();

    // 🔗 Routes for Explore Now button
    const tabRoutes = {
        buy: "/buy",
        rent: "/rent",
        pg: "/pg"
    };

    const tabs = {
        buy: {
            title: "Buy Your Dream Home",
            desc: "Explore verified listings and experience a seamless home-buying journey with EasyStay. From luxury apartments to affordable homes, find your ideal space effortlessly.",
            video: "/assets/videos/buy-home.mp4",
            icon: <Home size={32} className="text-indigo-600" />,
        },
        rent: {
            title: "Find Flats for Rent",
            desc: "Search thousands of verified rental listings across cities. EasyStay helps you find homes that match your lifestyle, location, and budget — without brokers.",
            video: "/assets/videos/rent.mp4",
            icon: <Building size={32} className="text-indigo-600" />,
        },
        pg: {
            title: "Discover PGs & Hostels",
            desc: "Looking for a comfortable stay near your office or college? Explore fully furnished PGs, co-living spaces, and hostels with modern amenities at affordable rates.",
            video: "/assets/videos/pg.mp4",
            icon: <Users size={32} className="text-indigo-600" />,
        },
    };

    const sectionNav = [
        { id: "hero", name: "Home" },
        { id: "property", name: "Properties" },
        { id: "feature", name: "Features" },
        { id: "why", name: "Why EasyStay" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.4 }
        );

        sectionNav.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="pt-20 font-[Poppins] text-gray-900">

            {/* LEFT FLOATING SCROLL NAV */}
            <div className="fixed top-1/2 left-6 -translate-y-1/2 z-50 hidden md:flex flex-col items-start gap-4">
                {sectionNav.map((s) => (
                    <motion.button
                        key={s.id}
                        onClick={() =>
                            document
                                .getElementById(s.id)
                                .scrollIntoView({ behavior: "smooth", block: "center" })
                        }
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                        className="relative group flex items-center gap-3"
                    >
                        <motion.div
                            layoutId="activeLine"
                            className={`w-[2px] h-8 rounded-full transition-all duration-300 ${
                                activeSection === s.id ? "bg-indigo-600" : "bg-gray-300"
                            }`}
                        />
                        <span
                            className={`text-sm tracking-wide transition-all duration-300 ${
                                activeSection === s.id
                                    ? "text-indigo-600 font-semibold"
                                    : "text-gray-500 group-hover:text-gray-800"
                            }`}
                        >
                            {s.name}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* HERO SECTION */}
            <section id="hero" className="relative h-[92vh] flex items-center justify-center overflow-hidden text-white text-center">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.6]"
                >
                    <source
                        src="https://media.istockphoto.com/id/1483346702/video/online-real-estate-property-search.mp4?s=mp4-640x640-is&k=20&c=b67k4U6dJ34NTuIE7NpLBw08eDX-n_FIADNrpJbipZ8="
                        type="video/mp4"
                    />
                </video>

                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-11/12 md:w-3/4 mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Find <span className="text-indigo-400">Homes, Flats & PGs</span> That Fit Your Lifestyle
                    </h1>
                    <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                        Search verified listings for buying, renting, or sharing – all in one place.
                    </p>

                    {/* SEARCH FORM */}
                    <motion.form
                        onSubmit={handleSearch}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white text-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-4"
                    >
                        {/* Property Tabs */}
                        <div className="flex flex-wrap justify-center gap-3 border-b md:border-b-0 md:border-r border-gray-200 pb-3 md:pb-0 md:pr-4">
                            {[
                                { type: "buy", label: "Buy", icon: <Home size={18} /> },
                                { type: "rent", label: "Rent", icon: <Building size={18} /> },
                                { type: "pg", label: "PG/Hostel", icon: <Users size={18} /> },
                            ].map((tab) => (
                                <button
                                    key={tab.type}
                                    type="button"
                                    onClick={() => setPropertyType(tab.type)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                        propertyType === tab.type
                                            ? "bg-indigo-600 text-white shadow-md scale-105"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* CITY INPUT */}
                        <div className="flex items-center gap-2 w-full md:w-1/3">
                            <MapPin size={20} className="text-indigo-600" />
                            <input
                                type="text"
                                placeholder="Enter city or locality"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                list="city-suggestions"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <datalist id="city-suggestions">
                                <option value="Noida" />
                                <option value="Gurgaon" />
                                <option value="Delhi" />
                                <option value="Mumbai" />
                                <option value="Pune" />
                                <option value="Bangalore" />
                                <option value="Hyderabad" />
                                <option value="Chennai" />
                                <option value="Kolkata" />
                            </datalist>
                        </div>

                        {/* BUDGET */}
                        <select
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full md:w-1/4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Budget</option>
                            <option value="0-10000">₹0 - ₹10,000</option>
                            <option value="10000-20000">₹10,000 - ₹20,000</option>
                            <option value="20000-30000">₹20,000 - ₹30,000</option>
                            <option value="30000-50000">₹30,000 - ₹50,000</option>
                            <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                            <option value="100000-500000">₹1,00,000 - ₹5,00,000</option>
                            <option value="500000-1000000">₹5,00,000 - ₹10,00,000</option>
                            <option value="1000000-2000000">₹10L - ₹20L</option>
                            <option value="2000000-5000000">₹20L - ₹50L</option>
                            <option value="5000000-10000000">₹50L - ₹1 Cr</option>
                            <option value="10000000+">₹1 Cr+</option>
                        </select>


                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
                        >
                            <Search size={20} /> Search
                        </motion.button>
                    </motion.form>
                </motion.div>
            </section>

            {/* PROPERTY INFO SECTION */}
            <section id="property" className="relative bg-gray-50 py-20 overflow-hidden">
                <div className="container mx-auto px-6 grid md:grid-cols-12 gap-10 items-center">

                    {/* LEFT TAB BUTTONS */}
                    <div className="col-span-12 md:col-span-3 flex md:flex-col gap-4 md:gap-6 justify-center md:justify-start">
                        {Object.keys(tabs).map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl font-semibold transition-all ${
                                    activeTab === key
                                        ? "bg-indigo-600 text-white shadow-lg scale-105"
                                        : "bg-white text-gray-800 hover:bg-gray-100"
                                }`}
                            >
                                {tabs[key].icon}
                                <span className="hidden md:block capitalize">
                        {key === "buy"
                            ? "Buy Home"
                            : key === "rent"
                                ? "Rent Flat"
                                : "Find PG/Hostel"}
                    </span>
                            </button>
                        ))}
                    </div>

                    {/* RIGHT SIDE CONTENT */}
                    <div className="col-span-12 md:col-span-9 relative rounded-3xl overflow-hidden shadow-xl">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            key={activeTab}
                            className="w-full h-[400px] object-cover brightness-75"
                        >
                            <source src={tabs[activeTab].video} type="video/mp4" />
                        </video>

                        <div className="absolute inset-0 bg-black/40"></div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0 flex flex-col justify-center items-start text-white p-10 md:p-16"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    {tabs[activeTab].title}
                                </h2>
                                <p className="text-lg opacity-90 mb-6 max-w-2xl">
                                    {tabs[activeTab].desc}
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => navigate(tabRoutes[activeTab])}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
                                >
                                    Explore Now
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* ✅ FIXED CTA — placed BELOW the whole property section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="mt-20 text-center px-6"
                >
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Transform the Way You{" "}
                        <span className="text-indigo-600">Buy, Rent, & Live</span>
                    </h3>

                    <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                        Join thousands of users who discovered their dream homes effortlessly with EasyStay.
                    </p>

                    <Link to="/allproperties">
                        <motion.button
                            whileHover={{
                                scale: 1.08,
                                boxShadow: "0px 0px 15px rgba(99,102,241,0.6)",
                            }}
                            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl
                font-semibold text-lg shadow-md hover:bg-indigo-700 transition-all"
                        >
                            Explore Properties
                        </motion.button>
                    </Link>
                </motion.div>
            </section>

            <section
                id="feature"
                className="relative bg-gradient-to-b from-white to-gray-50 py-16 overflow-hidden font-[Poppins]"
            >
                <div className="container mx-auto px-6 md:px-16">

                    {/* MAIN HEADING */}
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center text-4xl md:text-5xl font-bold mb-10 text-gray-900"
                    >
                        Experience the{" "}
                        <span className="text-indigo-600">Future of Real Estate</span>{" "}
                        with EasyStay
                    </motion.h2>

                    {/* FIRST ROW */}
                    <div className="relative flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg
                hover:shadow-2xl border border-gray-200 hover:border-indigo-400 transition"
                        >
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl font-semibold mb-3 text-indigo-600"
                            >
                                🏠 Verified Listings
                            </motion.h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Every EasyStay property is verified by real estate experts to ensure a{" "}
                                <span className="font-semibold text-indigo-500">
                        secure and transparent
                    </span>{" "}
                                experience. Browse confidently and find homes you can trust.
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg
                hover:shadow-2xl border border-gray-200 hover:border-indigo-400 transition"
                        >
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-semibold mb-3 text-indigo-600"
                            >
                                ⚡ Fast & Intelligent Search
                            </motion.h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Our advanced search uses smart filters and maps to instantly suggest the
                                best properties matching your{" "}
                                <span className="font-semibold text-indigo-500">
                        budget and lifestyle
                    </span>.
                            </p>
                        </motion.div>
                    </div>

                    {/* SECOND ROW */}
                    <div className="mt-10 flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg
                hover:shadow-2xl border border-gray-200 hover:border-indigo-400 transition"
                        >
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="text-2xl font-semibold mb-3 text-indigo-600"
                            >
                                💬 Customer First Approach
                            </motion.h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                We prioritize your comfort and feedback — helping thousands of families
                                find homes{" "}
                                <span className="font-semibold text-indigo-500">
                        without brokers or hidden charges
                    </span>.
                            </p>
                        </motion.div>

                        {/* Card 4 */}
                        <motion.div
                            initial={{ opacity: 0, x: 80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg
                hover:shadow-2xl border border-gray-200 hover:border-indigo-400 transition"
                        >
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="text-2xl font-semibold mb-3 text-indigo-600"
                            >
                                🌍 Nationwide Network
                            </motion.h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Browse verified listings across{" "}
                                <span className="font-semibold text-indigo-500">
                        Noida, Delhi, Gurgaon, Mumbai, Bangalore
                    </span>{" "}
                                and many more cities on one unified platform.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </section>


            {/* 🧩 WHY CHOOSE EASYSTAY */}
            <section
                id="why"
                className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 py-24 overflow-hidden font-[Poppins]"
            >
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 0.2, y: 0 }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute w-[500px] h-[500px] bg-indigo-400/25 rounded-full blur-3xl top-[-100px] left-[-100px]"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 0.25, y: 0 }}
                        transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-3xl bottom-[-150px] right-[-100px]"
                    />
                </div>

                <div className="relative container mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-gray-900"
                    >
                        Why Choose <span className="text-indigo-600">EasyStay</span>?
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
                        {[
                            {
                                icon: "🏠",
                                title: "Verified Listings",
                                desc: "Every property is verified by our experts to ensure authenticity and trust for every user.",
                            },
                            {
                                icon: "🤝",
                                title: "No Brokerage",
                                desc: "Connect directly with property owners and avoid paying unnecessary brokerage fees.",
                            },
                            {
                                icon: "⚡",
                                title: "Smart Search & Filters",
                                desc: "Find your dream home faster using intelligent filters and personalized recommendations.",
                            },
                            {
                                icon: "📜",
                                title: "Digital Rental Agreement",
                                desc: "Create and sign rental agreements online securely with Aadhaar e-Sign integration.",
                            },
                            {
                                icon: "📍",
                                title: "Location-Based Results",
                                desc: "Get the best recommendations tailored to your preferred locality and commute distance.",
                            },
                            {
                                icon: "💬",
                                title: "24×7 Customer Support",
                                desc: "Our dedicated team is always available to assist you throughout your property journey.",
                            },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: idx * 0.2 }}
                                whileHover={{
                                    scale: 1.05,
                                    y: -8,
                                    boxShadow: "0 0 30px rgba(99,102,241,0.25)",
                                    borderColor: "#6366f1",
                                    transition: { duration: 0.3 },
                                }}
                                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-md border border-gray-200 hover:shadow-indigo-300/40 transition-all duration-300"
                            >
                                <motion.div
                                    whileHover={{
                                        rotate: 360,
                                        textShadow: "0 0 15px rgba(99,102,241,0.6)",
                                    }}
                                    transition={{ duration: 0.8 }}
                                    className="text-5xl mb-5"
                                >
                                    {feature.icon}
                                </motion.div>

                                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-indigo-600">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-20 text-gray-700 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                    >
                        <p>
                            With <span className="text-indigo-600 font-semibold">EasyStay</span>, you don’t just find a home — you experience{" "}
                            <span className="text-purple-600 font-semibold">trust, transparency, and comfort</span> in every move.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
