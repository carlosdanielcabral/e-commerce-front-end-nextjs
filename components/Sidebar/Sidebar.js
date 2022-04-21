import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import CartIcon from "../CartIcon";
import ProfileOptions from "../ProfileOptions/ProfileOptions";
import styles from "./Sidebar.module.css";

const menuStyle = { color: "white", fontSize: "26px" };

const Sidebar = () => {
  const [isSidebarVisible, setIsSideBarVisible] = useState(false);

  return (
    <div className={ styles.sidebarContainer }>
      <button type="button"
        onClick={ () => setIsSideBarVisible(!isSidebarVisible) }
      >
        <AiOutlineMenu style={menuStyle} />
      </button>

      <div className={ `${styles.sidebar} ${isSidebarVisible ? styles.visible : ''} ` }>
        <button
          className={ styles.closeSidebar }
          type="button"
          onClick={ () => setIsSideBarVisible(false) }
        >
          <AiOutlineClose className={ styles.closeSidebar } />
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
              <CartIcon /> Meu carrinho
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
