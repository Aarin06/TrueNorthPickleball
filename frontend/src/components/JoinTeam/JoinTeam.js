import Logo from "../../media/logo.png";
import React, { useState, useEffect } from "react";

import { FormHelperText, MenuItem, FormControl, InputLabel, Select } from "@mui/material";

import { Link } from "react-router-dom";

function JoinTeam({ team, rank }) {

  const [teamOptions, setTeamOptions] = useState([
    {
      label: "First time playing",
      value: "0",
    },
    {
      label: "Played a couple times",
      value: "1",
    },
    {
      label: "Play consistently",
      value: "2",
    },
  ],);





  return (
    <div className="content-center">
      <img className="max-w-44" src={Logo} alt="logo" />
      <FormControl required fullWidth error={team.error} color="secondary">
        <InputLabel>Teams</InputLabel>
        <Select
          label="Teams"
          value={team.value}
          onChange={(e) => {team.change(e.target.value);console.log(e.target)}}
        >
          {teamOptions.map((option) => {
            return <MenuItem value={option.value}>{option.label}</MenuItem>;
          })}
        </Select>
        <FormHelperText>{team.helperText}</FormHelperText>
      </FormControl>
    </div>
  );
}

export default JoinTeam;
