import { useEffect, useState } from "react";
import { Button, Container, Grid,Card } from "@mui/material";
import React from "react";
import { Link,useParams } from "react-router-dom";
import { getTeam, getTeamCaptain, getRoster } from "../api/teamService";
import Logo from "../media/logo.png";
function Team() {
  const params = useParams();
  const [captain, setCaptain] = useState({});
  const [team, SetTeam] = useState({});
  const [roster, setRoster] = useState([]);

  useEffect(() => {
    getTeam(params.teamId).then((response) =>{
      console.log(response)
      SetTeam(response);

      getTeamCaptain(params.teamId).then((res) => {
        console.log("cap",res)

        setCaptain(res);
      })

      getRoster(params.teamId).then((res) => {
        console.log(res)

        setRoster(res);
      })

    })
  }, [])

  
  return (
    <Container maxWidth>
    <h1 className="page-title mb-4">{team.name}</h1>
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <Card elevation={10} className="p-2 h-full flex flex-col justify-center">
        <h1 className="text-md">Team Captain: <br></br>{captain.firstName} {captain.lastName}</h1>
        </Card>
      </Grid>
      <Grid item xs={4}>
      <Card elevation={10} className="h-full">
        <Button disabled={team.playerCount === 4} LinkComponent={Link} to="/signup" className="h-full w-full flex content-center text-center" variant="contained">{team.playerCount !== 4 ? "Join Team":"Full"}</Button>
        </Card>

      </Grid>

      <Grid item xs={12}>
        <Card elevation={10} className=" p-8 flex flex-col justify-center">
        <h1 className="text-3xl">Roster:</h1>
        <div className="flex flex-row flex-wrap mt-4 gap-4">
          {roster.map((player) =>{
            return(
            <Card className="p-4 flex flex-wrap justify-center content-center flex-1">
              <img className="icon" src={Logo} alt="logo" />
              <h1>{player.firstName} {player.lastName}</h1>
            </Card>
            )
          })}
        </div>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card elevation={10} className="p-8 flex flex-col justify-center">
        <h1 className="text-3xl">Schedule:</h1>
        <h2>TBD</h2>
        </Card>
      </Grid>
    </Grid>
  </Container>
  );
}

export default Team;
