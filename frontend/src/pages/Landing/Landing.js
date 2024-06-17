import "./Landing.css";
import { useEffect, useState } from "react";
import VideoBg from "../../components/VideoBg/VideoBg";
import Header from "../../components/Header/Header";
import { getMe } from "../../api/userService";

function Landing() {
  
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getMe().then((res) =>{
      if (res){
        setLoggedIn(true);
      }
    })
  })

  return (
    <>
      <VideoBg />
    </>
  );
}

export default Landing;
