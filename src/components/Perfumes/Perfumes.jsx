import React, { useContext } from 'react';
import bemCssModules from 'bem-css-modules';

import { default as PerfumesStyles } from './Perfumes.module.scss';
import { StoreContext } from '../../store/StoreProvider';
import Perfume from '../Perfume/Perfume';
const style = bemCssModules(PerfumesStyles);


const Perfumes = () => {

  const { products } = useContext(StoreContext);
  const productElements = products?.map(product => <Perfume key={product.id} {...product} />);

  return (
    <section className={style()} >
      <h2 className={style('title')} >Nasz katalog</h2>
      <ul className={style('list')}>
        {productElements}
      </ul>
    </section>
  )
};

export default Perfumes;