import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import {loadStripe} from '@stripe/stripe-js';
import "tailwindcss/tailwind.css";
import { makeTeamPayment } from "../api/teamService";

function Waiver() {
  const waiverText = `
    I, [your name], hereby acknowledge that participation in pickleball activities involves risk of injury. 
    I agree to release and discharge [your organization] from any and all claims, damages, 
    liabilities, costs, and expenses arising out of or in connection with my participation 
    in pickleball activities. I understand and agree to abide by all pickleball rules 
    and regulations set forth by [your organization].`;


  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51PRzeAIvtf1ygAtOqFrn2jpI3OQXfPyzp4qF6tXBIXQG7brDKK1RYB8mIfaUxopb9dT9iAGXJe32OIWiLoCRDV0S00O3En4RLZ");

    makeTeamPayment().then((res) =>{
      console.log(res)
      const result = stripe.redirectToCheckout({
        sessionId: res.id
      })
      if (result.error){
        console.log(result.error)
      }
    })

   

    
  }

  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2" className="text-4xl font-bold mb-8">
          Waiver
        </Typography>
      </Box>
      
      <Box className="mb-16">
        <Typography variant="body1" className="pb-10">
          {waiverText}
        </Typography>
        <Button onClick={makePayment} variant="contained" color="primary" className="w-full">
          Pay Now
        </Button>
      </Box>
    </Container>
  );
}

export default Waiver;
