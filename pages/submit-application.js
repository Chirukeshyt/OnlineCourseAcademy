import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useCart } from '../context/CartContext';
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/router';

const SubmitApplicationPage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
    });
    const { cart, clearCart } = useCart();
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert('Your cart is empty. Please add courses to submit.');
            return;
        }

        try {
            const applications = cart.map((course) => ({
                ...formData,
                scholarship_id: course.id, // Store course ID in applications
            }));

            const { data, error } = await supabase.from('applications').insert(applications);

            if (error) {
                console.error('Submission failed:', error);
                alert('Submission failed. Please try again.');
            } else {
                clearCart(); // Clear the cart after successful submission
                router.push('/success'); // Redirect to home page
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            alert('Something went wrong. Please try again.');
        }
    };

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

            <div className="max-w-4xl mx-auto p-6 relative z-10">
                <h1 className="text-3xl font-bold mb-6 text-white text-center">Submit Applications</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 rounded-lg shadow-lg">
                    <div>
                        <label htmlFor="first_name" className="block font-medium text-white">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your First Name"
                            className="border border-gray-600 p-2 w-full rounded text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block font-medium text-white">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your Name"
                            className="border border-gray-600 p-2 w-full rounded text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your Email"
                            className="border border-gray-600 p-2 w-full rounded text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone_number" className="block font-medium text-white">Phone Number</label>
                        <input
                            type="tel"
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                            placeholder="Enter your Phone Number"
                            className="border border-gray-600 p-2 w-full rounded text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded  transition-transform transform hover:scale-105 duration-300"
                    >
                        Submit Applications
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitApplicationPage;
