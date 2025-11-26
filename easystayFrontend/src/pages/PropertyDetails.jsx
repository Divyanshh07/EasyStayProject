import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    MdLocationPin,
    MdOutlineBed,
    MdOutlineBathtub,
    MdSquareFoot,
} from "react-icons/md";

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        axios
            .get(`http://localhost:8081/api/properties/${id}`)
            .then((res) => setProperty(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!property)
        return <h1 className="text-center mt-20 text-xl">Loading...</h1>;

    return (
        <div className="max-w-6xl mx-auto p-15 bg-gray-100 min-h-screen">

            {/* ===== IMAGE GALLERY ===== */}
            <div className="flex flex-col gap-3 mb-6">
                <img
                    src={
                        property.imageGallery && property.imageGallery.length > 0
                            ? property.imageGallery[activeImage]
                            : property.imageUrl
                    }
                    alt="property"
                    className="w-full h-72 md:h-96 object-cover rounded-lg shadow-md"
                />

                {property.imageGallery && property.imageGallery.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                        {property.imageGallery.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`thumb-${idx}`}
                                className={`w-20 h-16 object-cover rounded cursor-pointer border-2 ${
                                    idx === activeImage ? "border-blue-600" : "border-gray-300"
                                }`}
                                onClick={() => setActiveImage(idx)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ===== PROPERTY INFO ===== */}
            <div className="md:flex md:gap-6">

                {/* LEFT SECTION */}
                <div className="md:w-2/3 bg-white rounded-lg shadow-md p-6 space-y-4">

                    <h1 className="text-2xl font-bold text-gray-800">{property.title}</h1>
                    <p className="flex items-center gap-1 text-gray-600">
                        <MdLocationPin className="text-red-500" /> {property.locality}, {property.city}
                    </p>

                    {property.fullAddress && (
                        <p className="text-gray-500 text-sm">{property.fullAddress}</p>
                    )}

                    <p className="text-xl font-bold text-green-600">
                        ₹ {property.price.toLocaleString()} / {property.listingType}
                    </p>

                    {property.securityDeposit > 0 && (
                        <p className="text-gray-700">Security Deposit: ₹ {property.securityDeposit.toLocaleString()}</p>
                    )}

                    {/* Property Features */}
                    <div className="flex flex-wrap gap-6 text-gray-700 mt-3">
                        {property.bedrooms && (
                            <div className="flex items-center gap-1">
                                <MdOutlineBed className="text-blue-600" /> {property.bedrooms} Beds
                            </div>
                        )}
                        {property.bathrooms && (
                            <div className="flex items-center gap-1">
                                <MdOutlineBathtub className="text-blue-600" /> {property.bathrooms} Baths
                            </div>
                        )}
                        {property.area && (
                            <div className="flex items-center gap-1">
                                <MdSquareFoot className="text-blue-600" /> {property.area} sqft
                            </div>
                        )}
                        {property.type && <div>Type: {property.type}</div>}
                    </div>

                    {/* ✅ Updated Seller Info */}
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Seller Information:</h3>

                        <p>Name: {property.sellerName || property.seller_name || "Unknown"}</p>

                        <p>
                            Contact: {
                            property.sellerPhone ||        // camelCase
                            property.seller_phone ||       // snake_case
                            property.sellerNumber ||       // old field
                            property.seller_number ||
                            "Not Available"
                        }
                        </p>

                        <p>Email: {property.sellerEmail || property.seller_email || "Not Available"}</p>
                    </div>

                    {/* Amenities */}
                    {property.amenities && property.amenities.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2">Amenities:</h3>
                            <div className="flex flex-wrap gap-2">
                                {property.amenities.map((a, i) => (
                                    <span
                                        key={i}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                    >
                                        {a}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {property.description && (
                        <div>
                            <h3 className="font-semibold mb-2">Description:</h3>
                            <p className="text-gray-700">{property.description}</p>
                        </div>
                    )}

                    {/* Map */}
                    {property.latitude && property.longitude && (
                        <div>
                            <h3 className="font-semibold mb-2">Location:</h3>
                            <iframe
                                src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                                width="100%"
                                height="250"
                                loading="lazy"
                                className="rounded-lg"
                                title="property location"
                            ></iframe>
                        </div>
                    )}

                    {/* Status */}
                    <div>
                        <p>Status: <span className={property.available ? "text-green-600" : "text-red-600"}>
                            {property.status}
                        </span></p>

                        <p>Posted At: {new Date(property.postedAt).toLocaleString()}</p>
                    </div>
                </div>

                {/* RIGHT SECTION  */}
                <div className="md:w-1/3 mt-5 md:mt-0 flex flex-col gap-4">
                    <div className="bg-white rounded-lg shadow-md p-5 sticky top-20">
                        <h3 className="font-semibold text-lg mb-2">Interested?</h3>
                        <p className="text-gray-600 mb-4">Contact the owner or schedule a visit.</p>

                        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold">
                            Contact Owner
                        </button>

                        <button className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition font-semibold">
                            Schedule Visit
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PropertyDetails;
