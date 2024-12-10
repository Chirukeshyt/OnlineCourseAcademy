import Link from "next/link";

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link href='/'>      <h1 className="text-xl font-bold">Scholarship System</h1>
      </Link>
      <div className="lg:flex">
        <Link href="/"><p className="px-4 text-lg font-bold hover:underline">Home</p></Link>
        {/* <Link href="/dashboard"><p className="px-4 hover:underline">Dashboard</p></Link> */}
        <Link href="/scholarships"><p className="px-4 text-lg font-bold hover:underline">Scholarships</p></Link>
        {/* <Link href="/application"><p className="px-4 hover:underline">Apply</p></Link> */}

      </div>
    </div>
  </nav>
);

export default Navbar;
