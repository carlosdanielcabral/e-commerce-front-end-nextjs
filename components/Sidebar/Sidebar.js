import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import {
//   BsFillMoonFill,
//   BsFillSunFill,
// } from "react-icons/bs";
// import AppContext from "../../context/AppContext";
import CartIcon from "../CartIcon";
import ProfileOptions from "../ProfileOptions/ProfileOptions";
// import "./index.css";

const menuStyle = { color: "white", fontSize: "26px" };

const Sidebar = () => {
  // const { darkMode, setDarkMode } = useContext(AppContext);
  const [isSidebarVisible, setIsSideBarVisible] = useState(false);

  return (
    <div className="sidebar-container">
      <button type="button"
        onClick={ () => setIsSideBarVisible(!isSidebarVisible) }
      >
        <AiOutlineMenu style={menuStyle} />
      </button>

      <div className={ `sidebar ${isSidebarVisible ? 'visible' : ''} ` }>
        <button
          className="close-sidebar"
          type="button"
          onClick={ () => setIsSideBarVisible(false) }
        >
          <AiOutlineClose className="close-sidebar" />
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
