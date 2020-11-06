import React from 'react';
import Header from './components/Header/Header'
import StoreProvider from './store/StoreProvider';
require("regenerator-runtime/runtime");

import './App.scss';

const App = () => (
  <StoreProvider>
    <Header />
  </StoreProvider>

);

export default App;