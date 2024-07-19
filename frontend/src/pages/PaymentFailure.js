import { useEffect, useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { Link,useSearchParams } from "react-router-dom";
import "tailwindcss/tailwind.css";
import Fail from '../media/close.png';
import { getPayment } from "../api/teamService";
import { getTeamId } from "../api/userService";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const teamId = getTeamId();
  const [payment, setPayment] = useState({})


  useEffect(() => {
   
    getPayment(teamId, eventId).then((res) =>{
      setPayment(res);
    })
    .catch((err)=>{
      setPayment(null);
    })
   
  }, []);

  return (
    <Container maxWidth="sm" className="py-16 text-center">
      {payment.status === false ?
      <>
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
      </>
      :<div className="mb-5">
        Page Not Found.
        </div>}
        <div className="flex gap-5 justify-center">
        <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        className="mt-4"
      >
        Go to Homepage
      </Button>
      <Button
        component={Link}
        to={"/waiver/"+payment.eventId}
        variant="contained"
        color="primary"
        className="mt-4"
      >
        Go back to payment screen.
      </Button>
        </div>
     
    </Container>
  );
}

export default PaymentSuccess;
