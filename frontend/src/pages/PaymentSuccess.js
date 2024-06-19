import { useEffect, useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Check from '../media/check.png';
import { getPayment } from "../api/teamService";
import { getTeamId } from "../api/userService";
function PaymentSuccess() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('sessionId');
  const teamId = getTeamId();
  const [paymentStatus, setPaymentStatus] = useState(false)


  useEffect(() => {
   
    getPayment(teamId).then((res) =>{
      setPaymentStatus(res.status);
    })
    .catch((err)=>{
      setPaymentStatus(false);
    })
   
  }, []);

  return (
    <Container maxWidth="sm" className="py-16 text-center">
      {paymentStatus ?
      <>
        <Box className="mb-8">
        <Typography variant="h4" className="text-4xl font-bold mb-4">
          Payment Successful!
        </Typography>
        <Typography variant="body1" className="mb-4">
          Thank you for your payment. Your transaction was successful, and your membership has been confirmed.
        </Typography>
        </Box>
        <Box className="mb-8">
        <img
          src={Check}
          alt="Payment success"
          className="mx-auto mb-4 icon"
        />
        </Box>
      </>
      :<div className="mb-5">
        Page Not Found.
        </div>}
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        className="mt-4"
      >
        Go to Homepage
      </Button>
    </Container>
  );
}

export default PaymentSuccess;
