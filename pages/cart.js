import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';
import Navbar from "@/components/Navbar";
import Link from "next/link";

const CartPage = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const router = useRouter();

    const handleProceedToSubmit = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add courses to proceed.");
        } else {
            router.push('/submit-application'); // Redirect to form page
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
                {cart.length === 0 ? (
                    <p>
                        Your cart is empty.
                        <Link href="/scholarships" className="text-blue-500 underline">
                            View Available Courses
                        </Link>
                    </p>
                ) : (
                    <div>
                        {cart.map((item) => (
                            <div key={item.id} className="border-b p-4">
                                <h2 className="font-semibold text-lg">{item.title}</h2>
                                <p className="text-gray-600">₹{item.amount}</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleProceedToSubmit}
                            className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Submit Applications
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
