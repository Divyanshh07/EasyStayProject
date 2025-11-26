// Report.jsx
import React, { useEffect, useState } from "react";
import { Download, TrendingUp, Users, Home, MapPin } from "lucide-react";

const Report = () => {
    const [loading, setLoading] = useState(true);

    const [report, setReport] = useState({
        revenueThisMonth: 0,
        totalBookings: 0,
        topCities: [],
        topSellers: [],
    });

    // Fetch dashboard report API
    const fetchReportData = async () => {
        try {
            const res = await fetch("http://localhost:8081/api/admin/reports-new");
            const data = await res.json();
            setReport(data);
        } catch (err) {
            console.error("Error fetching dashboard:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchReportData();
    }, []);

    if (loading) return <p className="p-6 text-lg">Loading dashboard...</p>;

    return (
        <div className="p-6 space-y-8">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Reports & Analytics</h2>

                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    <Download size={18} /> Export Analytics
                </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                <SummaryCard
                    icon={<TrendingUp size={32} />}
                    title="This Month Revenue"
                    value={`₹${report.revenueThisMonth.toLocaleString()}`}
                    color="blue"
                />

                <SummaryCard
                    icon={<Home size={32} />}
                    title="Total Bookings"
                    value={report.totalBookings}
                    color="green"
                />

                <SummaryCard
                    icon={<Users size={32} />}
                    title="Top Sellers Count"
                    value={report.topSellers.length}
                    color="purple"
                />
            </div>

            {/* CITY WISE PERFORMANCE */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MapPin size={22} /> Top Cities Performance
                </h3>

                {report.topCities.length === 0 ? (
                    <p className="text-gray-500">No city performance data.</p>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                        <tr className="border-b">
                            <th className="pb-2">City</th>
                            <th className="pb-2">Total Properties</th>
                            <th className="pb-2">Total Views</th>
                            <th className="pb-2">Bookings</th>
                        </tr>
                        </thead>
                        <tbody>
                        {report.topCities.map((city, index) => (
                            <tr key={index} className="border-b">
                                <td>{city.name}</td>
                                <td>{city.propertyCount}</td>
                                <td>{city.views}</td>
                                <td>{city.bookings}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* TOP SELLERS */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
                <h3 className="text-xl font-semibold mb-4">Top Performing Sellers</h3>

                {report.topSellers.length === 0 ? (
                    <p className="text-gray-500">No sellers available.</p>
                ) : (
                    <ul className="space-y-3">
                        {report.topSellers.map((seller, index) => (
                            <li
                                key={index}
                                className="border p-3 rounded-lg flex justify-between items-center hover:bg-gray-50"
                            >
                                <div>
                                    <p className="font-semibold">{seller.name}</p>
                                    <p className="text-gray-500 text-sm">{seller.email}</p>
                                </div>
                                <p className="font-bold text-green-600">
                                    {seller.propertiesListed} Properties
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    );
};

const SummaryCard = ({ icon, title, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border flex items-center gap-5">
        <div className={`p-4 bg-${color}-100 text-${color}-600 rounded-xl`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
        </div>
    </div>
);

export default Report;
