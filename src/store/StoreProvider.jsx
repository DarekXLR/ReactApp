import React, { useState, createContext } from 'react';
import productsData from './data/products';

export const StoreContext = createContext([]);

const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([...productsData]);
  const [user, setUser] = useState(null);
  const [moneyLeft, setMoneyLeft] = useState(0);

  return (

    <StoreContext.Provider value={{
      products,
      setProducts,
      user,
      setUser,
      moneyLeft,
      setMoneyLeft,
    }}>
      {children}
    </StoreContext.Provider>

  )
};

export default StoreProvider;