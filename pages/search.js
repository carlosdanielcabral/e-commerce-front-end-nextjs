import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Categories from '../components/Categories';
import Header from '../components/Header/Header';
import Pagination from '../components/Pagination';
import '../styles/Search.module.css';

const Home = () => {
  const { hasSearch, darkMode } = useContext(AppContext);

  document.title = 'E-commerce | Home';

  return (
    <div className={ `home-page ${darkMode && 'darkmode'}` }>
      <Header />
      <div className="container">
        <div className="right">
          {
            hasSearch && (
              <Pagination />
            )
          }
        </div>

        <div className="left">
          <Categories />
        </div>
      </div>
    </div>
  )
}

export default Home;
