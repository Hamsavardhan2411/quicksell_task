import React from "react";
import logo from "../../assets/logo.png";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../styles/appBar.css";
const AppBar = ({ setGrp, setStatus, setPriority, setUser, grp }) => {
  return (
    <div className="Appbar">
      <a href="https://quicksell.co/">
        <img src={logo} alt="logo" className="Appbar__img" />
      </a>
      <div className="Appbar__title">
        <span className="Appbar__firstName">Quick</span>
        <span className="Appbar__secondName">Sell </span>
      </div>
    </div>
  );
};

export default AppBar;
