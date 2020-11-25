import React, { useContext, useEffect, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import { StoreContext } from '../../store/StoreProvider';

import { default as HeaderStyles } from './Header.module.scss';
import LoginForm from '../LoginForm/LoginForm';

const style = bemCssModules(HeaderStyles)

const Header = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser, moneyLeft, setMoneyLeft } = useContext(StoreContext);
  const handleOnClose = () => { setIsModalOpen(false); };


  const handleonClick = () => {
    if (Boolean(user)) {
      setUser(null)
      moneyLeftDisplay = null
    } else {
      setIsModalOpen(true);
    }
  }
  const setProperlyLabel = Boolean(user) ? 'Wyloguj się' : 'Zaloguj się';


  useEffect(() => {
    setMoneyLeft(prev => prev = user?.budget)
  }, [user])


  return (
    <header className={style()}>
      <div className={style('logo-wrapper')} />
      <h1 className={style('title')}>Nowe perfumy, sprzedaż tylko u nas</h1>
      <div className={style('information')}>
        <i className="fas fa-info-circle"></i>
        <div>
          <h3>For login as User:</h3>
          <span> Login: user </span><br />
          <span> Password: 123456 </span>

          <h3> For login as Admin:</h3>
          <span> Login: admin</span><br />
          <span>  Password: 123</span>
        </div>
      </div>
      {user && <p className={style('budget')}>Twój budżet wynosi: {moneyLeft?.toFixed(2)} zł</p>}
      <button className={style('login-button')} onClick={handleonClick}>{setProperlyLabel}</button>
      <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
    </header>
  );
};

export default Header;