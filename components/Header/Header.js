import React from 'react';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
// import { BsFillMoonFill,
//   BsFillSunFill } from 'react-icons/bs';
// import AppContext from '../../context/AppContext';
import Search from '../Search';
import CartIcon from '../CartIcon';
import ProfileOptions from '../ProfileOptions/ProfileOptions';
import Sidebar from '../Sidebar/Sidebar';
import './Header.module.css';

const Header = () => {
  // const { darkMode, setDarkMode } = useContext(AppContext)

  return (
    <header className="header">
      <section className="header-container">
        <Sidebar />
        <section className="logo">
          <h1 className="header-title">E-commerce</h1>
        </section>
        <section className="general-options">
          {/* <section className="darkmode">
            <button
              type="button"
              onClick={ () => setDarkMode(!darkMode) }
            >
              {
                darkMode
                  ? <BsFillMoonFill />
                  : <BsFillSunFill />
              }
            </button>
          </section> */}
          <ProfileOptions />
        </section>
      </section>


      <nav className="navigation-links">
        <Search />

        <section className="links">
          <Link href="/">
            <AiFillHome className="home-icon" />
          </Link>

          {/* <Link to="/search-products">
            <BsSearch />
          </Link> */}

          <CartIcon />
        </section>
      </nav>
    </header>
    );
}

export default Header;
