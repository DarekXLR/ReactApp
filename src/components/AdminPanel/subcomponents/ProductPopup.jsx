import React, { useContext, useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';
import { default as ProductPopupStyles } from './ProductPopup.module.scss';
import Modal from '../../Modal/Modal';
import { StoreContext } from '../../../store/StoreProvider';

const style = bemCssModules(ProductPopupStyles);
const { v4: uuid } = require('uuid');
const ProductPopup = ({
  hidePopup,
  isEditMode = true,
  isOpenPopup,
  id,
  img = '',
  price = '',
  title = '',
  stock = '',
}) => {

  const [formStock, setFormStock] = useState(stock);
  const [formImg, setFormImg] = useState(img);
  const [formPrice, setFormPrice] = useState(price);
  const [formTitle, setFormTitle] = useState(title);

  const { setProducts } = useContext(StoreContext);

  const handleOnChangeStock = event => setFormStock(event.target.value);
  const handleOnChangeImg = event => setFormImg(event.target.value);
  const handleOnChangePrice = event => setFormPrice(event.target.value);
  const handleOnChangeTitle = event => setFormTitle(event.target.value);

  const handleOnSubmit = event => {
    event.preventDefault();
    const productObject = {
      id,
      img: formImg,
      price: Number(formPrice),
      title: formTitle,
      stock: Number(formStock),
    };
    if (isEditMode) {
      setProducts(prev => {
        prev.map((product, index) => {
          if (product.id === id) {
            prev.splice(index, 1, productObject);
          };
        });
        return prev;
      });
    } else {
      productObject.id = uuid()
      setProducts(prev => {
        prev.push(productObject);
        return prev;
      })
    }
    hidePopup();

  };

  const correctLabel = isEditMode ? 'Aktualizuj produkt' : 'Utwórz produkt';

  return (
    <Modal handleOnClose={hidePopup} isOpen={isOpenPopup} >
      <div className={style()}>
        <form className={style('form')} method="submit" onSubmit={handleOnSubmit} >
          <div className={style('form-row')}>
            <label>
              Tytuł:
              <input className={style('input')} onChange={handleOnChangeTitle} type="text" value={formTitle} />

            </label>
          </div>

          <div className={style('form-row')}>
            <label>
              Obrazek url:
              <input className={style('input')} onChange={handleOnChangeImg} type="text" value={formImg} />

            </label>
          </div>
          <div className={style('form-row')}>
            <label>
              Cena:
              <input className={style('input')} onChange={handleOnChangePrice} type="number" value={formPrice} />
            </label>
          </div>
          <div className={style('form-row')}>
            <label>
              Ilość:
              <input className={style('input')} onChange={handleOnChangeStock} type="number" value={formStock} />
            </label>
          </div>
          <button type="submit">{correctLabel}</button>
          <button onClick={hidePopup} type="button">Anuluj</button>
        </form>
      </div>
    </Modal>
  );
};

export default ProductPopup;