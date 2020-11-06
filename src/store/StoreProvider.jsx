import React, { useEffect, useState, createContext } from 'react';
import request from '../helpers/request';

export const StoreContext = createContext([]);

const StoreProvider = ({ children }) => {
  const [courses, setCourses] = useState(null);
  const [user, setUser] = useState(null);

  const fetchData = async () => {
    const { data } = await request.get('/courses');
    setCourses(data.courses);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (

    <StoreContext.Provider value={{
      courses,
      setCourses,
      user,
      setUser
    }}>
      {children}
    </StoreContext.Provider>

  )
};

export default StoreProvider;