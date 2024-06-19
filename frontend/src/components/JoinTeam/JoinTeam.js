import Logo from "../../media/logo.png";
import React, { useState, useEffect } from "react";

import { FormHelperText, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { getTeams } from "../../api/teamService";
import { Link } from "react-router-dom";
import { experienceMapping } from "../../Mappings/experienceLevel";

function JoinTeam({ team, rank }) {

  const [teamOptions, setTeamOptions] = useState([]);


  useEffect(() => {
    getTeams().then((response) =>{
      response.map((item)=>{
        item.label = item.name+" ("+experienceMapping[item.experienceLevel]+")";
        if (item.playerCount === 4){
          item.label += " FULL";
        }
      })
      setTeamOptions(response);
    })
  }, [])


  return (
    <div className="content-center">
      <img className="max-w-44" src={Logo} alt="logo" />
      <FormControl required fullWidth error={team.error} color="secondary">
        <InputLabel>Teams</InputLabel>
        <Select
          label="Teams"
          value={team.value}
          onChange={(e) => {team.change(e.target.value)}}
        >
          {teamOptions.map((option) => {
            return <MenuItem disabled={option.playerCount === 4 ? true : false} key={option.id} value={option.name}>{option.label}</MenuItem>;
          })}
        </Select>
        <FormHelperText>{team.helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default JoinTeam;
