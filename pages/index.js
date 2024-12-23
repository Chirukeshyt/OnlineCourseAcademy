import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
    const [courses, setCourses] = useState([]); // State to store courses
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from("scholarships") // Replace 'scholarships' with your table name
                    .select("*"); // Fetch all rows and columns

                if (error) {
                    console.error("Error fetching courses:", error.message);
                } else {
                    setCourses(data); // Set fetched data in state
                }
            } catch (err) {
                console.error("Unexpected error:", err.message);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in ms
            easing: "ease-in-out", // Easing for animations
            once: false, // Allow animations to trigger again on scroll up
        });
    }, []);

    return (
        <div className="min-h-screen bg-black text-white relative">
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

            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                </div>
            )}

            {!loading && (
                <>
                    {/* Hero Section */}
                    <section className="py-16 relative z-10">
                        <div className="max-w-7xl mx-auto px-6" data-aos="fade-up">
                            <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white rounded-lg shadow-lg py-16 px-10 border border-gray-600">
                                <h1 className="text-5xl font-extrabold text-center mb-4">
                                    Welcome to Online Cou
                                </h1>
                                <p className="text-lg text-center mb-8">
                                    Discover premium online programming courses designed to help you
                                    succeed. Learn at your own pace and elevate your skills!
                                </p>
                                <div className="text-center">
                                    <Link href="/scholarships">
                                        <button
                                            type="button"
                                            className="bg-white text-black font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-200 hover:shadow-lg transition-transform transform hover:scale-110 duration-300"
                                        >
                                            Apply for our Courses
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto p-6 relative z-10">
                        <h2
                            className="text-2xl font-bold text-center mb-6"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            Offered Courses
                        </h2>

                        {courses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map((course, index) => (
                                    <div
                                        key={course.id}
                                        className="border border-gray-600 rounded-lg shadow-md overflow-hidden bg-gradient-to-br from-gray-800 via-black to-gray-900 hover:shadow-lg transition-transform transform hover:scale-105 duration-500"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100} // Staggered animations
                                    >
                                        {/* Course Details */}
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold mb-2 text-white">
                                                {course.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4">
                                                {course.description}
                                            </p>
                                            {course.amount && (
                                                <p className="mt-2 font-bold text-white">
                                                    ₹{course.amount}
                                                </p>
                                            )}
                                            <Link href={`/courses/${course.id}`}>
                                                <button
                                                    type="button"
                                                    className="mt-4 w-full bg-white text-black py-2 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300"
                                                >
                                                    Learn More
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-400" data-aos="fade-in">
                                No courses available.
                            </p>
                        )}
                    </div>

                    {/* Call to Action Banner */}
                    <section className="bg-gradient-to-br from-gray-800 via-black to-gray-900 py-10 border-t border-gray-600 relative z-10">
                        <div className="max-w-7xl mx-auto text-center" data-aos="zoom-in">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Ready to transform your skills?
                            </h2>
                            <p className="text-gray-400 mb-6">
                                Join thousands of learners and take the next step in your career. Enroll today and start
                                learning!
                            </p>
                            <Link href="/scholarships">
                                <button
                                    type="button"
                                    className="bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-110 duration-300"
                                >
                                    Explore Our Course
                                </button>
                            </Link>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
