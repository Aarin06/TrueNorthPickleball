import "./VideoBg.css";
import videoBg from "../../media/video01.MP4";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getUserId, getMe } from "../../api/userService";
import { useEffect, useState } from "react";

function VideoBg() {
  const userId = getUserId();

  const [user, setUser] = useState({});

  useEffect(() =>{
    getMe().then((res) =>{
      setUser(res)
    })
    .catch((err)=>{setUser(null)})
  },[])

  return (
    <div className="main">
      <video src={videoBg} autoPlay loop muted />
      <div className="overlay"></div>
      <div className="content">
        <h1>{user ? "Hey " + user.firstName + ", Welcome to Northern PickleBall." : "Welcome to Northern PickleBall."}</h1>
        {!userId && <Button
          LinkComponent={Link}
          to="/join"
          variant="contained"
          sx={{ fontSize: "50px", borderRadius: "70px", padding: "5px 40px", marginTop:"10px" }}
        >
          Join Now
        </Button>}
      </div>
    </div>
  );
}

export default VideoBg;
