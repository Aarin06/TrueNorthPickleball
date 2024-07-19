import React, { useState } from "react";
import Logo from "../../media/logo.png";
import { Card, Grid, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { signIn } from "../../api/userService";
import { useNavigate, useSearchParams } from "react-router-dom";


function Signin() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [fields, setFields] = useState([
    {
      label: "Email",
      key:"email",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Email", value),
    },
    {
      label: "Password",
      key:"password",
      value: "",
      helperText: "",
      error: false,
      change: (value) => updateField("Password", value),
    },
  ]);

  const updateField = (label, value) => {
    setFields((prevFields) =>
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
      return field;
    });
    setFields(updatedFields);

    if (allFieldsValid) {
      let userData = fields;

      userData = userData.reduce((acc, field) => {
        acc[field.key] = field.value;
        return acc;
      }, {});

      signIn(userData).then((res) =>{
        console.log("eid:",eventId)
        if (eventId){
          navigate(`/waiver/${eventId}`);
        }
        else{
          navigate("/");
        }
        window.location.reload();
      })
      .catch((err) =>{
        setError(err.response.data.message || "")
      })
    }
  };

  return (
    <Grid className="grid-center" container spacing={0}>
      <Card sx={{ width: "350px" }}>
        <div className="content-center">
          <img className="max-w-44" src={Logo} alt="logo" />
          <p className=" text-red-700 text-sm">{error}</p>
          {fields.map((field) => (
            <TextField
              key={field.label}
              className="w-full"
              color="secondary"
              label={field.label}
              type={
                field.label === "Password"
                  ? "password"
                  : "text"
              }
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
            {/* <p className="font-medium">Forgot Password?</p> */}
            <Link to={eventId ? "/signup?eventId="+eventId : "/signup"} className="ml-auto font-medium">
              create account
            </Link>
          </div>
        </div>
      </Card>
    </Grid>
  );
}

export default Signin;
