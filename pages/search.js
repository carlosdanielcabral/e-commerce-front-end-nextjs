import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import Categories from '../components/Categories';
import Header from '../components/Header/Header';
import Pagination from '../components/Pagination';
import styles from '../styles/Search.module.css';

const Home = () => {
  const { hasSearch, darkMode } = useContext(AppContext);

  useEffect(() => {
    document.title = 'Pesquisar produto';
  }, []);

  return (
    <div className={ styles.searchPage }>
      <Header />
      <div className={ styles.container }>
        <div className={ styles.right }>
          {
            hasSearch && (
              <Pagination />
            )
          }
        </div>

        <div className={ styles.left }>
          <Categories />
        </div>
      </div>
    </div>
  )
}

export default Home;
