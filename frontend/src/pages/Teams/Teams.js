import { useEffect, useState } from "react";
import { Button, Container, Grid,Card } from "@mui/material";
import React from "react";
import { experienceMapping } from "../../Mappings/experienceLevel";
import { getTeams } from "../../api/teamService";
import { Link } from "react-router-dom";

function Teams() {

  const [teams, SetTeams] = useState([]);

  useEffect(() => {
    getTeams().then((response) =>{
      SetTeams(response);
    })
  }, [])



  return (
    <Container maxWidth>
      <h1 className="page-title">Teams</h1>
      <Grid>
          
     
        {Object.entries(experienceMapping).map(([key, value]) => {
          return (
            <Card elevation={10} className="mb-4 p-4">
            <Grid item xs={12} key={key} >
              <h1 className="page-header mt-2 pb-4">{value}</h1>
              <Grid container spacing={4}>
                {teams.map((team)=>{
                  if(team.experienceLevel == key){
                    return (
                        <Grid item xs={4}>
                          <Card component={Link} to={`/teams/${team._id}`} sx={{backgroundColor:"#ac1121" }} className="h-auto p-10 flex flex-col justify-center content-center">
                            <h1 className="text-white">{team.name}</h1>
                          </Card>
                        </Grid>
                    )
                  } 
                  else{
                    return(<></>)
                  }         
                })}
            </Grid>
          </Grid>
          </Card>
          );
        })}
      </Grid>
    </Container>
  );
}

export default Teams;
