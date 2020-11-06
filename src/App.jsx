import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';

import StoreProvider from './store/StoreProvider';
require("regenerator-runtime/runtime");
import AsideMenu from './components/AsideMenu/AsideMenu';
import './App.scss';
import Content from './components/Content/Content';

const App = () => (
  <StoreProvider>
    <Header />
    <Router>
      <div className="content-wrapper">
        <AsideMenu />
        <Content />
      </div>
    </Router>
  </StoreProvider>

);

export default App;