const {
  v4: uuid
} = require('uuid');

const productsData = [{

    id: uuid(),
    img: './images/perfumeNR1.jpg',
    price: 349.99,
    title: 'Słodki fiolet',
    stock: 6,
  },
  {
    id: uuid(),
    img: './images/perfumeNR2.jpg',
    price: 180.59,
    title: 'Niebiańskie jabłko',
    stock: 2,
  },
  {
    id: uuid(),
    img: './images/perfumeNR3.jpg',
    price: 89.99,
    title: 'Subtelna róż',
    stock: 4,
  },
  {
    id: uuid(),
    img: './images/perfumeNR4.jpg',
    price: 39.99,
    title: 'Romans',
    stock: 0,
  },
  {
    id: uuid(),
    img: './images/perfumeNR5.jpg',
    price: 189.99,
    title: 'Wesołe trio',
    stock: 3,
  },
  {
    id: uuid(),
    img: './images/perfumeNR6.jpg',
    price: 89.99,
    title: 'Niewiadomo co',
    stock: 5,
  },
];

export default productsData;