import Navbar from "@/components/Navbar";
import Link from "next/link";

const SuccessPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-black relative">
            {/* Background lines */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-10 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1%, transparent 1%)",
                    backgroundSize: "50px 50px",
                }}
            ></div>

            <Navbar />

            <div className="max-w-6xl mx-auto p-6 text-center relative z-10">
                <h1 className="text-3xl font-bold mb-4 text-white">
                    Application Submitted Successfully!
                </h1>
                <p className="mb-6 text-gray-300">
                    Thank you for submitting your application. We will get back to you soon.
                </p>
                <Link href="/">
                    <button className="px-6 py-2 bg-gray-700 text-white rounded-2xl font-semibold text-lg transition-transform transform hover:scale-105 duration-300">
                        Go to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
