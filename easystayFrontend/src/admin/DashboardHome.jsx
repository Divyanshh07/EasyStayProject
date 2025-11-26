// DashboardHome.jsx
import React, { useEffect, useState } from "react";
import { Download, BarChart3 } from "lucide-react";

const DashboardHome = () => {
    const [loading, setLoading] = useState(true);

    const [summary, setSummary] = useState({
        totalProperties: 0,
        buyCount: 0,
        rentCount: 0,
        pgCount: 0,
        totalSellers: 0,
        totalUsers: 0,
        revenue: 0,
    });

    const [reportData, setReportData] = useState([]);

    // -------------------------------------
    // Fetch reports from /api/properties/all
    // -------------------------------------
    const fetchReports = async () => {
        try {
            const res = await fetch("http://localhost:8081/api/properties/all");
            const data = await res.json();

            setReportData(data);

            let buy = 0, rent = 0, pg = 0;

            data.forEach((p) => {
                if (p.listingType === "Buy") buy++;
                if (p.listingType === "Rent") rent++;
                if (p.listingType === "PG") pg++;
            });

            setSummary({
                totalProperties: data.length,
                buyCount: buy,
                rentCount: rent,
                pgCount: pg,
                totalSellers: 12,
                totalUsers: 34,
                revenue: 0,
            });

        } catch (err) {
            console.error("Error loading reports:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // ---------------------------
    // CSV Export
    // ---------------------------
    const downloadCSV = () => {
        let csv = "Property Name,City,Type,Seller,Price\n";

        reportData.forEach((item) => {
            csv += `${item.name},${item.city},${item.listingType},${item.sellerNumber},${item.price}\n`;
        });

        const blob = new Blob([csv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "property_report.csv";
        link.click();
    };

    return (
        <div className="p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Dashboard Home</h2>

                <button
                    onClick={downloadCSV}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    <Download size={20} /> Export CSV
                </button>
            </div>

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card title="Total Properties" value={summary.totalProperties} />
                <Card title="Buy Listings" value={summary.buyCount} />
                <Card title="Rent Listings" value={summary.rentCount} />
                <Card title="PG Listings" value={summary.pgCount} />
            </div>

            {/* PROPERTY TABLE */}
            <div className="bg-white shadow-md rounded-lg p-4 mt-8">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-3">
                    <BarChart3 size={22} /> Property Performance Report
                </h3>

                {loading ? (
                    <p className="text-center py-4 text-gray-500">Loading...</p>
                ) : reportData.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">
                        No properties found.
                    </p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Property Name</th>
                            <th className="p-3">City</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Seller</th>
                            <th className="p-3">Price</th>
                        </tr>
                        </thead>

                        <tbody>
                        {reportData.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.city}</td>
                                <td className="p-3">{item.listingType}</td>
                                <td className="p-3">{item.sellerEmail}</td>
                                <td className="p-3">₹{item.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};


// SUMMARY CARD COMPONENT
const Card = ({ title, value }) => (
    <div className="bg-white shadow-md p-5 rounded-xl border">
        <h4 className="text-gray-500 text-sm">{title}</h4>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

export default DashboardHome;
