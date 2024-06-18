import { useEffect, useState } from "react";
import { Container, Typography, Box, Button, FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { loadStripe } from '@stripe/stripe-js';
import "tailwindcss/tailwind.css";
import { makeTeamPayment } from "../api/teamService";
import { signWaiver, getUserId, getWaiver } from "../api/userService";
import { getTeamCaptain } from "../api/teamService";
import { useLocation } from 'react-router-dom';

function Waiver() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamId = queryParams.get('teamId');
  const userId = getUserId();
  const [checks, setChecks] = useState([
    {
      label: "I agree to the terms and conditions",
      value: false,
    },
    {
      label: "I acknowledge the risks involved",
      value: false,
    },
  ]);
  const [waiverSigned, setWaiverSigned] = useState(false);
  const [isTeamCaptain, setIsTeamCaptain] = useState(false);

  const handleCheckboxChange = (index) => {
    setChecks(prevChecks =>
      prevChecks.map((check, i) =>
        i === index ? { ...check, value: !check.value } : check
      )
    );
  };

  const waiverText = `
    I, [your name], hereby acknowledge that participation in pickleball activities involves risk of injury. 
    I agree to release and discharge [your organization] from any and all claims, damages, 
    liabilities, costs, and expenses arising out of or in connection with my participation 
    in pickleball activities. I understand and agree to abide by all pickleball rules 
    and regulations set forth by [your organization].`;

  const handleSignWaiver = async () => {
    signWaiver(userId).then((res) => {
      console.log(res)
      setWaiverSigned(res.signed);
    })
  };
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51PRzeAIvtf1ygAtOqFrn2jpI3OQXfPyzp4qF6tXBIXQG7brDKK1RYB8mIfaUxopb9dT9iAGXJe32OIWiLoCRDV0S00O3En4RLZ");
  
    if (isTeamCaptain) {
      try {
        const res = await makeTeamPayment(teamId, userId);
        console.log(res);
        
        const result = await stripe.redirectToCheckout({
          sessionId: res.id
        });
  
        if (result.error) {
          console.log(result.error);
        }
      } catch (error) {
        console.error("Payment failed: ", error);
      }
    }
  };
  

  useEffect(() => {
    getWaiver(userId).then((res) => {
      console.log(res)
      setWaiverSigned(res.signed);
    });

    getTeamCaptain(teamId).then((res) => {
      if (userId === res._id) {
        setIsTeamCaptain(true);
      }
    });
  }, [teamId, userId]);

  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2" className="text-4xl font-bold mb-8">
          Waiver
        </Typography>
      </Box>

      <Box className="mb-16">
        <Typography variant="body1" className="pb-4">
          {waiverText}
        </Typography>
        <FormGroup className="pb-4">
          {checks.map((check, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox checked={check.value || waiverSigned} disabled={waiverSigned} onChange={() => handleCheckboxChange(index)} />}
              label={check.label}
            />
          ))}
        </FormGroup>
        <Button 
          onClick={handleSignWaiver} 
          variant="contained" 
          color="primary" 
          className="w-full" 
          sx={{ marginBottom: "10px" }} 
          disabled={!checks.every(check => check.value)}
        >
          Sign Waiver
        </Button>
        {isTeamCaptain && (
          <Button 
            onClick={makePayment} 
            variant="contained" 
            color="primary" 
            className="w-full" 
            disabled={!waiverSigned}
          >
            Pay Now
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default Waiver;
