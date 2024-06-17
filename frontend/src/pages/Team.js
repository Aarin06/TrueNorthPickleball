import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Card, Typography, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getTeam, getTeamCaptain, getRoster } from "../api/teamService";
import Logo from "../media/logo.png";
import "tailwindcss/tailwind.css";

function Team() {
  const params = useParams();
  const [captain, setCaptain] = useState({});
  const [team, setTeam] = useState({});
  const [roster, setRoster] = useState([]);

  useEffect(() => {
    getTeam(params.teamId).then((response) => {
      setTeam(response);

      getTeamCaptain(params.teamId).then((res) => {
        setCaptain(res);
      });

      getRoster(params.teamId).then((res) => {
        setRoster(res);
      });
    });
  }, [params.teamId]);

  const getStatusStyles = (locked) => ({
    color: locked === 0 ? "green" : "red",
    fontWeight: "bold",
  });

  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-4">
        <Typography variant="h2" className="text-4xl font-bold mb-4">
          {team.name}
        </Typography>
        <Typography variant="h6" style={getStatusStyles(team.locked)}>
          {team.locked === false ? "Active" : "Inactive"}
        </Typography>
        {team.locked === true && (
          <Button
            variant="contained"
            color="primary"
            className="mt-4 w-half"
            component={Link}
            to="/payment"
            sx={{fontSize:"25px"}}
          >
            PAY NOW
          </Button>
        )}
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card elevation={10} className="p-6 h-full flex flex-col justify-center">
            <Typography variant="h4" className="mb-4">
              Team Captain: {captain.firstName} {captain.lastName}
            </Typography>
            {/* <Typography variant="h6">
              {captain.firstName} {captain.lastName}
            </Typography> */}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={10} className="h-full flex items-center justify-center">
            <Button
              disabled={team.playerCount === 4}
              component={Link}
              to="/signup"
              className="h-full w-full flex justify-center items-center text-center"
              variant="contained"
              color="primary"
              sx={{fontSize:"25px"}}
            >
              {team.playerCount !== 4 ? "Join Team" : "Full"}
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={10} className="p-8 flex flex-col justify-center">
            <Typography variant="h3" className="mb-4">
              Roster:
            </Typography>
            <Grid container spacing={2} className="flex flex-wrap">
              {roster.map((player) => (
                <Grid item xs={6} sm={4} md={3} key={player._id} className="flex">
                  <Card elevation={5} className="p-4 flex flex-col items-center justify-center flex-1">
                    <img className="icon mb-2" src={Logo} alt="logo" />
                    <Typography variant="body1">
                      {player.firstName} {player.lastName}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card elevation={10} className="p-8 flex flex-col justify-center">
            <Typography variant="h3" className="mb-4">
              Schedule:
            </Typography>
            <Typography variant="h6">
              TBD
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Team;
