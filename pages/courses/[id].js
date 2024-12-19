import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "@/components/Navbar";
import {useCart} from "@/context/CartContext";
import {useState} from "react";

export default function CoursePage({ course, error }) {
    const router = useRouter();
    const { addToCart } = useCart();
    const [showPopup, setShowPopup] = useState(false); // State for showing popup
    const [popupMessage, setPopupMessage] = useState(""); // Popup message

    // Handle loading state for fallback pages
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    // Handle errors
    if (error) {
        return (
            <div>
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
        <div className="bg-gray-50 min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Course Details */}
            <div className="max-w-5xl mx-auto p-6">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden border">
                    {/* Course Image */}
                    {/*{course.image_url && (*/}
                    {/*    <img*/}
                    {/*        src={course.image_url}*/}
                    {/*        alt={course.title}*/}
                    {/*        className="w-full h-60 object-cover"*/}
                    {/*    />*/}
                    {/*)}*/}

                    {/* Course Info */}
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
                        <p className="text-gray-700 text-lg mb-4">{course.description}</p>

                        <div className="flex items-center justify-between mb-6">
                            <span className="text-2xl font-semibold text-blue-600">
                                ₹{course.amount}
                            </span>
                        </div>

                        {/* Additional Information (optional) */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                Course Highlights:
                            </h2>
                            <ul className="list-disc pl-6 text-gray-700">
                                <li>Comprehensive course materials</li>
                                <li>Access to recorded sessions</li>
                                <li>Expert instructors with industry experience</li>
                                <li>Certification upon completion</li>
                            </ul>
                        </div>
                        <button
                            onClick={() => handleAddToCart(course)}
                            className="bg-blue-600 mt-5 text-white py-2 px-6 rounded-lg hover:bg-blue-700 w-full transition-all"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-green-600 font-bold">{popupMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

// Fetch course data based on ID
export async function getServerSideProps({params}) {
    try {
        const {id} = params;

        console.log("Fetching course data for ID:", id); // Debug log

        const {data: course, error} = await supabase
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
