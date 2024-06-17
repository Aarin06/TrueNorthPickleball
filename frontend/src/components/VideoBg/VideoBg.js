import "./VideoBg.css";
import videoBg from "../../media/video01.MP4";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const click = () => {
  console.log("here");
};

function VideoBg() {
  return (
    <div className="main">
      <video src={videoBg} autoPlay loop muted />
      <div className="overlay"></div>
      <div className="content">
        <h1>Welcome to True North PickleBall.</h1>
        <Button
          LinkComponent={Link}
          to="/join"
          variant="contained"
          sx={{ fontSize: "50px", borderRadius: "70px", padding: "5px 40px", marginTop:"10px" }}
        >
          Join Now
        </Button>
      </div>
    </div>
  );
}

export default VideoBg;
