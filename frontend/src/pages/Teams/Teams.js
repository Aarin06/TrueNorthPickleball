import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Card, Typography, Box, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { experienceMapping } from "../../Mappings/experienceLevel";
import { getTeams } from "../../api/teamService";
import "tailwindcss/tailwind.css";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    getTeams().then((response) => {
      console.log(response);
      setTeams(response);
      setIsLoading(false);
    });
  }, []);

  return (
    <Container maxWidth="xl" className="py-8">
      <Box className="text-center mb-8">
        <Typography variant="h2">
          Teams
        </Typography>
      </Box>
      
      {isLoading ? 
        <div className="flex justify-center mt-20">
          <CircularProgress size={100} />
        </div>
      :
        <Box className="mb-8">
          {Object.entries(experienceMapping).map(([key, value]) => (
            <Box key={key} className="mb-8">
              <Card elevation={10} className="p-4 mb-4 min-h-20">
                <Typography variant="h3"sx={{marginBottom:"10px"}}>
                  {value}
                </Typography>
                <Grid container spacing={2}>
                  {teams
                    .filter((team) => team.experienceLevel == key)
                    .map((team) => (
                      <Grid item xs={6} sm={6} md={4} key={team._id}>
                        <Card
                          component={Link}
                          to={`/teams/${team._id}`}
                          sx={{ backgroundColor: "#ac1121" }}
                          className="h-auto p-10 flex flex-col justify-center items-center"
                        >
                          <Typography variant="h6" className="text-white text-center">
                            {team.name}
                          </Typography>
                        </Card>
                      </Grid>
                    ))}
                </Grid>
              </Card>
            </Box>
          ))}
        </Box>
      }
    </Container>
  );
}

export default Teams;
