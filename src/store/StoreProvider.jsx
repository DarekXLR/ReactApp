import React, { useEffect } from 'react';
import request from '../helpers/request';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    const { data } = await request.get('/courses');
    setItems(data.courses);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext value={
      items,
      setItems,
      user,
      setUser
    }>
      {children}
    </StoreContext>
  )
};

export default StoreProvider;