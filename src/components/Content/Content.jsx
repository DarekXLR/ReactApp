import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import { default as ContentStyles } from './Content.module.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';
import UserCart from './UserCart/UserCart';
import AdminPanel from '../AdminPanel/AdminPanel';
import Perfumes from '../Perfumes/Perfumes';
const style = bemCssModules(ContentStyles)

const ADMIN_TYPE = 1;

const Content = () => {
  const { user } = useContext(StoreContext);
  const isUserLogged = Boolean(user);
  const isAdmin = user?.accessLevel === ADMIN_TYPE;

  return (
    <main className={style()}>
      <Switch>
        <Route exact path="/" render={() => <Perfumes />} />
        {isUserLogged && <Route exact path="/my-shopcart" render={() => <UserCart />} />}
        {isAdmin && <Route exact path="/manage-supplies" render={() => <AdminPanel />} />}
        <Redirect to="/" />
      </Switch>
    </main>
  )
};

export default Content;