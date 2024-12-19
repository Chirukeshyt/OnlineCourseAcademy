import Navbar from "@/components/Navbar";
import Link from "next/link";

const SuccessPage = () => {
    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Application Submitted Successfully!</h1>
                <p className="mb-6">Thank you for submitting your application. We will get back to you soon.</p>
                <Link href="/" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
