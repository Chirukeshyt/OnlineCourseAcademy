import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext"; // Import the CartContext

const Navbar = () => {
    const { cartItemCount } = useCart(); // Get the cart item count

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold hover:text-gray-200 transition duration-300">
                   ONLINE COURSES ACADEMY
                </Link>

                 {/*Navigation Links*/}
                <div className="hidden justify-center items-center lg:flex space-x-6">
                    <Link href="/" className="hover:text-gray-200 transition duration-300 text-lg font-semibold">
                        Home
                    </Link>
                    {/*<Link href="/dashboard" className="hover:text-gray-200 transition duration-300 text-lg font-semibold">*/}
                    {/*    Dashboard*/}
                    {/*</Link>*/}
                    <Link href="/scholarships" className="hover:text-gray-200 transition duration-300 text-lg font-semibold">
                        Courses
                    </Link>
                    {/*<Link href="/application" className="hover:text-gray-200 transition duration-300 text-lg font-semibold">*/}
                    {/*    Apply*/}
                    {/*</Link>*/}
                </div>

                {/* Cart */}
                <Link href="/cart" className="relative hover:text-gray-200 transition duration-300 text-lg font-semibold">
                    <Image src="/img.png" width={30} height={30} alt="cart" />
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
            {cartItemCount}
          </span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
