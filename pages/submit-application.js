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
                // alert('Applications submitted successfully!');
                clearCart(); // Clear the cart after successful submission
                router.push('/success'); // Redirect to home page
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Submit Applications</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="first_name" className="block font-medium">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block font-medium">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone_number" className="block font-medium">Phone Number</label>
                        <input
                            type="tel"
                            id="phone_number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                            className="border p-2 w-full rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit Applications
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitApplicationPage;
