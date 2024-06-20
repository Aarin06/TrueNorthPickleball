import "./VideoBg.css";
import videoBg from "../../media/video01.MP4";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getUserId, getUser } from "../../api/userService";
import { useEffect, useState } from "react";

function VideoBg() {
  const userId = getUserId();

  const [user, setUser] = useState(null);

  useEffect(() =>{
      getUser(userId).then((res) =>{
        setUser(res);
      })
    .catch((err)=>{setUser(null)})
  },[])

  return (
    <div className="main">
      <div 
        className="video-bg"
        dangerouslySetInnerHTML={{ __html: `
          <video playsinline autoPlay loop muted autobuffer id="video">
            <source src="${videoBg}" type="video/mp4"/>
          </video>
        ` }}>
      </div>
      <div className="overlay"></div>
      <div className="content">
        <h1>{user ? `Hey ${user.firstName}, Welcome to Northern Pickleball` : "Welcome to Northern Pickleball"}</h1>
        {!userId && (
          <Button
            LinkComponent={Link}
            to="/join"
            variant="contained"
            sx={{ fontSize: "50px", borderRadius: "70px", padding: "5px 40px", marginTop:"10px" }}
          >
            Join Now
          </Button>
        )}
      </div>
    </div>
  );
}

export default VideoBg;
