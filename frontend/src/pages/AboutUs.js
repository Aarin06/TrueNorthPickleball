import React from "react";
import { Button, Container, Grid, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Fairgrounds from "../media/fairgrounds.jpeg";

function AboutUs() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2" className="text-4xl font-bold mb-8">
          About Us
        </Typography>
      </Box>
      
      <Box className="mb-10">
        <Typography variant="h3" className="text-3xl font-semibold mb-4">
          Our Story
        </Typography>
        <br></br>
        <Typography variant="body1" className="mb-4">
        Welcome to Northern Pickleball. Our goal is to create a fun, competitive and friendly environment for players to enjoy honing in their skills and improving their game. By becoming a member of our league our aim is to ensure you have a consistent experience on and off the court and feel a sense of belonging in our vibrant growing community.
        </Typography>
        <br></br>
      </Box>

      <Box className="mb-10">
        <Typography variant="h3" className="text-3xl font-semibold mb-4">
          What We Offer
        </Typography>
        <br></br>
        <Typography variant="body1" className="mb-4">
        We offer house leagues along with competitive one day tournaments. Our leagues run on 4 month cycle and guarantee competitive matches on a weekly basis and our tournaments are fast paced with highly competitive matches over a series of rounds all in a single day. 
        </Typography>
        <br></br>
        <Typography variant="body1" className="mb-4">
        Join us and become part of a dynamic and supportive network of pickleball enthusiasts who share your passion for this fast-growing sport. Together, let’s elevate our game and enjoy every moment on the court.
        </Typography>

        {/* <Typography variant="body1" className="mb-4">
        At Northern Pickleball, members enjoy a wide range of benefits designed to enhance their playing experience and foster a vibrant community. Our club offers exclusive access to well-maintained courts and organized leagues and tournaments for all skill levels. Members will have the chance to participate in social events and mixers, providing opportunities to meet fellow enthusiasts and build lasting friendships. With a commitment to inclusivity and enjoyment, the Northern Pickleball ensures every member finds their place on the court.        </Typography>
        <br></br>
        <Typography variant="body1" className="mb-4">
        Experience love at first play! Pickleball is a sport for most ages (8-90) that is easy to play, active, inexpensive and promotes a healthy lifestyle. 
        </Typography>
        <Typography variant="body1" className="mb-4">
          Games will take palce at <a className=" text-blue-600 underline" href="https://www.google.com/maps/place/Fairgrounds+Assembly+Park/@43.7887105,-79.5535482,14z/data=!4m6!3m5!1s0x882b2f698e7d2419:0x7500b7846e31b76f!8m2!3d43.7887105!4d-79.5329488!16s%2Fg%2F11vyq2qwh_?entry=ttu" target="_blank" rel="noreferrer noopener">Fairgrounds Assembly Park.</a> 
        </Typography>
        <br></br>
        <Typography variant="h5" className="mb-4">
        What is Pickleball and what do you need to get started?
        </Typography>
        <ul className="list-disc list-inside mb-4 ml-8 mt-4">
          <li>Pickleball is the fastest growing sport in the world – true! It's the most fun as well. It is a combination of tennis, badminton and table tennis. The game is played on a badminton size court with a wiffle ball, about the size of a tennis ball.</li>
        </ul>
        <br></br>
        <Typography variant="h5" className="mb-4">
        Affordable Equipment
        </Typography>
        <ul className="list-disc list-inside mb-4 ml-8 mt-4">
          <li>Besides your gym attire, you need a paddle and a good pair of court shoes. If the sport is being played in your area, beginner paddles and balls are usually supplied by your local club or recreation centre. Once you learn the game you can buy your own paddle, where prices range from $30-$200.</li>
        </ul>
        <br></br>
        <Typography variant="h5" className="mb-4">
        What sets pickleball apart from other sports?
        </Typography>
        <ul className="list-disc list-inside mb-4 ml-8 mt-4">
          <li>Rapid learning curve. The game was originally developed so all age groups within a family could play together. With this in mind the rules were kept simple and safe. It can also be quite a challenging, fast-paced and competitive game when people become more experienced at playing.</li>
        </ul>
        <br></br>
        <Typography variant="h5" className="mb-4">
        Why has it grown so fast?
        </Typography>
        <ul className="list-disc list-inside mb-4 ml-8 mt-4">
          <li> It started with the largest demographic, the baby boomers. But it’s not just for the baby boomers anymore... adults, teens, and youth are also playing this wonderful sport of Pickleball.</li>
        </ul>
        <br></br>
        <Typography variant="h5" className="mb-4">
        Speedy play and fun exercise
        </Typography>
        <ul className="list-disc list-inside mb-4 ml-8 mt-4">
          <li> Two hour sessions are the average time to play. It is a great sport for all-round fitness and exercises all the major muscle groups, provides a cardio workout and improves dexterity, mobility, agility, and balance.</li>
        </ul>
        <br></br>
        <Typography variant="body" className="mb-4">
        <a className="text-red-400 underline" href="https://usapickleball.org">Learn More</a> about the original of Pickleball USA Pickleball.
        </Typography> */}
      </Box>
      
      <Box className="mb-16">
        <Typography variant="body1">
         In Partnership with,
        </Typography>
        <img className="w-96" src={Fairgrounds} alt="logo" />
        
      </Box>
      
      {/* <Box className="mb-16">
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
      </Box> */}
      
    </Container>
  );
}

export default AboutUs;
