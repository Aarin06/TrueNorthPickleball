import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./Header.css";
import Logo from "../../media/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getMe,signOut } from "../../api/userService";

function Header() {

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  // useEffect(()=>{
  //   getMe().then((res) =>{
  //     if (res){
  //       setLoggedIn(true);
  //     }
  //   })
  // }, [])


  const signOut = () =>{
    signOut.then((res) =>{
      navigate("/");
    })
  }

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

      {loggedIn ? 
      <Button
      variant="contained"
      onClick={signOut}
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
      Sign Out
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
