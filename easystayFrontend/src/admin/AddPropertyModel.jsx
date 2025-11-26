import React from "react";
import { motion } from "framer-motion";

const AddPropertyModal = ({ close }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50"
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg"
            >
                <h2 className="text-xl font-bold mb-4">Add New Property</h2>

                <input
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Property Name"
                />
                <input
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Price"
                />
                <textarea className="w-full border p-2 mb-3 rounded" placeholder="Description" />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={close}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Submit
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AddPropertyModal;
