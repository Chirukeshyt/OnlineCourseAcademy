// components/Layout.js
import Navbar from './Navbar'; // Import your Navbar component (already created)
import Footer from './Footer'; // You can create a Footer component similarly
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}

      {/* Main content */}
      <main className="flex-1 bg-gray-50">{children}</main>
     
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
