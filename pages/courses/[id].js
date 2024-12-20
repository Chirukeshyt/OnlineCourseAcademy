import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CoursePage({ course, error }) {
    const router = useRouter();
    const { addToCart } = useCart();
    const [showPopup, setShowPopup] = useState(false); // State for showing popup
    const [popupMessage, setPopupMessage] = useState(""); // Popup message

    // Handle loading state for fallback pages
    if (router.isFallback) {
        return <div className="text-white">Loading...</div>;
    }

    // Handle errors
    if (error) {
        return (
            <div className="bg-black text-white min-h-screen">
                <Navbar />
                <div className="max-w-4xl mx-auto p-6 text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Error</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }
    const handleAddToCart = (course) => {
        addToCart(course); // Add to cart logic
        setPopupMessage(`${course.title} added to cart!`);
        setShowPopup(true);

        // Hide the popup after 2 seconds
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };

    return (
        <div className="bg-black text-white min-h-screen relative">
            {/* Background Strokes */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-gray-800 via-black to-gray-800 pointer-events-none opacity-10"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1%, transparent 1%)",
                    backgroundSize: "40px 40px",
                }}
            ></div>

            {/* Navbar */}
            <Navbar />

            {/* Course Details */}
            <div className="max-w-5xl mx-auto p-6 relative z-10">
                <div className="bg-gradient-to-br from-gray-800 via-black to-gray-900 text-white shadow-lg rounded-lg overflow-hidden border border-gray-600">
                    {/* Course Info */}
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                        <p className="text-gray-400 text-lg mb-4">{course.description}</p>

                        <div className="flex items-center justify-between mb-6">
                            <span className="text-2xl font-semibold text-white">₹{course.amount}</span>
                        </div>

                        {/* Additional Information (optional) */}
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2">Course Highlights:</h2>
                            <ul className="list-disc pl-6 text-gray-400">
                                <li>Comprehensive course materials</li>
                                <li>Access to recorded sessions</li>
                                <li>Expert instructors with industry experience</li>
                                <li>Certification upon completion</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleAddToCart(course)}
                            className="bg-white text-black mt-5 py-2 px-6 rounded-lg hover:bg-gray-200 w-full transition-transform transform hover:scale-105 duration-300"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            {/* Popup */}
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg z-50">
                        <p className="text-green-600 font-bold">{popupMessage}</p>
                    </div>
                </div>
            )}

        </div>
    );
}

// Fetch course data based on ID
export async function getServerSideProps({ params }) {
    try {
        const { id } = params;

        console.log("Fetching course data for ID:", id); // Debug log

        const { data: course, error } = await supabase
            .from("scholarships") // Replace with your table name
            .select("*")
            .eq("id", id)
            .single();

        if (error || !course) {
            console.error("Error fetching course:", error?.message || "Not found");
            return {
                props: { error: "Course not found or error fetching data." },
            };
        }

        return {
            props: { course },
        };
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return {
            props: { error: "Unexpected error occurred while fetching course data." },
        };
    }
}
