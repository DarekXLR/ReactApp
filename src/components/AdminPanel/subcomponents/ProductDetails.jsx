import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../store/StoreProvider';
import ProductPopup from './ProductPopup';


const ProductDetails = (props) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const { id } = props;
  const { products, setProducts } = useContext(StoreContext);
  const showPopup = () => setIsOpenPopup(true);
  const hidePopup = () => {
    setIsOpenPopup(false);
  };
  const handleDeleteProduct = () => {
    setProducts(prev => prev.filter(product => product.id !== id));
  }

  let displayedProductTitle = '';
  products.map(product => {
    if (product.id === id) {
      displayedProductTitle = product.title;
    };
  });
  return (
    <details>
      <summary>{displayedProductTitle}</summary>
      <button onClick={showPopup}>Edytuj</button>
      <button onClick={handleDeleteProduct}>Usuń</button>
      <ProductPopup isOpenPopup={isOpenPopup} hidePopup={hidePopup} {...props} />
    </details>
  )
};

export default ProductDetails;