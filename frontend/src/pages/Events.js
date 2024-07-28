import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Card, Typography, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { experienceMapping } from "../Mappings/experienceLevel";

import { getEvents } from "../api/eventService";
import "tailwindcss/tailwind.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    getEvents().then((response) => {
      setEvents(response);
      setIsLoading(false);
    });
  }, []);

  const getTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const getDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2">
          Events
        </Typography>
      </Box>
      
      {isLoading ? 
        <div className="flex justify-center mt-20">
          <CircularProgress size={100} />
        </div>
      :
        // <Box className="mb-8">
        //   {events.map((event) => (
        //     <Box className="mb-8">
        //      test
        //     </Box>
        //   ))}
        // </Box>

        <Grid container spacing={2} className="flex flex-wrap">
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event._id} className="flex">
            <Card elevation={5} className="p-4 flex flex-col items-center justify-center flex-1 text-center">
              <Typography variant="h4" className="">
                {event.name} 
              </Typography>
              {event.allDay ?<>
                <Typography>
                <strong>All Day - {getDate(event.startDate)}</strong>
                </Typography>
                <Typography>
              ({getTime(event.startDate)} - {getTime(event.endDate)})
              </Typography>
              </>

              :
              <>  
                <Typography>
                  Start Date: {getDate(event.startDate)}
                </Typography>
                <Typography>
                End Date: {getDate(event.endDate)}
                </Typography>
              </>
              }
              <Button 
                LinkComponent={Link}
                to={`/events/${event._id}`}
                variant="contained" 
                sx={{marginBottom:"10px", marginTop:"30px",fontSize:"20px", textAlign:"center"}}
                disabled={event.locked}
              >
                {event.locked ? "Registration Closed" : "Details"}
              </Button>
            </Card>
          </Grid>
))}
</Grid>
      }
    </Container>
  );
}

export default Events;
