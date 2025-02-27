import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext"; // Import the CartContext

const Navbar = () => {
    const { cartItemCount } = useCart(); // Get the cart item count

    return (
        <nav className="p-4 text-white bg-blue-600 shadow-md">
            <div className="container flex justify-between items-center mx-auto">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold transition duration-300 hover:text-gray-200">
                   ONLINE COURSES ACADEMY
                </Link>

                 {/*Navigation Links*/}
                <div className="hidden justify-center items-center space-x-6 lg:flex">
                    <Link href="/" className="text-lg font-semibold transition duration-300 hover:text-gray-200">
                        Home
                    </Link>
                    {/*<Link href="/dashboard" className="text-lg font-semibold transition duration-300 hover:text-gray-200">*/}
                    {/*    Dashboard*/}
                    {/*</Link>*/}
                    <Link href="/scholarships" className="text-lg font-semibold transition duration-300 hover:text-gray-200">
                        Course
                    </Link>
                    {/*<Link href="/application" className="text-lg font-semibold transition duration-300 hover:text-gray-200">*/}
                    {/*    Apply*/}
                    {/*</Link>*/}
                </div>

                {/* Cart */}
                <Link href="/cart" className="relative text-lg font-semibold transition duration-300 hover:text-gray-200">
                    <Image src="/img.png" width={30} height={30} alt="cart" />
                    <span className="absolute -top-2 -right-3 px-2 text-xs text-white bg-red-500 rounded-full">
            {cartItemCount}
          </span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
