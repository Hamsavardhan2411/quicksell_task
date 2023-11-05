import React from "react";
import logo from "../../assets/logo.png";
import "../styles/appBar.css";
const AppBar = ({ setGrp, setStatus, setPriority, setUser, grp }) => {
  return (
    <div className="Appbar">
      <a href="https://quicksell.co/">
        <img src={logo} alt="logo" className="logo" />
      </a>
      <div className="title">
        <span className="firstName">Quick</span>
        <span className="secondName">Sell </span>
      </div>
    </div>
  );
};

export default AppBar;
