import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";

const ScholarshipsPage = () => {
    const [scholarships, setScholarships] = useState([]);
    const { addToCart } = useCart();
    const [showPopup, setShowPopup] = useState(false); // State for showing popup
    const [popupMessage, setPopupMessage] = useState(""); // Popup message
    const [loading, setLoading] = useState(true); // Loading state to handle spinner

    useEffect(() => {
        const fetchScholarships = async () => {
            const { data, error } = await supabase.from("scholarships").select("*");
            if (error) {
                console.error("Error fetching scholarships:", error);
            } else {
                setScholarships(data);
            }
            setLoading(false); // Set loading to false after data is fetched
        };

        fetchScholarships();
    }, []);

    // Initialize AOS for animations
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration
            easing: "ease-in-out", // Animation easing
            once: false, // Reverse animations on scroll
        });
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
        <div className="min-h-screen bg-black text-white relative">
            {/* Background Strokes */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-gray-800 via-black to-gray-800 pointer-events-none opacity-10"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.1) 1%, transparent 1%)",
                    backgroundSize: "40px 40px",
                }}
            ></div>

            <Navbar />

            {/* Show Loading Spinner */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
                </div>
            )}

            {/* Main Content - Show only when data is loaded */}
            {!loading && (
                <div className="max-w-6xl mx-auto p-6 relative z-10">
                    <h1
                        className="text-3xl font-bold mb-6 text-center"
                        data-aos="fade-up"
                    >
                        Available Courses
                    </h1>

                    {/* Scholarships Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {scholarships.map((scholarship, index) => (
                            <div
                                key={scholarship.id}
                                className="border border-gray-600 bg-gradient-to-br from-gray-800 via-black to-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
                                data-aos="fade-up"
                                data-aos-delay={index * 100} // Staggered animations
                            >
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-white">
                                        {scholarship.title}
                                    </h2>
                                    <p className="text-sm text-gray-400">
                                        {scholarship.description}
                                    </p>
                                    <p className="mt-2 font-semibold text-white">
                                        ₹{scholarship.amount}
                                    </p>
                                    <Link href={`/courses/${scholarship.id}`}>
                                        <button
                                            type="button"
                                            className="mt-4 w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300"
                                        >
                                            Learn More
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleAddToCart(scholarship)}
                                        className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Popup */}
            {showPopup && (
                <div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
                    data-aos="zoom-in"
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg z-50">
                        <p className="text-green-600 font-bold">{popupMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScholarshipsPage;
