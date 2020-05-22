import React from "react";

import logo from "../../assets/logo.png";

import "./header.style.css";

const Header = () => {
  return (
    <header>
      <img id="logo" src={logo} alt="" />
      <h1 className="title">Image Compressor</h1>
    </header>
  );
};

export default Header;
