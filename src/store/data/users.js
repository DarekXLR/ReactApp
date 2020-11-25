import productsData from './products';

const usersData = [{
    accessLevel: 0,
    budget: 650,
    products: [],
    login: 'user',
    password: '123',
  },
  {
    accessLevel: 1,
    budget: 1000000,
    products: [],
    login: 'admin',
    password: '123',
  }
];

export const verifyUser = (login, password) => {
  const inputUser = usersData.filter(user => user.login === login && user.password === password)
  return inputUser[0];
};

export default usersData;