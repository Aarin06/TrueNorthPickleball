import React from "react";
import { Button, Container, Card, Typography, Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

function Schedule() {
  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2" className="text-4xl font-bold mb-8">
          Schedule
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card elevation={10} className="p-8 flex flex-col justify-center items-center">
            <Typography variant="h3">
              TBD
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Schedule;
