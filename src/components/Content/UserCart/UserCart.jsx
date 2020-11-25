import React, { useContext } from 'react';

import bemCssModules from 'bem-css-modules';

import { default as UserCartStyles } from './UserCart.module.scss';
import { StoreContext } from '../../../store/StoreProvider';
import Perfume from '../../Perfume/Perfume';
import { useHistory } from 'react-router-dom';

const style = bemCssModules(UserCartStyles);



const UserCart = () => {
  const history = useHistory();
  const path = '/';
  const { user, setUser, products } = useContext(StoreContext);
  const boughtSupplies = products
    .filter(product => user.products.some(({ productNr }) => product.id === productNr))
    .map(product => <Perfume isUserContext={true} key={product.id} {...product} />)
  const payOrBuy = user.products.length ? 'Zapłac' : 'Katalog';

  const handleOnClick = () => {
    setUser(prev => {
      prev.products = []
      return prev
    })
    history.push(path);
  }

  return (
    <section className={style()} >
      <h2 className={style('title')}>Twój koszyk</h2>
      <ul className={style('list')}>
        {boughtSupplies}
        <div>
          <button className={style('buy-button')} onClick={handleOnClick} >{payOrBuy}</button>
        </div>
      </ul>
    </section>
  )
};

export default UserCart;