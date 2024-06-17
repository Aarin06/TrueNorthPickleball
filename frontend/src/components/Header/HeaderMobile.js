import { useState } from "react";
import { Button } from "@mui/material";
import { slide as Menu } from "react-burger-menu";
import "./HeaderMobile.css";
import Logo from "../../media/logo.png";
import { Link } from "react-router-dom";


function HeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const handleStateChange = (state) => {
    setIsOpen(state.isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <div className="header">
       <Link to={"/"} className="font-bold">
        <img className="icon" src={Logo} alt="logo" />
      </Link>
      <Menu right isOpen={isOpen} onStateChange={handleStateChange}>
        <Link to={"/"} className="menu-item font-bold" onClick={closeMenu}>
          Home
        </Link>
        <Link to={"/aboutus"} className="menu-item" onClick={closeMenu}>
          About Us
        </Link>
        <Link to={"/schedule"} className="menu-item" onClick={closeMenu}>
          Schedule
        </Link>
        <Link to={"/teams"} className="menu-item" onClick={closeMenu}>
          Teams
        </Link>
        <Link to={"/signin"} className="menu-item" onClick={closeMenu}>
          Sign In
        </Link>
      </Menu>
    </div>
  );
}
export default HeaderMobile;
