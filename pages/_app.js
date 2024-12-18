import '../styles/globals.css'; // Import your global CSS file
import { CartProvider } from '../context/CartContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
    return (
        <CartProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CartProvider>
    );
}

export default MyApp;
