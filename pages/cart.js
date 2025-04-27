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

            <div className="max-w-6xl mx-auto p-6 relative z-10">
                <h1 className="text-3xl font-bold mb-6 text-white text-center">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-white">
                        Your cart is empty ryt now...!
                        <Link href="/scholarships" className="text-blue-500 underline">
                            View Available Courses Now...!
                        </Link>
                    </p>
                ) : (
                    <div>
                        {cart.map((item) => (
                            <div key={item.id} className="border-b p-4 text-white">
                                <h2 className="font-semibold text-lg">{item.title}</h2>
                                <p className="text-gray-400">₹{item.amount}</p>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Remove Item!
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={handleProceedToSubmit}
                            className="mt-4 px-6 py-2 bg-white w-full text-black rounded hover:bg-green-600 transition-transform transform hover:scale-105 font-semibold text-lg duration-300"
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
