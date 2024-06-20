import { useEffect, useState } from "react";
import { Container, Typography, Box, Button, FormControlLabel, FormGroup, Checkbox } from "@mui/material";
import { loadStripe } from '@stripe/stripe-js';
import "tailwindcss/tailwind.css";
import { getPayment, makeTeamPayment, getTeamCaptain } from "../api/teamService";
import { signWaiver, getUserId, getWaiver, getTeamId } from "../api/userService";

function Waiver() {
  const teamId = getTeamId();
  const userId = getUserId();
  const [checks, setChecks] = useState([
    {
      label: "I understand that there are no refunds for this league membership",
      value: false,
    },
    {
      label: "I acknowledge that games may be delayed, rescheduled and maybe cancelled due to weather conditions.",
      value: false,
    },
  ]);
  const [waiverSigned, setWaiverSigned] = useState(false);
  const [isTeamCaptain, setIsTeamCaptain] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);


  const handleCheckboxChange = (index) => {
    setChecks(prevChecks =>
      prevChecks.map((check, i) =>
        i === index ? { ...check, value: !check.value } : check
      )
    );
  };

  const handleSignWaiver = async () => {
    signWaiver(userId).then((res) => {
      setWaiverSigned(res.signed)
    });
  };

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51PRzeAIvtf1ygAtOqFrn2jpI3OQXfPyzp4qF6tXBIXQG7brDKK1RYB8mIfaUxopb9dT9iAGXJe32OIWiLoCRDV0S00O3En4RLZ");
  
    if (isTeamCaptain) {
      try {
        const res = await makeTeamPayment(teamId, userId);
        
        const result = await stripe.redirectToCheckout({
          sessionId: res.id
        });
  
        if (result.error) {
          // console.log(result.error);
        }
      } catch (error) {
        console.error("Payment failed: ", error);
      }
    }
  };

  useEffect(() => {
    getWaiver(userId).then((res) => {
      setWaiverSigned(res.signed);
    })
    .catch((err) =>{

    });
    getTeamCaptain(teamId).then((res) => {
      if (userId === res._id) {
        setIsTeamCaptain(true);
      }
    })
    .catch((err) =>{
      
    });
    getPayment(teamId).then((res) =>{
      setPaymentStatus(res.status);
    })
    .catch((err) =>{
      setPaymentStatus(false);
    });
  }, [teamId, userId]);

  return (
    <Container maxWidth="md" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2" className="text-4xl font-bold mb-8">
          Waiver
        </Typography>
      </Box>

      <Box className="mb-16">
        <Typography variant="h5" className="text-3xl font-semibold mb-4">
          DETAILS OF ACTIVITY
        </Typography>
        <Typography variant="body1" className="pb-4" >
        1. Scheduled every Sunday from 10:00 AM - 1:00 PM from July 7, 2024 to August 25, 2024,
    the Participant will be participating in the following activity: Pickle Ball League provided by the
    Activity Provider True North Pickle Ball hosted at Fairgrounds Assembly Park (the "Location").
        </Typography>
        <Typography variant="h5" className="text-3xl font-semibold mb-4">
          CONSIDERATION
        </Typography>
        <Typography variant="body1" className="pb-4" >
        2. Being of lawful age and in consideration of being permitted to participate in the Activity, the
    Participant releases and forever discharges the Activity Provider, its owners, directors, officers,
    employees, agents, assigns, legal representatives, and successors from all manner of actions,
    causes of action, debts, accounts, bonds, contracts, claims, and demands for or by reason of
    any injury to person or property, including injury resulting in the death of the Participant, which
    has been or may be sustained as a consequence of the Participant's participation in the
    Activity, and notwithstanding that such damage, loss, or injury may have been caused solely
    or partly by the negligence of the Activity Provider.
        </Typography>
        <Typography variant="h5" className="text-3xl font-semibold mb-4">
         CONCURRENT RELEASE
        </Typography>
        <Typography variant="body1" className="pb-4" >
        3. The Participant acknowledges that this Waiver is given with the express intention of effecting
    the extinguishment of certain obligations owed to the Participant by the Activity Provider, and
    with the intention of binding the Participant's spouse, heirs, executors, administrators, legal
    representatives, and assigns.
        </Typography>
        <Typography variant="h5" className="text-3xl font-semibold mb-4">
        FITNESS TO PARTICIPATE
        </Typography>
        <Typography variant="body1" className="pb-4" >
        4. The Participant acknowledges to the Activity Provider that the Participant does not have any
    physical limitations, medical ailments, or physical or mental disabilities that would limit or
    prevent the Participant from participating in the Activity. If required, the Participant will obtain a
    medical examination and clearance.
        </Typography>
        <Typography variant="h5" className="text-3xl font-semibold mb-4">
        FULL AND FINAL SETTLEMENT
        </Typography>
        <Typography variant="body1" className="pb-4" >
        5. The Participant acknowledges and agrees with the Activity Provider that: (1) the Activity
    Provider has given the Participant sufficient time to carefully read this Waiver, (2) the Participant
    has been given the opportunity and has been encouraged to seek independent legal advice
    prior to signing this Waiver, (3) the Participant fully understands the risks and claims that the
    Participant is waiving to participate in the Activity, (4) the Participant is freely and voluntarily
    executing this Waiver, and (5) the Participant is forever prevented from suing or otherwise
    claiming against the Activity Provider for any property loss or personal injury that the
    Participant may sustain while participating in or preparing for the Activity.
        </Typography>
        <Typography variant="h5" className="text-3xl font-semibold mb-4">
          Northern Pickleball Refund Policy
        </Typography>
        <br></br>
        <Typography variant="body1" className="pb-4" >
          ANYONE FOUND TO BE HARASSING NORTHERN PICKLEBALL STAFF WILL BE BANNED FROM ALL FUTURE PARTICIPATION AND POTENTIALLY REPORTED TO LAW ENFORCEMENT.
        </Typography>
        <Typography variant="body1" className="pb-4" >
          General League and Program Registrations:
        </Typography>
        <Typography variant="body1" className="pb-4" >
          Registration is complete only when the automated registration system has received your signed waiver and the full payment has been received.
        </Typography>
        <Typography variant="body1" className="pb-4" >
          There are NO refunds except in the case where Northern Pickleball cannot accommodate your registration. For example, if there is no space or there are not enough registrants to run the league. For instance, we will only run leagues with a minimum of 4 teams. Therefore, if 4 teams aren't registered one week after the scheduled start date, teams will be refunded their registration fee. (Exception: Any league that is posted as "inaugural," "new," or generally indicated as a commemorative event will not be subject to this rule. In such cases, no refunds will be provided, and the league will make necessary accommodations).
        </Typography>
        <Typography variant="body1" className="pb-4" >
          No refunds will be issued due to defaulted, cancelled, or rescheduled games. No refunds will be issued due to injuries. Teams or individuals suspended or ejected from Northern Pickleball programs due to any breaches of Northern Pickleball Policy will not receive refunds.
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
          disabled={!checks.every(check => check.value) || waiverSigned}
        >
          {waiverSigned ? "Signed" : "Sign Waiver"}
        </Button>
        {isTeamCaptain && (
          <Button
            onClick={makePayment}
            variant="contained"
            color="secondary"
            className="w-full"
            disabled={!waiverSigned || paymentStatus}
          >
            Pay Now
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default Waiver;
