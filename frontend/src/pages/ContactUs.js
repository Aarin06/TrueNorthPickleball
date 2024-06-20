import React from "react";
import { Button, Container, Grid, Typography, Box } from "@mui/material";
import "tailwindcss/tailwind.css";


function ContactUs() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2" className="text-4xl font-bold mb-8">
          Contact Us
        </Typography>
      </Box>
      
      <Box className="mb-10">
        <Typography variant="body1" className="mb-4">
          You can reach us through email <a className=" text-blue-600 underline" href="mailto:northernpickleball@gmail.com">Here.</a>
        </Typography>       
      </Box>      
    </Container>
  );
}

export default ContactUs;
