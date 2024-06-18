import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

function Join() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2" className="text-4xl font-bold mb-8">
          Join Now
        </Typography>
      </Box>
      
      <Box className="mb-16">
        <Typography variant="h3" className="text-3xl font-semibold mb-4">
          Why Join Us?
        </Typography>
        <Typography variant="body1" className="mb-4">
          Becoming a member of our community means gaining access to exclusive events, resources, and a network of like-minded individuals who share your passion.
        </Typography>
        <br />
        <Typography variant="body1" className="mb-4">
          We offer a variety of activities and programs designed to help you grow and connect with others. Whether you're looking to learn something new or just want to meet new people, we have something for everyone.
        </Typography>
      </Box>
      
      <Box className="mb-16">
        <Typography variant="h3" className="text-3xl font-semibold mb-4">
          Membership Benefits
        </Typography>
        <Typography variant="body1" className="mb-4">
          As a member, you will enjoy benefits such as:
        </Typography>
        <ul className="list-disc list-inside mb-4">
          <li>Access to exclusive events and workshops</li>
          <li>Discounts on our services and products</li>
          <li>Networking opportunities with industry leaders</li>
          <li>Regular updates and newsletters</li>
        </ul>
        <Typography variant="body1" className="mb-4">
          Join us today and start enjoying these amazing benefits!
        </Typography>
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
