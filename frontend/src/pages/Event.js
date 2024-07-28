import React, { useEffect, useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate,useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { getUserId,getTeamId } from "../api/userService";
import { getEvent,isRegistered } from "../api/eventService";
function Event() {
  const params = useParams();
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false)
  const [event, setEvent] = useState({});

  const navigate = useNavigate();

  useEffect(()=>{
    const userId = getUserId();

    if (userId){
      setLoggedIn(true);
    }

    getEvent(params.eventId).then((response) => {
      setEvent(response);
    });
    
    
    isRegistered(getTeamId(), params.eventId).then((response) => {
      if (response){
        setRegistered(response.registered);
      }
    }).catch((error) => {
      console.log(error);
    });

    }, []);

  const handleRegister = () => {
    if (loggedIn){
      navigate(`/waiver/${params.eventId}`);
    }
    else{
      navigate(`/signin?eventId=${params.eventId}`);

    }
  }


    return (
      event.eventData ?
      <Container maxWidth="xl" className="py-8">
        <Box className="text-center mb-8">
          <div className="text-5xl font-normal mb-8">
            {event.eventData.title}
          </div>
        </Box>

        <Box className="mb-16">
          <div className="text-4xl font-normal mb-8">
            {event.eventData.howItWorks.title}
          </div>
          <div className="text-xl font-normal mb-8">
            {event.eventData.howItWorks.description}
          </div>
          <ul className="list-disc list-inside mb-4 font-light">
            {event.eventData.howItWorks.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="font-normal text-xl mb-8">
            {event.eventData.prizes.grandPrize}
          </div>
          <div className="text-xl font-normal mb-8">
            The cost is ${event.cost} per team for the entire season.
          </div>
        </Box>

        <Box className="text-center">
          <Button
            onClick={handleRegister}
            variant="contained"
            sx={{ marginBottom: "10px", fontSize: "25px" }}
            disabled={registered}
          >
            {registered ? "Registered":"Register Now"}
          </Button>
        </Box>
      </Container>
      :<></>
    );
}

export default Event;
