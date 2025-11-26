import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
    return (
        <div className="bg-gray-50 text-gray-800 pt-16">   {/* <-- TOP SPACE ADDED */}

            {/* ================= HERO / BANNER SECTION ================= */}
            <motion.section
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="relative bg-gradient-to-b from-blue-700 to-blue-500 text-white py-32 px-6 text-center overflow-hidden"
            >

                {/* Floating circles */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 opacity-20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-16 right-16 w-40 h-40 bg-blue-300 opacity-25 rounded-full blur-3xl"></div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="text-5xl sm:text-6xl font-extrabold tracking-tight drop-shadow-lg"
                >
                    About EasyStay
                </motion.h1>

                <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto opacity-90">
                    A trusted modern platform changing how India finds homes with speed,
                    transparency, and zero brokerage.
                </p>
            </motion.section>

            {/* ================= COMPANY INTRO ================= */}
            <section className="max-w-7xl mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-bold text-blue-700 mb-6">
                        Who We Are
                    </h2>

                    <p className="text-lg leading-8">
                        EasyStay brings a seamless & intelligent real estate experience
                        designed for today's digital India. Whether you're renting, buying,
                        or selling a property — we make the journey smooth, transparent,
                        and fully broker-free.
                    </p>

                    <p className="mt-4 text-lg leading-8">
                        We empower users with accurate details, verified listings, modern
                        tools, and trusted guidance — ensuring a reliable and stress-free
                        property experience.
                    </p>
                </motion.div>

                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="rounded-2xl shadow-xl bg-cover bg-center h-80"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80')",
                    }}
                ></motion.div>
            </section>

            {/* ================= HIGHLIGHT SECTION ================= */}
            <section className="bg-white py-24">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-blue-700">
                        What Makes EasyStay Unique?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Designed to bring 100% trust & speed to your property journey.
                    </p>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-14">
                        {[
                            { title: "Zero Brokerage", desc: "Direct owner-to-user model" },
                            { title: "Verified Listings", desc: "Accurate details & photos" },
                            { title: "Smart Filters", desc: "Find the perfect property in seconds" },
                            { title: "Digital Agreements", desc: "E-stamped & doorstep service" },
                        ].map((box, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                className="p-8 bg-blue-50 rounded-xl shadow-md hover:shadow-xl cursor-pointer border border-blue-200"
                            >
                                <h3 className="text-2xl font-semibold text-blue-600">{box.title}</h3>
                                <p className="mt-2 text-gray-700">{box.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= VISION ================= */}
            <section className="max-w-7xl mx-auto py-24 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-blue-700">Our Vision</h2>
                        <p className="mt-4 text-lg leading-8">
                            To become India’s most trusted online real estate ecosystem where
                            every user — tenant, buyer, or owner — can find value, clarity,
                            and a stress-free experience.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="bg-blue-600 text-white py-16 px-10 rounded-2xl shadow-2xl text-center"
                    >
                        <h3 className="text-5xl font-extrabold">100% Trust</h3>
                        <p className="text-xl mt-2 opacity-80">Guaranteed Transparency</p>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
