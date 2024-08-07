import React, { useState } from "react";
import Logo from "../../media/logo.png";
import { Card, Grid, Button } from "@mui/material";
import CreateTeam from "../../components/CreateTeam/CreateTeam";
import JoinTeam from "../../components/JoinTeam/JoinTeam";
import { addUser, signIn } from "../../api/userService";
import { addTeam, checkTeams, joinTeam } from "../../api/teamService";
import CreateAccount from "../../components/CreateAccount";
import { useNavigate, useSearchParams } from "react-router-dom";

function Signup() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  const navigate = useNavigate();

  const [create, setCreate] = useState(false);
  const [err, setErr] = useState("");

  const [state, setState] = useState(0);
  const [team, setTeam] = useState([
    {
      label: "Team Name",
      key: "name",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateTeam("Team Name", value),
    },
    {
      label: "Experience",
      key: "experienceLevel",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateTeam("Experience", value),
      options: [
        {
          label: "3.0 (Intermidiate)",
          value: "3.0",
        },
        {
          label: "3.5 (Advanced)",
          value: "3.5",
        },
        {
          label: "4.0 (Advanced Intermediate)",
          value: "4.0",
        },
        {
          label: "4.5+ (Expert)",
          value: "4.5+",
        },
      ],
    },
  ]);

  const [emergencyFields, SetEmergencyFields] = useState([
    {
      label: "Contact Name",
      key: "emergContactName",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateEmergency("Contact Name", value),
      size: 12,
    },
    {
      label: "Phone Number",
      key: "emergContactPhoneNumber",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateEmergency("Phone Number", value),
      size: 12,
    },
    {
      label: "Relationship",
      key: "emergContactRelationship",
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
      key: "firstName",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("First Name", value),
      size: 12,
    },
    {
      label: "Last Name",
      key: "lastName",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Last Name", value),
      size: 12,
    },
    {
      label: "Password",
      key: "password",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Password", value),
      size: 12,
    },
    {
      label: "Confirm Password",
      key: "confirmPassword",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Confirm Password", value),
      size: 12,
    },
    {
      label: "Email",
      key: "email",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Email", value),
      size: 12,
    },
    {
      label: "Phone Number",
      key: "phoneNumber",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Phone Number", value),
      size: 12,
    },
    {
      label: "Date of Birth (MM/DD/YYYY)",
      key: "dob",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Date of Birth (MM/DD/YYYY)", value),
      size: 12,
    },
  ]);

  const updateTeam = (label, value) => {
    setTeam((prevTeam) =>
      prevTeam.map((field) =>
        field.label === label
          ? { ...field, value, helperText: "", error: false }
          : field
      )
    );
  };

  const updateField = (label, value) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.label === label
          ? { ...field, value, helperText: "", error: false }
          : field
      )
    );
  };

  const updateEmergency = (label, value) => {
    SetEmergencyFields((prevFields) =>
      prevFields.map((field) =>
        field.label === label
          ? { ...field, value, helperText: "", error: false }
          : field
      )
    );
  };

  const calculateAge = (dob) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    
    if (regex.test(dob)) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
  
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
  
      return age;
    }
    return 0;
    
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

      if (field.label === "Date of Birth (MM/DD/YYYY)" && calculateAge(field.value.trim()) < 18) {
        allFieldsValid = false;
        return {
          ...field,
          helperText: "You must be at least 18 years old",
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
      let userData = [...fields, ...emergencyFields];

      userData = userData.reduce((acc, field) => {
        acc[field.key] = field.value;
        return acc;
      }, {});

      let teamData = team.reduce((acc, field) => {
        acc[field.key] = field.value;
        return acc;
      }, {});

      delete userData.confirmPassword;

      addUser(userData)
        .then((responseUser) => {
          teamData.captain = responseUser._id;

          if (create) {
            addTeam(teamData).then((responseTeam) => {
              signIn(responseUser).then((res) => {
                if (eventId) {
                  navigate(`/waiver/${eventId}`);
                }
                else{
                  navigate(`/events`);
                }
                window.location.reload();
              });
            });
          } else {
            joinTeam(team[0].value, responseUser._id).then((responseTeam) => {
              signIn(responseUser).then((res) => {
                if (eventId) {
                  navigate(`/waiver/${eventId}`);
                }
                else{
                  navigate(`/events`);
                }
                window.location.reload();
              });
            });
          }
        })
        .catch((error) => {
          setErr(error.response.data.message || "");
          console.log("There was a problem with the fetch operation:", error.message || error);
        });
    }
  };
  const handleBack = async () => {
    setState((prevState) => prevState - 1) 
    setErr("");
  }
  const handleTeamSubmission = async () => {
    let allFieldsValidCreate = true;
    let allFieldsValidJoin = true;
    if (team[0].value.trim() === ""){
      return false;
    }
    let res = await checkTeams(team[0].value);
    if (res.success){
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
    }
    else if (create){
      allFieldsValidCreate = false;
      setErr("This Team Name is Taken.");
      
    }
  
    return create ? allFieldsValidCreate : allFieldsValidJoin;
  };

  return (
    <Grid className="grid-center mt-8" container spacing={0}>
      <Card elevation={10} sx={{ width: state === 2 ? "80%" : "350px" }}>
        {state === 0 ? (
          <div className="content-center">
            <img className="max-w-44" src={Logo} alt="logo" />
            <div className="flex gap-5">
              <Button
                onClick={() => {
                  setState(1);
                  setCreate(true);
                  setTeam((prevTeam) =>
                    prevTeam.map((item) => ({ ...item, value: "", error: false, helperText: "" }))
                  );
                }}
                variant="contained"
              >
                Create a Team
              </Button>
              <Button
                onClick={() => {
                  setState(1);
                  setCreate(false);
                  setTeam((prevTeam) =>
                    prevTeam.map((item) => ({ ...item, value: "", error: false, helperText: "" }))
                  );
                }}
                variant="contained"
              >
                Join a Team
              </Button>
            </div>
          </div>
        ) : state === 1 && create ? (
          <CreateTeam team={team[0]} rank={team[1]} error={err} />
        ) : state === 1 && !create ? (
          <JoinTeam team={team[0]} />
        ) : state === 2 ? (
          <CreateAccount
            fields={fields}
            emergencyFields={emergencyFields}
            handleSubmission={handleSubmission}
            error={err}
          />
        ) : (
          <></>
        )}
        {state > 0 ? (
          <div className="flex flex-row mb-5 ml-5 mr-5 justify-between">
            <Button
              onClick={async () => {
                await handleBack();
              }}
              variant="contained"
              color="secondary"
            >
              Back
            </Button>
            <Button
              onClick={async () => {
                await handleTeamSubmission() && setState((prevState) => prevState + 1) && setErr("");
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
