import * as React from "react";
import { Button } from "@mui/material";
import "./Header.css";
import Logo from "../../media/logo.png";
import { Link } from "react-router-dom";

const click = () => {
  console.log("here");
};

function Header() {
  return (
    <div className="header">
      <img className="icon" src={Logo} alt="logo" />
      <div className=" flex mr-auto gap-5">
        <Link to={"/"} className="font-bold">
          True North Pickleball
        </Link>
        <Link to={"/aboutus"}>About Us</Link>
        <Link to={"/schedule"}>Schedule</Link>
        <Link to={"/teams"}>Teams</Link>
      </div>

      <Button
        variant="contained"
        LinkComponent={Link}
        to="/signin"
        sx={{
          backgroundColor: "white",
          marginRight: "30px",
          zIndex: "20",
          borderRadius: "25px",
          color: "black",
          "&:hover": {
            backgroundColor: "#DEE4EA", // Change background color to grey on hover
          },
        }}
      >
        Sign In
      </Button>
    </div>
  );
}

export default Header;
