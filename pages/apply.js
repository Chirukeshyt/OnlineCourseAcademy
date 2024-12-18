import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabaseClient';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

const ApplyPage = () => {
    const { cart, clearCart } = useCart();
    const router = useRouter();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
    });

    useEffect(() => {
        if (cart.length === 0) {
            router.push('/cart'); // Redirect back if cart is empty
        }
    }, [cart, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            for (const item of cart) {
                const { error } = await supabase.from('applications').insert({
                    user_id: 'your-user-id', // Replace with dynamic user ID
                    scholarship_id: item.id,
                    ...formData,
                });

                if (error) {
                    console.error('Error submitting application:', error);
                    alert(`Failed to apply for ${item.title}`);
                    return;
                }
            }
            alert('Applications submitted successfully!');
            clearCart();
            router.push('/cart');
        } catch (error) {
            console.error('Submission Error:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">Application Form</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <h2 className="text-lg font-semibold mt-6">Selected Courses:</h2>
                    <ul className="list-disc pl-5">
                        {cart.map((item) => (
                            <li key={item.id}>{item.title} - ₹{item.amount}</li>
                        ))}
                    </ul>

                    <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Submit Applications
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyPage;
