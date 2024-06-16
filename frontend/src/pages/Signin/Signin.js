import React, { useState, useEffect } from "react";
import "./Signin.css";
import Logo from "../../media/logo.png";
import { Card, Grid, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Signin() {
  const [fields, setFields] = useState([
    {
      label: "Email",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Email", value),
    },
    {
      label: "Password",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Password", value),
    },
  ]);

  const updateField = (label, value) => {
    setFields(
      fields.map((field) =>
        field.label === label
          ? { ...field, value, helperText: "", error: false }
          : field,
      ),
    );
  };

  const handleSubmission = () => {
    let allFieldsValid = true;
    const updatedFields = fields.map((field) => {
      if (field.value.trim() === "") {
        allFieldsValid = false;
        return {
          ...field,
          helperText: `${field.label} is required`,
          error: true,
        };
      }
      return field;
    });
    setFields(updatedFields);

    if (allFieldsValid) {
      // Handle the actual submission here
      console.log("Form Submitted");
    }
  };

  return (
    <Grid className="grid-center" container spacing={0}>
      <Card>
        <div className="content-center">
          <img className="max-w-44" src={Logo} alt="logo" />
          {fields.map((field) => (
            <TextField
              key={field.label}
              className="w-full"
              color="secondary"
              label={field.label}
              onChange={(e) => field.change(e.target.value)}
              helperText={field.helperText}
              error={field.error}
            />
          ))}
          <Button
            onClick={handleSubmission}
            className="w-full"
            variant="contained"
          >
            Sign In
          </Button>
          <div className="flex w-full">
            <p className="font-medium">Forgot Password?</p>
            <Link to="/join" className="ml-auto font-medium">
              Join Now
            </Link>
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default Signin;
