import React, { useState } from "react";
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import ProfileOptions from "../ProfileOptions/ProfileOptions";
import styles from "./Sidebar.module.css";

const menuStyle = { color: "white", fontSize: "26px" };

const Sidebar = () => {
  const [isSidebarVisible, setIsSideBarVisible] = useState(false);

  return (
    <div className={ styles.sidebarContainer }>
      <button
        type="button"
        onClick={ () => setIsSideBarVisible(!isSidebarVisible) }
        aria-label="menu"
      >
        <AiOutlineMenu style={menuStyle} />
      </button>

      <div className={ `${styles.sidebar} ${isSidebarVisible ? styles.visible : ''} ` }>
        <button
          className={ styles.closeSidebar }
          type="button"
          onClick={ () => setIsSideBarVisible(false) }
          aria-label="fechar sidebar"
        >
          <AiOutlineClose />
        </button>
        <div className="options">
          <ul>
            <li>
              <ProfileOptions />
            </li>

            {/* <li className="darkmode">
              <button type="button" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <BsFillMoonFill /> : <BsFillSunFill />}
              </button>
            </li> */}

            <li>
              <Link href="/shopping-cart" passHref>
                <a>
                  <BsFillCartFill className={styles.cartIcon} />  Meu carrinho
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
