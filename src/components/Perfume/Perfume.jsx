import React, { useContext, useState } from 'react';
import { default as PerfumeStyles } from './Perfume.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import { useHistory } from "react-router-dom";
import bemCssModules from 'bem-css-modules';

const style = bemCssModules(PerfumeStyles);


const Perfume = ({ id, isUserContext = false, img, price, title, stock }) => {

  const { user, setUser, setProducts, setMoneyLeft } = useContext(StoreContext);

  const [buyItems, setBuyItems] = useState(noItems ? 0 : 1);
  const [payPrice, setPayPrice] = useState(price);
  const [userItems, setUserItems] = useState(() => {
    let quantity = 0;
    user?.products.map(product => {

      product.productNr === id ? quantity = product.quantity : null
    })
    return quantity
  });

  const isUserLogged = Boolean(user);



  const handleOnBuy = () => {
    let quantity = 0;
    let isInCart = -1;
    if (user.budget < payPrice) {

      window.alert(`Budżet wyczerpany!, brakuje Ci ${(payPrice - user.budget).toFixed(2)} zł`)
    } else {
      // setBuyItems(prev=>)
      setUser(prev => {
        prev.products.forEach((product, index) => {
          if (product.productNr === id) {
            isInCart = index;
            quantity = product.quantity;
          }
        })
        prev.budget -= payPrice;
        prev.budget.toFixed(2)
        const itemBought = {
          productNr: id,
          quantity: quantity + Number(buyItems),
        }
        if (isInCart === -1) {
          prev.products.push(itemBought)
        } else {
          prev.products.splice(isInCart, 1, itemBought)
        }
        return prev
      })
      setMoneyLeft(prev => prev = user.budget)
      setProducts(prev => {
        prev.map(product => product.id === id ? product.stock -= Number(buyItems) : null)
        return prev
      })
      setUserItems(prev => {
        user.products.map(product => {
          if (product.productNr === id) {
            prev = product.quantity;
          }
        })
        return prev
      })
    }
  }
  const handleOnReturn = () => {
    setUser(prev => {
      prev.products = prev.products.filter(product => product.productNr !== id)
      user.budget += totalPrice;
      prev.budget.toFixed(2)
      return prev
    })
    setMoneyLeft(prev => prev = user.budget)
    setProducts(prev => {
      prev.map(product => {
        if (product.id === id) {
          product.stock += userItems;
        }
      })
      return prev
    })
    setUserItems(prev => { prev = 0; return prev })
  }

  const shouldDisplayBeVisible = isUserLogged && !isUserContext;

  const handleOnChangeItemsToBuy = ({ target }) => {
    setBuyItems(target.value)
    setPayPrice(Number(target.value) * Number(price))
  }
  const noItems = stock > 0 ? false : true;
  const totalPrice = userItems * price;
  const stockOrBouhtItems = !isUserContext
    ? <p className={style('stock')}>{`Dostępność ${stock} szt.`} </p>
    : <div>
      <p className={style('bought')}>{`Ilość w koszyku ${userItems} szt.`} </p>
      <p className={style('total-price')}>{`Cena całkowita: ${totalPrice.toFixed(2)} zł`} </p>
    </div>

  const soldOut = (noItems && !isUserContext) && <p className={style('sold-out')}>sold out</p>

  const buyOrRemoveButton = shouldDisplayBeVisible
    ? <button disabled={noItems} className={style('buy-button')} onClick={handleOnBuy}>Dodaj do koszyka</button>
    : <button disabled={Boolean(!userItems)} className={style('buy-button')} onClick={handleOnReturn}>Anuluj</button>
  return (
    <li>
      <article className={style()}>
        <h3 className={style('title')} >{title}</h3>
        <div className={style('image-wrapper')}>
          <img src={img} alt={title} className={style('image')} />
          {soldOut}
        </div>
        <p className={style('price')}>{`Cena: ${price}zł`} </p>
        {stockOrBouhtItems}
        {shouldDisplayBeVisible &&
          <div className={style('price-wrapper')}>
            <input className={style('buy-number')} type="number" value={buyItems} min={0} max={stock} onChange={handleOnChangeItemsToBuy} />
            <p className={style('total-price')}>Do zapłacenia: {payPrice.toFixed(2)} zł</p>
          </div>
        }
        {isUserLogged && buyOrRemoveButton}
      </article>
    </li>
  )
};

export default Perfume;