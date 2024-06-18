import React, { useEffect, useRef } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { handlePostPayment } from "../api/teamService";
import Fail from '../media/close.png';

function PaymentFailure() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get('teamId');
  const userId = queryParams.get('userId');

  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      handlePostPayment(teamId, userId, false);
      hasRun.current = true;
    }
  }, [teamId, userId]);

  return (
    <Container maxWidth="sm" className="py-16 text-center">
      <Box className="mb-8">
        <Typography variant="h4" className="text-4xl font-bold mb-4">
          Payment Failed
        </Typography>
        <Typography variant="body1" className="mb-4">
          Unfortunately, your payment could not be processed. Please try again or contact support for assistance.
        </Typography>
      </Box>
      <Box className="mb-8">
        <img
          src={Fail}
          alt="Payment failure"
          className="mx-auto mb-4 w-20"
        />
      </Box>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        className="mt-4"
      >
        Go to Homepage
      </Button>
      <a href="mailto:northernpickleball@gmail.com">
        <Button
          variant="outlined"
          color="primary"
          className="mt-4 ml-4"
          sx={{ marginLeft: "10px" }}
        >
          Contact Us
        </Button>
      </a>
    </Container>
  );
}

export default PaymentFailure;
