import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddProperty = () => {
    const navigate = useNavigate();
    const seller = JSON.parse(localStorage.getItem("user")); // Logged-in seller

    const [form, setForm] = useState({
        title: "",
        type: "",
        listingType: "",
        city: "",
        locality: "",
        fullAddress: "",
        price: "",
        securityDeposit: "",
        imageUrl: "",
        imageGallery: "",
        description: "",
        amenities: "",
        locationUrl: "",
        latitude: "",
        longitude: ""
    });

    // INPUT HANDLER
    const change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // SUBMIT PROPERTY
    const submit = async () => {
        if (!form.title || !form.city || !form.price) {
            alert("Please fill Title, City, and Price.");
            return;
        }

        const finalData = {
            ...form,

            // Convert number fields
            price: parseFloat(form.price),
            securityDeposit: parseFloat(form.securityDeposit || 0),

            // Convert comma-separated fields into arrays
            imageGallery: form.imageGallery
                ? form.imageGallery.split(",").map((s) => s.trim())
                : [],

            amenities: form.amenities
                ? form.amenities.split(",").map((s) => s.trim())
                : [],

            latitude: parseFloat(form.latitude),
            longitude: parseFloat(form.longitude),

            // Seller Info
            sellerName: seller.name,
            sellerEmail: seller.email,
            sellerNumber: seller.phone || seller.mobile,

            // Property Status
            available: true,
            status: "Available"
        };

        try {
            await axios.post("http://localhost:8081/api/properties/add", finalData);
            alert("Property Added Successfully!");
            navigate("/seller-dashboard");
        } catch (error) {
            console.error("Error adding property:", error);
            alert("Failed to add property");
        }
    };

    return (
        <div className="p-6">

            {/* BACK BUTTON */}
            <Link
                to="/seller-dashboard"
                className="text-blue-600 underline mb-4 inline-block"
            >
                ← Back
            </Link>

            <h2 className="text-3xl font-bold mb-6">Add New Property</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    name="type"
                    placeholder="Property Type (Flat, House, PG...)"
                    value={form.type}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <select
                    name="listingType"
                    value={form.listingType}
                    onChange={change}
                    className="border p-3 rounded"
                >
                    <option value="">Select Listing Type</option>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                    <option value="PG">PG</option>
                </select>

                <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    name="locality"
                    placeholder="Locality"
                    value={form.locality}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    name="fullAddress"
                    placeholder="Full Address"
                    value={form.fullAddress}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    name="securityDeposit"
                    type="number"
                    placeholder="Security Deposit"
                    value={form.securityDeposit}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    name="imageUrl"
                    placeholder="Main Image URL"
                    value={form.imageUrl}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    name="imageGallery"
                    placeholder="Image Gallery (comma separated URLs)"
                    value={form.imageGallery}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    name="locationUrl"
                    placeholder="Google Maps URL"
                    value={form.locationUrl}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    name="latitude"
                    placeholder="Latitude"
                    value={form.latitude}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    name="longitude"
                    placeholder="Longitude"
                    value={form.longitude}
                    onChange={change}
                    className="border p-3 rounded"
                />

            </div>

            {/* DESCRIPTION */}
            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={change}
                rows={5}
                className="border p-3 rounded w-full mt-6"
            />

            {/* AMENITIES */}
            <textarea
                name="amenities"
                placeholder="Amenities (comma separated: WiFi, Parking, AC...)"
                value={form.amenities}
                onChange={change}
                rows={3}
                className="border p-3 rounded w-full mt-4"
            />

            {/* SUBMIT BUTTON */}
            <button
                onClick={submit}
                className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
                Add Property
            </button>

        </div>
    );
};

export default AddProperty;
