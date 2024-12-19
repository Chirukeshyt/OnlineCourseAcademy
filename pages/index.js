import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function HomePage() {
    const [courses, setCourses] = useState([]); // State to store courses
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from("scholarships") // Replace 'courses' with your table name
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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <Navbar/>

            {/* Hero Section */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div
                        className="bg-gradient-to-r from-gray-700 to-gray-500 text-white rounded-lg shadow-lg py-16 px-10">
                        <h1 className="text-5xl font-extrabold text-center mb-4">
                            Welcome to Online Course Academy
                        </h1>
                        <p className="text-lg text-center mb-8">
                            Discover premium online programming courses designed to help you
                            succeed. Learn at your own pace and elevate your skills!
                        </p>
                        <div className="text-center">
                            <Link href="/scholarships">
                                <button
                                    type="button"
                                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300"
                                >
                                    Apply for our Courses
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">
                <h2 className="text-xl font-bold text-center mb-6">Offered Courses</h2>

                {loading ? (
                    <p className="text-center text-gray-600">Loading courses...</p>
                ) : courses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course.id}
                                className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200"
                            >
                                {/*/!* Course Image *!/*/}
                                {/*{course.image_url && (*/}
                                {/*    <img*/}
                                {/*        src={course.image_url}*/}
                                {/*        alt={course.title}*/}
                                {/*        className="w-full h-40 object-cover"*/}
                                {/*    />*/}
                                {/*)}*/}

                                {/* Course Details */}
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                                    <p className="text-gray-700 text-sm mb-4">{course.description}</p>
                                    {course.amount && (
                                        <p className="mt-2 font-bold text-blue-600">
                                            ₹{course.amount}
                                        </p>
                                    )}
                                    <Link href={`/courses/${course.id}`}>
                                        <button
                                            type="button"
                                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                        >
                                            Learn More
                                        </button>
                                    </Link>

                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No courses available.</p>
                )}
            </div>

            {/* Call to Action Banner */}
            <section className="bg-blue-50 py-10">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">
                        Ready to transform your skills?
                    </h2>
                    <p className="text-gray-700 mb-6">
                        Join thousands of learners and take the next step in your career. Enroll today and start
                        learning!
                    </p>
                    <Link href="/scholarships">
                        <button
                            type="button"
                            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700"
                        >
                            Explore Our Courses
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
