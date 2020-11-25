import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import ProductDetails from './subcomponents/ProductDetails';
import ProductPopup from './subcomponents/ProductPopup';

const AdminPanel = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { products } = useContext(StoreContext);
  const showPopup = () => setIsOpenPopup(true);
  const hidePopup = () => {
    setIsOpenPopup(false);
  };

  const productsElements = products.map(product => <ProductDetails key={product.id} {...product} />);

  return (
    <section>
      {productsElements}
      <button onClick={showPopup}>Dodaj nowy produkt</button>
      <ProductPopup isEditMode={false} isOpenPopup={isOpenPopup} hidePopup={hidePopup} />
    </section>
  );
};

export default AdminPanel;