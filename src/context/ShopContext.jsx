"use client";
import { createContext, useContext, useState, useEffect } from 'react';


const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');   // ← ЗДЕСЬ, внутри
  const [isLoaded, setIsLoaded] = useState(false);
  // Загрузка из localStorage
  useEffect(() => {
    const savedFavs = localStorage.getItem('favorites');
    const savedCart = localStorage.getItem('cart');

    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedCart) setCart(JSON.parse(savedCart));

    setIsLoaded(true);
  }, []);

  // Сохранение избранного
  useEffect(() => {
    if (isLoaded) localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites, isLoaded]);

  // Сохранение корзины
  useEffect(() => {
    if (isLoaded) localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, isLoaded]);

  // ИЗБРАННОЕ
  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // КОРЗИНА
  const addToCart = (product, size) => {
    const numericPrice =
      typeof product.price === 'number'
        ? product.price
        : parseInt(product.price.toString().replace(/[^\d]/g, ''), 10) || 0;

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, size, quantity: 1, numericPrice }];
    });
  };

  const changeQuantity = (id, size, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.size === size) {
          if (type === 'plus') return { ...item, quantity: item.quantity + 1 };
          if (type === 'minus' && item.quantity > 1)
            return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const clearCart = () => setCart([]);

  const value = {
    favorites,
    cart,
    searchQuery,
    setSearchQuery,
    toggleFavorite,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
};

export default ShopContext;