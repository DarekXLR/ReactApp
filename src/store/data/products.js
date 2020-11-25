import img1 from '../../images/perfumeNR1.jpg'
import img2 from '../../images/perfumeNR2.jpg'
import img3 from '../../images/perfumeNR3.jpg'
import img4 from '../../images/perfumeNR4.jpg'
import img5 from '../../images/perfumeNR5.jpg'
import img6 from '../../images/perfumeNR6.jpg'


const {
  v4: uuid
} = require('uuid');

const productsData = [{

    id: uuid(),
    img: img1,
    price: 349.99,
    title: 'Słodki fiolet',
    stock: 6,
  },
  {
    id: uuid(),
    img: img2,
    price: 180.59,
    title: 'Niebiańskie jabłko',
    stock: 2,
  },
  {
    id: uuid(),
    img: img3,
    price: 89.99,
    title: 'Subtelna róż',
    stock: 4,
  },
  {
    id: uuid(),
    img: img4,
    price: 39.99,
    title: 'Romans',
    stock: 0,
  },
  {
    id: uuid(),
    img: img5,
    price: 189.99,
    title: 'Wesołe trio',
    stock: 3,
  },
  {
    id: uuid(),
    img: img6,
    price: 89.99,
    title: 'Niewiadomo co',
    stock: 5,
  },
];

export default productsData;