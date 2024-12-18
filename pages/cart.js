import { useCart } from '../context/CartContext';
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from 'next/router';

const CartPage = () => {
    const { cart, removeFromCart } = useCart();
    const router = useRouter();

    const handleGoToForm = () => {
        // Redirect to the application form page
        router.push('/apply');
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
                {cart.length === 0 ? (
                    <p>
                        Your cart is empty.
                        <Link href='/scholarships' className='text-blue-500 underline'>
                            Click Here to view Available Scholarships
                        </Link>
                    </p>
                ) : (
                    <div>
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center p-4 border-b">
                                <div>
                                    <h2 className="text-lg font-semibold">{item.title}</h2>
                                    <p className="text-sm text-gray-600">₹{item.amount}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        {/* Single Apply Button */}
                        <button
                            onClick={handleGoToForm}
                            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Apply for All Courses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
