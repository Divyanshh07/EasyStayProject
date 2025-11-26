import React from "react";
import { motion } from "framer-motion";
import {
    Home,
    Building2,
    Hotel,
    Key,
    Landmark,
    Search,
    MapPin,
} from "lucide-react";

const categories = [
    {
        title: "PG / Hostels",
        icon: Hotel,
        link: "/pg",
        desc: "Find Boys/Girls PGs with food, WiFi, AC and security.",
    },
    {
        title: "Flats / Apartments",
        icon: Building2,
        link: "/buy?type=flat",
        desc: "Discover verified 1BHK, 2BHK, 3BHK flats for rent or sale.",
    },
    {
        title: "Independent Houses",
        icon: Home,
        link: "/buy?type=house",
        desc: "Buy or rent houses with full owner details and verification.",
    },
    {
        title: "Shops / Commercial",
        icon: Landmark,
        link: "/rent?type=flat",
        desc: "Find commercial shops, offices, and retail spaces.",
    },
    {
        title: "Rooms for Rent",
        icon: Key,
        link: "/rent?type=room",
        desc: "Perfect budget-friendly single rooms for students & workers.",
    },
];

const services = [
    {
        title: "Zero-Brokerage Listings",
        desc: "Post and discover properties without paying commission. 100% owner-to-tenant transparency.",
        icon: Search,
    },
    {
        title: "Online Rental Agreements",
        desc: "Get legally valid e-stamped rental agreements delivered to your doorstep.",
        icon: Key,
    },
    {
        title: "Verified Property Checks",
        desc: "All properties undergo document verification and owner background checks.",
        icon: MapPin,
    },
];

const ServicePage = () => {
    return (
        <div className="bg-gray-50 text-gray-800 pt-16">

            {/* HERO SECTION */}
            <section className="bg-blue-700 text-white py-24 px-6 text-center shadow-lg">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-extrabold"
                >
                    EasyStay Services
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="mt-4 text-lg opacity-90 max-w-2xl mx-auto"
                >
                    From PGs to Flats, Shops to Independent Houses — find everything fast,
                    verified, and broker-free.
                </motion.p>
            </section>

            {/* CATEGORY SHORTCUTS */}
            <section className="max-w-7xl mx-auto py-16 px-6">
                <h2 className="text-3xl font-bold text-blue-700 text-center mb-10">
                    Explore by Category
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {categories.map((item, index) => (
                        <motion.a
                            href={item.link}
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white cursor-pointer p-6 rounded-xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-center"
                        >
                            <item.icon className="mx-auto text-blue-600" size={40} />
                            <h3 className="text-xl font-bold mt-4 text-gray-900">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
                        </motion.a>
                    ))}
                </div>
            </section>

            {/* OUR SERVICES */}
            <section className="max-w-7xl mx-auto py-10 px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-blue-700">Our Premium Services</h2>
                    <p className="mt-3 text-lg text-gray-700">
                        We bring the most trusted real-estate services to give you a smooth,
                        transparent & secure experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-xl shadow-md border hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            <service.icon className="text-blue-600" size={40} />
                            <h3 className="text-xl font-bold text-blue-700 mt-4">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 mt-3 leading-7">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* WHY EASYSTAY */}
            <section className="max-w-6xl mx-auto mt-20 px-6 pb-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="bg-blue-100 rounded-2xl p-10 shadow-inner border text-center"
                >
                    <h2 className="text-3xl font-bold text-blue-700 mb-4">
                        Why Choose EasyStay?
                    </h2>
                    <p className="text-lg leading-8 text-gray-700 max-w-3xl mx-auto">
                        Verified properties, zero brokerage, fast filtering, accurate search,
                        secure agreements, and a customer-first support system —
                        everything designed for your comfort.
                    </p>
                </motion.div>
            </section>
        </div>
    );
};

export default ServicePage;
