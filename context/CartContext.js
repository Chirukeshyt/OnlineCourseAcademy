import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const cartItemCount = cart.length;
  const clearCart = () => {
    setCart([]); // Clears the cart
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartItemCount, clearCart  }}>
      {children}
    </CartContext.Provider>
  );
};
