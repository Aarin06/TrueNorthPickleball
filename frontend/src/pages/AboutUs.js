import React from "react";
import { Button, Container, Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

function AboutUs() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2" className="text-4xl font-bold mb-8">
          About Us
        </Typography>
      </Box>
      
      <Box className="mb-16">
        <Typography variant="h3" className="text-3xl font-semibold mb-4">
          Our Story
        </Typography>
        <Typography variant="body1" className="mb-4">
          Welcome to our pickleball community! It all started when I stumbled upon a pickleball court while on vacation. Curious and excited, I decided to give it a try. Little did I know, it would become a passion. The thrill of the game, the friendly competition, and the amazing people I met along the way made me fall in love with pickleball.
        </Typography>
        <br></br>
        <Typography variant="body1" className="mb-4">
          Since then, I've been playing regularly, organizing games, and even participating in local tournaments. Pickleball has brought so much joy to my life, and I'm excited to share that joy with you!
        </Typography>
      </Box>
      
      <Box className="mb-16">
        <Typography variant="h3" className="text-3xl font-semibold mb-4">
          Where to Play
        </Typography>
        <Typography variant="body1" className="mb-4">
          Looking for a place to play pickleball? Here are some of our favorite spots:
        </Typography>
        <ul className="list-disc list-inside mb-4">
          <li>Central Park Pickleball Courts - Open daily from 7 AM to 9 PM</li>
          <li>Riverside Community Center - Open daily from 6 AM to 10 PM</li>
          <li>Westside Gym - Open daily from 5 AM to 11 PM</li>
        </ul>
        <Typography variant="body1" className="mb-4">
          Join us at any of these locations and experience the fun of pickleball!
        </Typography>
      </Box>
      
      <Box className="mb-16">
        <Typography variant="h3" className="text-3xl font-semibold mb-4">
          Pickleball in Action
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <img
              src="https://via.placeholder.com/400x300"
              alt="Pickleball action shot 1"
              className="rounded shadow"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <img
              src="https://via.placeholder.com/400x300"
              alt="Pickleball action shot 2"
              className="rounded shadow"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <img
              src="https://via.placeholder.com/400x300"
              alt="Pickleball action shot 3"
              className="rounded shadow"
            />
          </Grid>
        </Grid>
      </Box>
      
    </Container>
  );
}

export default AboutUs;
