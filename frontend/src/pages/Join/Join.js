import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

function Join() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <div className=" text-6xl font-normal mb-8">
          Summer League Signup
        </div>
      </Box>
      
      
      <Box className="mb-16">
        <div className=" text-4xl font-normal mb-8">
          How It Works
        </div>
        <div className=" text-xl font-normal mb-8">
        By signing up you can expect the following:
        </div>
        <ul className="list-disc list-inside mb-4 font-light">
          <li>This season runs from July 7 - August 25 every Sunday </li>
          <li>Each week your team will play 1 Match any time between 10AM - 1PM </li>
          <li>The match will consist of 3 Games up to 11 using traditional pickle ball scoring </li>
          <li>If you are a beginner we will provide a Padel and lessons to learn the sport during your first week (no additional cost)</li>
          <li>Our final week of the season (August 25) will consist of tournament where all teams will participate and compete for prizes</li>

          <li>All Matches are played outside and details will be sent to you upon sign up </li>
          <li>If there is a weather delay matches will be rescheduled later in the same calendar week.</li>
          <li>When you sign up you will create a team and are expected to have 2 players represent to play weekly </li>
          <li>Each team can have a maximum of 5 Available players </li>
          <li>Each player must be atleast 18 years of age. Please contact us at <a className=" text-blue-600 underline" href="mailto:northernpickleball@gmail.com">northernpickleball@gmail.com.</a> if you are younger and interested to join.</li>
        </ul>
        <div className=" text-xl font-normal mb-8">
          There will be healthy refreshments provided weekly and also a super cool grand prize for the league winners that win the tournament.
        </div>
        <div className=" text-xl font-normal mb-8">
        The cost is $300 per team for the entire season.        
      </div>
      </Box>

      
      <Box className="text-center">
        <Button 
          component={Link} 
          to="/signup" 
          variant="contained" 
          sx={{marginBottom:"10px", fontSize:"25px"}}
        >
          Register Now
        </Button>
      </Box>
    </Container>
  );
}

export default Join;
