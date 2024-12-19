import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ScholarshipsPage = () => {
    const [scholarships, setScholarships] = useState([]);
    const { addToCart } = useCart();
    const [showPopup, setShowPopup] = useState(false); // State for showing popup
    const [popupMessage, setPopupMessage] = useState(""); // Popup message

    useEffect(() => {
        const fetchScholarships = async () => {
            const { data, error } = await supabase.from("scholarships").select("*");
            if (error) console.error("Error fetching scholarships:", error);
            else setScholarships(data);
        };

        fetchScholarships();
    }, []);

    // Function to handle Add to Cart with Popup
    const handleAddToCart = (scholarship) => {
        addToCart(scholarship); // Add to cart logic
        setPopupMessage(`${scholarship.title} added to cart!`);
        setShowPopup(true);

        // Hide the popup after 2 seconds
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Available Courses</h1>

                {/* Scholarships Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {scholarships.map((scholarship) => (
                        <div
                            key={scholarship.id}
                            className="border p-4 rounded-lg shadow-lg"
                        >
                            <h2 className="text-xl font-semibold">{scholarship.title}</h2>
                            <p className="text-sm text-gray-600">{scholarship.description}</p>
                            <p className="mt-2 font-semibold">₹{scholarship.amount}</p>
                            <Link href={`/courses/${scholarship.id}`}>
                                <button
                                    type="button"
                                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-green-600 font-bold">{popupMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScholarshipsPage;
