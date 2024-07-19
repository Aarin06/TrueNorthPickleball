import { useEffect, useState, useRef, Fragment } from "react";
import { Container, Typography, Box, Button, FormControlLabel, FormGroup, Checkbox, CircularProgress } from "@mui/material";
import { loadStripe } from '@stripe/stripe-js';
import "tailwindcss/tailwind.css";
import { getPayment, makeTeamPayment, getTeamCaptain } from "../api/teamService";
import { getUserId, getTeamId } from "../api/userService";
import { getWaiver, getUserWaiver, signWaiver } from "../api/waiverService";
import SignatureCanvas from 'react-signature-canvas';
import {useParams,useNavigate } from "react-router-dom";
import { getEvent } from "../api/eventService";

function Waiver() {
  const navigate = useNavigate();
  const params = useParams();
  const teamId = getTeamId();
  const userId = getUserId();
  const sigCanvas = useRef({});
  const [userWaiver, setUserWaiver] = useState({signed:false});
  const [isTeamCaptain, setIsTeamCaptain] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [checks, setChecks] = useState([]);
  const [waiver, setWaiver] = useState(null);
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
  const [loadingWaiver, setLoadingWaiver] = useState(true);
  const [loadingUserWaiver, setLoadingUserWaiver] = useState(true);
  const [loadingTeamCaptain, setLoadingTeamCaptain] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [event, setEvent] = useState({});

  const clear = () => {
    sigCanvas.current.clear();
    setIsSignatureEmpty(true);
  };

  const handleCheckboxChange = (index) => {
    setChecks(prevChecks =>
      prevChecks.map((check, i) =>
        i === index ? { ...check, value: !check.value } : check
      )
    );
  };

  const handleSignWaiver = async () => {
    const signature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');

    signWaiver(userId, waiver._id, checks, signature, params.eventId).then((res) => {
      setUserWaiver(res);
    });
  };

  const makePayment = async () => {
    const stripe = await loadStripe("pk_live_51PRzeAIvtf1ygAtOiJD9Ze5tS4PJMVu4RCDUtKkQ4XXzWiPDiffCc5VNbsSRN59gPh6bFcwuS7qZ01zJtSjpG1Fk00160yvtui");

    if (isTeamCaptain) {
      try {
        const res = await makeTeamPayment(teamId, userId, params.eventId);

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

  const handleSignatureChange = () => {
    setIsSignatureEmpty(sigCanvas.current.isEmpty());
  };

  useEffect(() => {
    getWaiver()
      .then((res) => {
        setWaiver(res);
        setLoadingWaiver(false);
        return getUserWaiver(res._id, userId, params.eventId);
      })
      .then((res) => {
        setUserWaiver(res);
        setChecks(res.checks);
        setLoadingUserWaiver(false);
      })
      .catch((err) => {
        setUserWaiver({ signed: false });
        setLoadingUserWaiver(false);
      });

    getTeamCaptain(teamId)
      .then((res) => {
        if (userId === res._id) {
          setIsTeamCaptain(true);
        }
        setLoadingTeamCaptain(false);
      })
      .catch((err) => {
        setLoadingTeamCaptain(false);
      });

    getPayment(teamId, params.eventId)
      .then((res) => {
        setPaymentStatus(res.status);
        setLoadingPayment(false);
      })
      .catch((err) => {
        setPaymentStatus(false);
        setLoadingPayment(false);
      });
  }, [teamId, userId]);

  useEffect(() => {
    getEvent(params.eventId).then((response) => {
      setEvent(response);
    }).catch((error) => {
      navigate("/error")
    });
  },[params.eventId]);

  const isLoading = loadingWaiver || loadingUserWaiver;

  return (
    <Container maxWidth="md" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2" className="text-4xl font-bold mb-8">
          Waiver
        </Typography>
      </Box>
      {isLoading ? (
        <div className="flex justify-center mt-20">
          <CircularProgress size={100} />
        </div>
        ) : (
          waiver && (
            <Box className="mb-16">
              <Typography variant="h5" className="text-3xl font-semibold mb-4">
                {waiver.waiverData.activity_details.title}
              </Typography>
              <Typography variant="body1" className="pb-4">
                {waiver.waiverData.activity_details.description}
              </Typography>
              <Typography variant="h5" className="text-3xl font-semibold mb-4">
                {waiver.waiverData.consideration.title}
              </Typography>
              <Typography variant="body1" className="pb-4">
                {waiver.waiverData.consideration.description}
              </Typography>
              <Typography variant="h5" className="text-3xl font-semibold mb-4">
                {waiver.waiverData.concurrent_release.title}
              </Typography>
              <Typography variant="body1" className="pb-4">
                {waiver.waiverData.concurrent_release.description}
              </Typography>
              <Typography variant="h5" className="text-3xl font-semibold mb-4">
                {waiver.waiverData.fitness_to_participate.title}
              </Typography>
              <Typography variant="body1" className="pb-4">
                {waiver.waiverData.fitness_to_participate.description}
              </Typography>
              <Typography variant="h5" className="text-3xl font-semibold mb-4">
                {waiver.waiverData.full_and_final_settlement.title}
              </Typography>
              <Typography variant="body1" className="pb-4">
                {waiver.waiverData.full_and_final_settlement.description}
              </Typography>
              <Typography variant="h5" className="text-3xl font-semibold mb-4">
                {waiver.waiverData.refund_policy.title}
              </Typography>
              <br />
              {waiver.waiverData.refund_policy.sections.map((section, index) => (
                <Fragment key={index}>
                  <Typography variant="body1" className="pb-4">
                    {section.description}
                  </Typography>
                </Fragment>
              ))}
              <FormGroup className="pb-4">
                {checks.map((check, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={check.value || userWaiver.signed}
                        disabled={userWaiver.signed}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    }
                    label={check.label}
                  />
                ))}
              </FormGroup>
              <div>
                {userWaiver.signed ? (
                  <div className="my-8">
                    <img src={userWaiver.signature} alt="signature" />
                  </div>
                ) : (
                  <>
                    <div className="signature-container">
                      <SignatureCanvas
                        ref={sigCanvas}
                        penColor="black"
                        canvasProps={{ className: 'sigCanvas' }}
                        onEnd={handleSignatureChange}
                      />
                    </div>
                    <div className="flex flex-row justify-end">
                      <Button
                        onClick={clear}
                        variant="contained"
                        color="primary"
                        sx={{ marginBottom: "10px" }}
                      >
                        Clear
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <Button
                onClick={handleSignWaiver}
                variant="contained"
                color="primary"
                className="w-full"
                sx={{ marginBottom: "10px" }}
                disabled={
                  !checks.every(check => check.value) || userWaiver.signed || isSignatureEmpty
                }
              >
                {userWaiver.signed ? "Signed" : "Sign Waiver"}
              </Button>
              {isTeamCaptain && (
                <Button
                  onClick={makePayment}
                  variant="contained"
                  color="secondary"
                  className="w-full"
                  sx={{ marginBottom: "40px" }}
                  disabled={!userWaiver.signed || paymentStatus}
                >
                  Pay Now
                </Button>
              )}
            </Box>
          )
        )}
    </Container>

  );
}

export default Waiver;
