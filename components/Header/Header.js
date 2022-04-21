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
import styles from './Header.module.css';

const Header = () => {
  // const { darkMode, setDarkMode } = useContext(AppContext)

  return (
    <header className={ styles.header }>
      <section className={ styles.headerContainer }>
        <Sidebar />
        <section className={ styles.logo }>
          <h1 className={ styles.headerTitle }>E-commerce</h1>
        </section>
        <section className={ styles.generalOptions }>
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


      <nav className={ styles.navigationLinks }>
        <Search />

        <section className={ styles.links }>
          <Link href="/" passHref>
            <a>
              <AiFillHome className={ styles.homeIcon } />
            </a>
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
