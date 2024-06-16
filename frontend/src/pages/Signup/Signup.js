import React, { useState } from "react";
import "./Signup.css";
import Logo from "../../media/logo.png";
import { Card, Grid, TextField, Button } from "@mui/material";
import CreateTeam from "../../components/CreateTeam/CreateTeam";
import JoinTeam from "../../components/JoinTeam/JoinTeam";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";

function Signup() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  const [create, setCreate] = useState(false);
  const [state, setState] = useState(0);
  const [team, setTeam] = useState([
    {
      label: "Team Name",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateTeam("Team Name", value),
    },
    {
      label: "Experience",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateTeam("Experience", value),
      options: [
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
      ],
    },
  ]);

  const [emergencyFields, SetEmergencyFields] = useState([
    {
      label: "Contact Name",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateEmergency("Contact Name", value),
      size: 6,
    },
    {
      label: "Phone Number",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateEmergency("Phone Number", value),
      size: 6,
    },
    {
      label: "Relationship",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateEmergency("Relationship", value),
      size: 12,
    },
  ]);

  const [fields, setFields] = useState([
    {
      label: "First Name",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("First Name", value),
      size: 6,
    },
    {
      label: "Last Name",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Last Name", value),
      size: 6,
    },
    {
      label: "Password",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Password", value),
      size: 6,
    },
    {
      label: "Confirm Password",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Confirm Password", value),
      size: 6,
    },
    {
      label: "Email",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Email", value),
      size: 6,
    },
    {
      label: "Phone Number",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Phone Number", value),
      size: 6,
    },
  ]);

  const updateTeam = (label, value) => {
    setTeam((prevTeam) =>
      prevTeam.map((field) =>
        field.label === label
          ? { ...field, value, helperText: "", error: false }
          : field,
      ),
    );
  };

  const updateField = (label, value) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.label === label
          ? { ...field, value, helperText: "", error: false }
          : field,
      ),
    );
  };

  const updateEmergency = (label, value) => {
    SetEmergencyFields((prevFields) =>
      prevFields.map((field) =>
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

      if (field.label === "Email" && !emailRegex.test(field.value.trim())) {
        allFieldsValid = false;
        return {
          ...field,
          helperText: "Invalid email format",
          error: true,
        };
      }

      if (field.label === "Phone Number" && !phoneRegex.test(field.value.trim())) {
        allFieldsValid = false;
        return {
          ...field,
          helperText: "Invalid phone number format (xxx-xxx-xxxx)",
          error: true,
        };
      }

      if (
        field.label === "Confirm Password" &&
        field.value.trim() !== fields.find((f) => f.label === "Password").value.trim()
      ) {
        allFieldsValid = false;
        return {
          ...field,
          helperText: "Passwords do not match",
          error: true,
        };
      }

      return field;
    });
    setFields(updatedFields);

    const updatedEmergencyFields = emergencyFields.map((field) => {
      if (field.value.trim() === "") {
        allFieldsValid = false;
        return {
          ...field,
          helperText: `${field.label} is required`,
          error: true,
        };
      }

      if (field.label === "Phone Number" && !phoneRegex.test(field.value.trim())) {
        allFieldsValid = false;
        return {
          ...field,
          helperText: "Invalid phone number format (xxx-xxx-xxxx)",
          error: true,
        };
      }

      return field;
    });
    SetEmergencyFields(updatedEmergencyFields);

    if (allFieldsValid) {
      // Handle the actual submission here
      console.log(fields);
      console.log(emergencyFields);
      console.log(team);
      console.log("Form Submitted");
    }
  };

  const handleTeamSubmission = () => {
    let allFieldsValidCreate = true;
    let allFieldsValidJoin = true;

    const updatedTeam = team.map((field) => {
      if (field.value.trim() === "") {
        if (field.label === "Team Name") allFieldsValidJoin = false;
        allFieldsValidCreate = false;
        return {
          ...field,
          helperText: `${field.label} is required`,
          error: true,
        };
      }
      return field;
    });
    setTeam(updatedTeam);

    return create ? allFieldsValidCreate : allFieldsValidJoin;
  };

  return (
    <Grid className="grid-center mt-8" container spacing={0}>
      <Card sx={{ width: state === 2 ? "80%" : "400px" }}>
        {state === 0 ? (
          <div className="content-center">
            <img className="max-w-44" src={Logo} alt="logo" />
            <div className="flex gap-5">
              <Button
                onClick={() => {
                  setState(1);
                  setCreate(true);
                }}
                variant="contained"
              >
                Create a Team
              </Button>
              <Button
                onClick={() => {
                  setState(1);
                  setCreate(false);
                }}
                variant="contained"
              >
                Join a Team
              </Button>
            </div>
          </div>
        ) : state === 1 && create ? (
          <CreateTeam team={team[0]} rank={team[1]} />
        ) : state === 1 && !create ? (
          <JoinTeam team={team[0]} />
        ) : state === 2 ? (
          <>
            <h1 className=" pl-14 pt-14 pb-4 text-2xl">Personal Information</h1>
            <Grid container spacing={2} className="pl-14 pr-14 pb-14">
              {fields.map((field) => (
                <Grid item xs={field.size} key={field.label}>
                  {field.label === "Phone Number" ? (
                    <InputMask
                      mask="999-999-9999"
                      value={field.value}
                      onChange={(e) => field.change(e.target.value)}
                      key={field.label}
                    >
                      {() => (
                        <TextField
                          required
                          className="w-full"
                          color="secondary"
                          label={field.label}
                          helperText={field.helperText}
                          error={field.error}
                          value={field.value ? field.value:""}

                        />
                      )}
                    </InputMask>
                  ) : (
                    <TextField
                      required
                      key={field.label}
                      className="w-full"
                      color="secondary"
                      label={field.label}
                      type={
                        field.label === "Password" ||
                        field.label === "Confirm Password"
                          ? "password"
                          : "text"
                      }
                      onChange={(e) => field.change(e.target.value)}
                      helperText={field.helperText}
                      error={field.error}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
            <h1 className=" pl-14 pb-4 text-2xl">Emergency Contact Information</h1>
            <Grid container spacing={2} className="pl-14 pr-14 pb-14">
              {emergencyFields.map((field) => (
                <Grid item xs={field.size} key={field.label}>
                  {field.label === "Phone Number" ? (
                    <InputMask
                      mask="999-999-9999"
                      value={field.value}
                      onChange={(e) => field.change(e.target.value)}
                      key={field.label}
                    >
                      {() => (
                        <TextField
                          required
                          className="w-full"
                          color="secondary"
                          label={field.label}
                          helperText={field.helperText}
                          error={field.error}
                          value={field.value ? field.value:""}

                        />
                      )}
                    </InputMask>
                  ) : (
                    <TextField
                      required
                      key={field.label}
                      className="w-full"
                      color="secondary"
                      label={field.label}
                      onChange={(e) => field.change(e.target.value)}
                      helperText={field.helperText}
                      error={field.error}
                    />
                  )}
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  onClick={handleSubmission}
                  className="w-full"
                  variant="contained"
                  LinkComponent={Link}
                  to="https://buy.stripe.com/test_eVa7sJgxL7Gi0lWcMM"
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
        {state > 0 ? (
          <div className="flex flex-row mb-5 ml-5 mr-5 justify-between">
            <Button
              onClick={() => {
                setState((prevState) => prevState - 1);
              }}
              variant="contained"
              color="secondary"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                handleTeamSubmission() && setState((prevState) => prevState + 1);
              }}
              variant="contained"
              color="secondary"
              sx={{ display: state === 2 ? "none" : "" }}
            >
              Next
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Card>
    </Grid>
  );
}

export default Signup;
