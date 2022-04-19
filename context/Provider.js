import React, { useState } from 'react';
import AppContext from './AppContext';

const Provider = ({ children }) => {
  const [category, setCategory] = useState('')
  const [darkMode, setDarkMode] = useState(false);
  const [hasSearch, setHasSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [isUserLogged, setIsUserLogged] = useState();
  const [loggedUser, setLoggedUser] = useState({});

  const context = {
    category,
    setCategory,
    darkMode,
    setDarkMode,
    hasSearch,
    setHasSearch,
    isUserLogged,
    setIsUserLogged,
    loggedUser,
    setLoggedUser,
    products,
    setProducts,
    query,
    setQuery,
  };

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
}

export default Provider;
