import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./Header.css";
import Logo from "../../media/logo.png";
import { Link } from "react-router-dom";
import { getMe } from "../../api/userService";

const click = () => {
  console.log("here");
};

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getMe().then((res) =>{
      if (res){
        setLoggedIn(true);
      }
    })
  },[])

  return (
    <div className="header">
      <Link to={"/"} className="font-bold">
      <img className="icon" src={Logo} alt="logo" />
      </Link>
      <div className=" flex mr-auto gap-5">
        <Link to={"/"} className="font-bold">
          True North Pickleball
        </Link>
        <Link to={"/aboutus"}>About Us</Link>
        <Link to={"/schedule"}>Schedule</Link>
        <Link to={"/teams"}>Teams</Link>
      </div>

      {!loggedIn ? <Button
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
      :
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
    }
    </div>
  );
}

export default Header;
